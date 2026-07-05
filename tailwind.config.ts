import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta derivada do emblema oficial — navy + dourado + creme.
        navy: {
          DEFAULT: "#0d1b2e", // fundo / primário
          panel: "#12233a", // painel
          deep: "#091220", // navy profundo
        },
        gold: {
          DEFAULT: "#e0b431", // destaque (usar com parcimónia)
          soft: "#c8a96e", // dourado suave (grandes áreas)
        },
        cream: "#f5f0e6", // fundo claro / texto sobre navy
        paper: "#fbf9f3", // fundo alternativo de secção
        ink: {
          DEFAULT: "#16202e", // texto sobre claro
          soft: "#5a6472", // tinta suave
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      boxShadow: {
        panel: "0 18px 48px -24px rgba(9, 18, 32, 0.55)",
      },
      backgroundImage: {
        "gold-rule":
          "linear-gradient(90deg, transparent, #e0b431 20%, #e0b431 80%, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
