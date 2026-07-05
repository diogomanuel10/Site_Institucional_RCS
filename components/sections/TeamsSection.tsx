import { Section, SectionHeader } from "@/components/ui/Section";
import { getTeams } from "@/lib/rcsgestao/client";
import { CrownMark } from "@/components/ui/Crest";

const genderLabel: Record<string, string> = {
  masculino: "Masculino",
  feminino: "Feminino",
  misto: "Misto",
};

export async function TeamsSection() {
  const teams = await getTeams();

  return (
    <Section id="equipas" tone="navy">
      <SectionHeader
        eyebrow="A nossa gente"
        title="Equipas & escalões"
      />
      <p className="-mt-6 mb-10 max-w-xl text-cream/70">
        Dos primeiros toques no minivoleibol às equipas seniores, o clube compete
        em {teams.length} escalões ativos.
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((t) => (
          <li
            key={t.id}
            className="group flex flex-col rounded-2xl border border-white/10 bg-navy-panel p-6 transition-colors hover:border-gold/40"
          >
            <div className="flex items-start justify-between">
              <CrownMark className="h-6 w-auto text-gold" />
              <span className="rounded-full bg-white/5 px-3 py-1 font-display text-[0.65rem] uppercase tracking-wide text-cream/60">
                {genderLabel[t.gender]}
              </span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold uppercase leading-tight text-cream transition-colors group-hover:text-gold">
              {t.name}
            </h3>
            {t.competition && (
              <p className="mt-2 text-sm text-cream/60">{t.competition}</p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
