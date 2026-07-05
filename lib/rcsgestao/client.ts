import type { Match, Team } from "./types";
import { fixtureMatches, fixtureTeams } from "@/lib/data/fixtures";

/**
 * Cliente de leitura da API do RCSGestão.
 *
 * O RCSGestão é a fonte de verdade dos dados desportivos. Este módulo é o único
 * ponto de integração: todo o site consome jogos/resultados/equipas a partir daqui.
 *
 * Estratégia de cache: usamos `fetch` com `next.revalidate` (ISR) para NÃO bater
 * no backend a cada visita. O valor de revalidação é curto para jogos (resultados
 * mudam ao fim de semana) e mais longo para escalões (mudam por época).
 *
 * Enquanto os endpoints reais não existem (RCSGESTAO_API_URL por definir), caímos
 * em dados fictícios (lib/data/fixtures) para o protótipo continuar navegável.
 * Assim que a API estiver disponível, basta definir a variável de ambiente — o
 * resto do site não muda.
 */

const API_URL = process.env.RCSGESTAO_API_URL;
const API_TOKEN = process.env.RCSGESTAO_API_TOKEN;

/** Revalidação (segundos) por tipo de recurso. */
const REVALIDATE = {
  matches: 60 * 15, // 15 min — resultados ao fim de semana
  teams: 60 * 60 * 12, // 12 h — escalões mudam por época
} as const;

interface FetchOptions {
  revalidate: number;
}

async function apiGet<T>(
  path: string,
  { revalidate }: FetchOptions,
): Promise<T | null> {
  if (!API_URL) return null; // sem API configurada → usar fixtures

  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : undefined,
      next: { revalidate },
    });
    if (!res.ok) {
      console.error(`[rcsgestao] ${path} respondeu ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[rcsgestao] falha ao contactar ${path}:`, err);
    return null;
  }
}

/** Lista de escalões ativos do clube. */
export async function getTeams(): Promise<Team[]> {
  const data = await apiGet<Team[]>("/teams", {
    revalidate: REVALIDATE.teams,
  });
  return data ?? fixtureTeams;
}

/** Todos os jogos conhecidos (agendados + terminados). */
export async function getMatches(): Promise<Match[]> {
  const data = await apiGet<Match[]>("/matches", {
    revalidate: REVALIDATE.matches,
  });
  return data ?? fixtureMatches;
}

/** Próximos jogos, ordenados do mais próximo para o mais distante. */
export async function getUpcomingMatches(limit?: number): Promise<Match[]> {
  const now = Date.now();
  const upcoming = (await getMatches())
    .filter((m) => m.status === "agendado" && new Date(m.kickoff).getTime() >= now)
    .sort((a, b) => +new Date(a.kickoff) - +new Date(b.kickoff));
  return limit ? upcoming.slice(0, limit) : upcoming;
}

/** O próximo jogo do clube (para a hero), ou null se não houver. */
export async function getNextMatch(): Promise<Match | null> {
  const [next] = await getUpcomingMatches(1);
  return next ?? null;
}

/** Últimos resultados, do mais recente para o mais antigo. */
export async function getLatestResults(limit?: number): Promise<Match[]> {
  const results = (await getMatches())
    .filter((m) => m.status === "terminado" && m.result)
    .sort((a, b) => +new Date(b.kickoff) - +new Date(a.kickoff));
  return limit ? results.slice(0, limit) : results;
}
