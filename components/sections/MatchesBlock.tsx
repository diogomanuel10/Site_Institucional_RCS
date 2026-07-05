import { Section, SectionHeader } from "@/components/ui/Section";
import { MatchesSection } from "./MatchesSection";
import {
  getUpcomingMatches,
  getLatestResults,
  getTeams,
} from "@/lib/rcsgestao/client";

/** Server wrapper: busca dados ao RCSGestão e entrega ao filtro (client). */
export async function MatchesBlock() {
  const [upcoming, results, teams] = await Promise.all([
    getUpcomingMatches(8),
    getLatestResults(8),
    getTeams(),
  ]);

  return (
    <Section id="jogos" tone="panel">
      <SectionHeader eyebrow="Calendário desportivo" title="Jogos & resultados" />
      <MatchesSection upcoming={upcoming} results={results} teams={teams} />
    </Section>
  );
}
