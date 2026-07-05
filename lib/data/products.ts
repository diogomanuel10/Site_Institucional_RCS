export interface Product {
  id: string;
  name: string;
  description: string;
  /** Preço em euros. */
  price: number;
  sizes: string[];
  /** Emoji marcador enquanto não há fotos reais. */
  icon: string;
  badge?: string;
}

/** Produtos da loja (fase 1 — placeholders, sem stock/pagamento online). */
export const products: Product[] = [
  {
    id: "camisola-jogo",
    name: "Camisola de Jogo",
    description: "Réplica oficial da camisola de competição, em navy e dourado.",
    price: 35,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    icon: "👕",
    badge: "Novidade",
  },
  {
    id: "camisola-treino",
    name: "T-shirt de Treino",
    description: "T-shirt técnica respirável com o emblema do clube.",
    price: 18,
    sizes: ["S", "M", "L", "XL"],
    icon: "🎽",
  },
  {
    id: "casaco",
    name: "Casaco RCS",
    description: "Casaco de aquecimento com fecho e emblema bordado.",
    price: 45,
    sizes: ["S", "M", "L", "XL"],
    icon: "🧥",
  },
  {
    id: "cachecol",
    name: "Cachecol de Adepto",
    description: "Cachecol de duas faces com as cores do clube.",
    price: 12,
    sizes: ["Único"],
    icon: "🧣",
    badge: "Adeptos",
  },
];

/** Escalões oferecidos como opção no formulário de encomenda. */
export const orderTeamOptions = [
  "Seniores Masculinos",
  "Seniores Femininos",
  "Sub-18",
  "Sub-16",
  "Sub-14",
  "Minivoleibol",
  "Sócio / Adepto",
] as const;
