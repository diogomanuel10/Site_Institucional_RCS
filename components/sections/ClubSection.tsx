import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { club, clubStats } from "@/lib/data/club";

export function ClubSection() {
  return (
    <Section id="clube" tone="panel">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow">O clube</p>
          <h2 className="section-title mt-2 text-cream">
            Feito na Senhora da Hora,
            <br />
            <span className="text-gold">no ritmo do voleibol</span>
          </h2>
          <p className="mt-6 text-cream/75">
            O {club.name} é um clube de voleibol enraizado na{" "}
            {club.location}. Formamos atletas desde os primeiros toques até à
            competição sénior, com o mesmo espírito: trabalho, comunidade e a
            camisola vestida com orgulho.
          </p>
          <p className="mt-4 text-cream/60">
            Este é um texto institucional de exemplo. Substituir pela história
            real do clube.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/loja#socio">Sê sócio</Button>
            <Button href={`mailto:${club.contact.email}`} variant="outline">
              Contactar o clube
            </Button>
          </div>
        </div>

        {/* Estatísticas em estilo marcador */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold/20 bg-gold/20">
          {clubStats.map((s) => (
            <div key={s.label} className="bg-navy-deep p-7 text-center sm:p-9">
              <p className="scoreboard text-5xl font-bold text-gold sm:text-6xl">
                {s.value}
                {s.hint === "+" && <span className="text-3xl align-top">+</span>}
              </p>
              <p className="mt-2 font-display text-sm uppercase tracking-wide text-cream">
                {s.label}
              </p>
              {s.hint && s.hint !== "+" && (
                <p className="mt-1 text-xs text-cream/50">{s.hint}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
