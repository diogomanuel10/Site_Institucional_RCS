import { Button } from "@/components/ui/Button";
import { Crest, CrestMark } from "@/components/ui/Crest";
import { getNextMatch, getTeams } from "@/lib/rcsgestao/client";
import { formatDateLong, formatTime } from "@/lib/format";
import { club } from "@/lib/data/club";

export async function Hero() {
  const [match, teams] = await Promise.all([getNextMatch(), getTeams()]);
  const team = teams.find((t) => t.slug === match?.teamSlug);

  return (
    <section className="relative overflow-hidden bg-navy-deep">
      {/* Marca de água — motivo do emblema / campo */}
      <Crest
        decorative
        className="pointer-events-none absolute -right-16 top-1/2 hidden h-[130%] w-auto -translate-y-1/2 opacity-[0.06] md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(224,180,49,0.12),transparent_45%)]"
      />

      <div className="relative mx-auto grid max-w-content gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow">{club.sport} · {club.location}</p>
          <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-cream sm:text-7xl">
            Real Clube
            <br />
            <span className="text-gold">Senhorense</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-cream/75">
            Um clube vivo, feito de bancadas cheias e escalões a crescer. Vem
            ver o próximo jogo, segue os resultados e faz parte.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#jogos">Ver jogos</Button>
            <Button href="/loja#socio" variant="outline">
              Sê sócio
            </Button>
          </div>
        </div>

        {/* Cartaz do próximo jogo */}
        {match ? (
          <div className="rounded-2xl border border-gold/25 bg-navy-panel/80 p-6 shadow-panel backdrop-blur sm:p-8">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Próximo jogo</p>
              {team && (
                <span className="rounded-full bg-gold/15 px-3 py-1 font-display text-xs uppercase tracking-wide text-gold">
                  {team.ageGroup} {team.gender === "feminino" ? "Fem." : team.gender === "masculino" ? "Masc." : ""}
                </span>
              )}
            </div>

            <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
              <TeamBadge name="RCS" highlight />
              <span className="scoreboard text-2xl text-gold-soft">vs</span>
              <TeamBadge name={match.opponent.name} />
            </div>

            <div className="mt-7 space-y-2 border-t border-white/10 pt-5 text-sm">
              <Row label="Quando">
                <span className="capitalize">{formatDateLong(match.kickoff)}</span>
                {" · "}
                <span className="scoreboard text-gold">{formatTime(match.kickoff)}</span>
              </Row>
              <Row label="Onde">{match.venue}</Row>
              {match.competition && <Row label="Prova">{match.competition}</Row>}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/#jogos" variant="primary" className="flex-1">
                Calendário
              </Button>
              <Button
                href={club.contact.mapsUrl}
                variant="outline"
                className="flex-1"
              >
                Como chegar
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gold/25 bg-navy-panel/80 p-8 text-center shadow-panel">
            <p className="eyebrow">Próximo jogo</p>
            <p className="mt-4 text-cream/70">
              Sem jogos agendados de momento. Volta em breve.
            </p>
          </div>
        )}
      </div>
      <div className="gold-rule" />
    </section>
  );
}

function TeamBadge({ name, highlight }: { name: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full ${
          highlight ? "" : "bg-white/5"
        }`}
      >
        {highlight ? (
          <CrestMark className="h-16 w-auto" title="RCS" />
        ) : (
          <span className="font-display text-xl text-cream/60">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span className="font-display text-sm font-semibold uppercase leading-tight text-cream">
        {name}
      </span>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span className="w-16 shrink-0 text-xs uppercase tracking-wide text-cream/50">
        {label}
      </span>
      <span className="text-cream/90">{children}</span>
    </p>
  );
}
