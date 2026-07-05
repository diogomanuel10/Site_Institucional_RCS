import { Hero } from "@/components/sections/Hero";
import { NewsSection } from "@/components/sections/NewsSection";
import { MatchesBlock } from "@/components/sections/MatchesBlock";
import { TeamsSection } from "@/components/sections/TeamsSection";
import { InitiativesSection } from "@/components/sections/InitiativesSection";
import { ShopPreview } from "@/components/sections/ShopPreview";
import { ClubSection } from "@/components/sections/ClubSection";

// ISR: a página estática revalida periodicamente para apanhar novos jogos/
// resultados do RCSGestão sem bater no backend a cada visita.
export const revalidate = 900; // 15 min

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewsSection />
      <MatchesBlock />
      <TeamsSection />
      <InitiativesSection />
      <ShopPreview />
      <ClubSection />
    </>
  );
}
