import { Section, SectionHeader } from "@/components/ui/Section";
import { initiatives } from "@/lib/data/initiatives";

export function InitiativesSection() {
  return (
    <Section id="iniciativas" tone="paper">
      <SectionHeader
        eyebrow="Para além do jogo"
        title="Iniciativas"
        tone="light"
      />
      <div className="grid gap-5 md:grid-cols-3">
        {initiatives.map((i) => (
          <article
            key={i.title}
            className="flex flex-col rounded-2xl border border-ink/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl" aria-hidden="true">
                {i.icon}
              </span>
              {i.tag && (
                <span className="rounded-full bg-navy/5 px-3 py-1 font-display text-[0.65rem] uppercase tracking-wide text-ink-soft">
                  {i.tag}
                </span>
              )}
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold uppercase leading-tight text-ink">
              {i.title}
            </h3>
            <p className="mt-1 font-display text-sm uppercase tracking-wide text-gold-soft">
              {i.tagline}
            </p>
            <p className="mt-3 text-sm text-ink-soft">{i.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
