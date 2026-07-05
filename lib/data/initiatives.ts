export interface Initiative {
  title: string;
  tagline: string;
  description: string;
  /** Emoji/ícone simples como marcador enquanto não há fotos reais. */
  icon: string;
  href?: string;
  tag?: string;
}

/** Iniciativas do clube (placeholders — confirmar com o clube). */
export const initiatives: Initiative[] = [
  {
    title: "Vólei nas Escolas",
    tagline: "Levar o voleibol às escolas da Senhora da Hora",
    description:
      "Sessões de iniciação em parceria com agrupamentos locais, para descobrir o voleibol e encontrar os atletas de amanhã.",
    icon: "🏫",
    tag: "Comunidade",
  },
  {
    title: "Campo de Férias RCS",
    tagline: "Verão a jogar, no pavilhão do clube",
    description:
      "Semanas de treino, jogos e convívio para os mais novos durante as férias escolares, com monitores do clube.",
    icon: "☀️",
    tag: "Verão",
  },
  {
    title: "Escola de Voleibol",
    tagline: "Formação regular dos escalões de base",
    description:
      "Treino orientado por época para minis e sub-14, com foco na técnica, no espírito de equipa e na progressão.",
    icon: "🎓",
    tag: "Formação",
  },
];
