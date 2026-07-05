/**
 * Tipos dos dados desportivos consumidos do RCSGestão.
 *
 * O RCSGestão é a fonte de verdade. Estes tipos descrevem o contrato de leitura
 * esperado da API pública; devem ser confirmados/ajustados contra o esquema real
 * do RCSGestão quando os endpoints forem expostos (ver lib/rcsgestao/client.ts).
 */

/** Escalão / equipa do clube (ex.: "Seniores Masculinos", "Sub-16 Femininos"). */
export interface Team {
  id: string;
  /** Nome de apresentação do escalão. */
  name: string;
  /** Slug estável para filtros e URLs. */
  slug: string;
  gender: "masculino" | "feminino" | "misto";
  /** Categoria etária legível (ex.: "Seniores", "Sub-18", "Minis"). */
  ageGroup: string;
  /** Prova/competição principal, se conhecida. */
  competition?: string;
  coach?: string;
}

/** Um adversário num jogo. */
export interface Opponent {
  name: string;
  /** URL do emblema do adversário, se disponível. */
  crestUrl?: string;
}

export type MatchStatus = "agendado" | "terminado" | "adiado" | "cancelado";

/** Resultado por sets, quando o jogo terminou. */
export interface MatchResult {
  /** Sets ganhos pelo RCS. */
  home: number;
  /** Sets ganhos pelo adversário. */
  away: number;
  /** Parciais por set, ex.: [[25, 20], [23, 25], ...]. Opcional. */
  sets?: Array<[number, number]>;
}

/** Um jogo — próximo ou já disputado. */
export interface Match {
  id: string;
  /** Slug do escalão (referencia Team.slug). */
  teamSlug: string;
  competition?: string;
  opponent: Opponent;
  /** true se o RCS joga em casa. */
  home: boolean;
  /** Data/hora em ISO 8601 (com fuso). */
  kickoff: string;
  venue: string;
  status: MatchStatus;
  result?: MatchResult;
}
