/**
 * Dados institucionais do clube.
 *
 * ⚠️ PLACEHERS: contactos, morada, redes e estatísticas ainda por confirmar com
 * o clube. Substituir pelos valores reais antes de produção.
 */

export const club = {
  name: "Real Clube Senhorense",
  shortName: "RCS",
  sport: "Voleibol",
  location: "Senhora da Hora, Matosinhos",
  // TODO(conteúdo real): contactos verdadeiros do clube.
  contact: {
    email: "geral@realclubesenhorense.pt",
    phone: "+351 000 000 000",
    address: "Pavilhão [nome], Rua [•], 4460-000 Senhora da Hora, Matosinhos",
    mapsUrl: "https://maps.google.com/?q=Senhora+da+Hora+Matosinhos",
  },
  // TODO(conteúdo real): links das redes sociais.
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "",
  },
} as const;

/** Estatísticas do clube para a faixa "em números" (placeholders). */
export const clubStats: Array<{ value: string; label: string; hint?: string }> = [
  { value: "1948", label: "Fundação", hint: "ano" },
  { value: "260", label: "Atletas", hint: "+" },
  { value: "11", label: "Escalões", hint: "ativos" },
  { value: "24", label: "Títulos", hint: "distritais e nacionais" },
];
