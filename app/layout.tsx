import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { club } from "@/lib/data/club";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://realclubesenhorense.pt"),
  title: {
    default: `${club.name} — Voleibol na Senhora da Hora`,
    template: `%s · ${club.shortName}`,
  },
  description:
    "Site oficial do Real Clube Senhorense — clube de voleibol da Senhora da Hora, Matosinhos. Jogos, resultados, notícias, equipas e loja.",
  openGraph: {
    title: `${club.name} — Voleibol na Senhora da Hora`,
    description:
      "Clube de voleibol da Senhora da Hora, Matosinhos. Jogos, resultados, notícias e loja oficial.",
    locale: "pt_PT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" className={`${oswald.variable} ${inter.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:font-display focus:uppercase focus:tracking-wide focus:text-navy-deep"
        >
          Saltar para o conteúdo
        </a>
        <Navbar />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
