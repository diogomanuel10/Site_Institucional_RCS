import type { Match, Team } from "@/lib/rcsgestao/types";

/**
 * Dados desportivos FICTÍCIOS para o protótipo.
 *
 * Usados apenas enquanto a API do RCSGestão não está configurada
 * (ver lib/rcsgestao/client.ts). Não representam jogos/escalões reais.
 */

export const fixtureTeams: Team[] = [
  {
    id: "sen-m",
    name: "Seniores Masculinos",
    slug: "seniores-masculinos",
    gender: "masculino",
    ageGroup: "Seniores",
    competition: "Campeonato Nacional — 2.ª Divisão",
    coach: "Treinador por confirmar",
  },
  {
    id: "sen-f",
    name: "Seniores Femininos",
    slug: "seniores-femininos",
    gender: "feminino",
    ageGroup: "Seniores",
    competition: "Campeonato Nacional — 2.ª Divisão",
  },
  {
    id: "sub18-m",
    name: "Sub-18 Masculinos",
    slug: "sub-18-masculinos",
    gender: "masculino",
    ageGroup: "Sub-18",
    competition: "Distrital AVP",
  },
  {
    id: "sub16-f",
    name: "Sub-16 Femininos",
    slug: "sub-16-femininos",
    gender: "feminino",
    ageGroup: "Sub-16",
    competition: "Distrital AVP",
  },
  {
    id: "sub14-m",
    name: "Sub-14 Masculinos",
    slug: "sub-14-masculinos",
    gender: "masculino",
    ageGroup: "Sub-14",
    competition: "Distrital AVP",
  },
  {
    id: "minis",
    name: "Minivoleibol",
    slug: "minivoleibol",
    gender: "misto",
    ageGroup: "Minis",
    competition: "Encontros regionais",
  },
];

const iso = (d: string) => new Date(d).toISOString();

export const fixtureMatches: Match[] = [
  // Próximos
  {
    id: "m-101",
    teamSlug: "seniores-masculinos",
    competition: "Campeonato Nacional — 2.ª Divisão",
    opponent: { name: "GC Vilacondense" },
    home: true,
    kickoff: iso("2026-07-12T18:00:00+01:00"),
    venue: "Pavilhão da Senhora da Hora",
    status: "agendado",
  },
  {
    id: "m-102",
    teamSlug: "seniores-femininos",
    competition: "Campeonato Nacional — 2.ª Divisão",
    opponent: { name: "AA Espinho" },
    home: false,
    kickoff: iso("2026-07-13T17:00:00+01:00"),
    venue: "Nave Desportiva de Espinho",
    status: "agendado",
  },
  {
    id: "m-103",
    teamSlug: "sub-16-femininos",
    competition: "Distrital AVP",
    opponent: { name: "Leixões SC" },
    home: true,
    kickoff: iso("2026-07-19T11:00:00+01:00"),
    venue: "Pavilhão da Senhora da Hora",
    status: "agendado",
  },
  {
    id: "m-104",
    teamSlug: "sub-18-masculinos",
    competition: "Distrital AVP",
    opponent: { name: "CV Gueifães" },
    home: false,
    kickoff: iso("2026-07-20T16:00:00+01:00"),
    venue: "Pavilhão de Gueifães",
    status: "agendado",
  },
  // Resultados recentes
  {
    id: "m-091",
    teamSlug: "seniores-masculinos",
    competition: "Campeonato Nacional — 2.ª Divisão",
    opponent: { name: "SC Espinho B" },
    home: true,
    kickoff: iso("2026-06-28T18:00:00+01:00"),
    venue: "Pavilhão da Senhora da Hora",
    status: "terminado",
    result: {
      home: 3,
      away: 1,
      sets: [
        [25, 20],
        [23, 25],
        [25, 18],
        [25, 22],
      ],
    },
  },
  {
    id: "m-092",
    teamSlug: "seniores-femininos",
    competition: "Campeonato Nacional — 2.ª Divisão",
    opponent: { name: "CD Ribeirense" },
    home: false,
    kickoff: iso("2026-06-27T17:00:00+01:00"),
    venue: "Pavilhão da Ribeira",
    status: "terminado",
    result: {
      home: 2,
      away: 3,
      sets: [
        [25, 22],
        [22, 25],
        [25, 19],
        [20, 25],
        [12, 15],
      ],
    },
  },
  {
    id: "m-093",
    teamSlug: "sub-16-femininos",
    competition: "Distrital AVP",
    opponent: { name: "AD Foz" },
    home: true,
    kickoff: iso("2026-06-21T11:00:00+01:00"),
    venue: "Pavilhão da Senhora da Hora",
    status: "terminado",
    result: { home: 3, away: 0, sets: [[25, 17], [25, 21], [25, 19]] },
  },
];
