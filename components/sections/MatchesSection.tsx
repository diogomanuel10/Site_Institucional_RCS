"use client";

import { useMemo, useState } from "react";
import type { Match, Team } from "@/lib/rcsgestao/types";
import { formatDateShort, formatTime } from "@/lib/format";
import { Crest } from "@/components/ui/Crest";

/**
 * Jogos & resultados, com filtro por escalão.
 * Dados vêm do RCSGestão (passados pelo servidor via props serializáveis).
 */
export function MatchesSection({
  upcoming,
  results,
  teams,
}: {
  upcoming: Match[];
  results: Match[];
  teams: Team[];
}) {
  const [teamSlug, setTeamSlug] = useState<string>("todos");

  const teamName = useMemo(() => {
    const map = new Map(teams.map((t) => [t.slug, t.name]));
    return (slug: string) => map.get(slug) ?? slug;
  }, [teams]);

  const filteredUpcoming = upcoming.filter(
    (m) => teamSlug === "todos" || m.teamSlug === teamSlug,
  );
  const filteredResults = results.filter(
    (m) => teamSlug === "todos" || m.teamSlug === teamSlug,
  );

  // Só mostra no filtro os escalões que têm jogos.
  const withGames = teams.filter((t) =>
    [...upcoming, ...results].some((m) => m.teamSlug === t.slug),
  );

  return (
    <div>
      {/* Filtro por escalão */}
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar por escalão">
        <FilterChip active={teamSlug === "todos"} onClick={() => setTeamSlug("todos")}>
          Todos
        </FilterChip>
        {withGames.map((t) => (
          <FilterChip
            key={t.slug}
            active={teamSlug === t.slug}
            onClick={() => setTeamSlug(t.slug)}
          >
            {t.name}
          </FilterChip>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="eyebrow mb-4">Próximos jogos</h3>
          <ul className="space-y-3">
            {filteredUpcoming.length > 0 ? (
              filteredUpcoming.map((m) => (
                <UpcomingCard key={m.id} match={m} teamName={teamName(m.teamSlug)} />
              ))
            ) : (
              <Empty>Sem jogos agendados para este escalão.</Empty>
            )}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Últimos resultados</h3>
          <ul className="space-y-3">
            {filteredResults.length > 0 ? (
              filteredResults.map((m) => (
                <ResultCard key={m.id} match={m} teamName={teamName(m.teamSlug)} />
              ))
            ) : (
              <Empty>Ainda sem resultados para este escalão.</Empty>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 font-display text-xs uppercase tracking-wide transition-colors ${
        active
          ? "border-gold bg-gold text-navy-deep"
          : "border-white/15 text-cream/70 hover:border-gold/50 hover:text-cream"
      }`}
    >
      {children}
    </button>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-xl border border-white/10 bg-navy-panel/70 p-4 transition-colors hover:border-gold/30">
      {children}
    </li>
  );
}

function MatchHead({ teamName, extra }: { teamName: string; extra: string }) {
  return (
    <div className="mb-3 flex items-center justify-between text-xs">
      <span className="font-display uppercase tracking-wide text-gold-soft">{teamName}</span>
      <span className="text-cream/50">{extra}</span>
    </div>
  );
}

function Matchup({ opponent, home }: { opponent: string; home: boolean }) {
  const rcs = (
    <span className="flex items-center gap-2">
      <Crest className="h-6 w-auto" title="RCS" />
      <span className="font-display font-semibold text-cream">RCS</span>
    </span>
  );
  const opp = (
    <span className="font-display font-semibold text-cream">{opponent}</span>
  );
  return (
    <div className="flex items-center gap-2 text-sm">
      {home ? rcs : opp}
      <span className="text-cream/40">vs</span>
      {home ? opp : rcs}
    </div>
  );
}

function UpcomingCard({ match, teamName }: { match: Match; teamName: string }) {
  return (
    <CardShell>
      <MatchHead teamName={teamName} extra={match.home ? "Casa" : "Fora"} />
      <div className="flex items-center justify-between gap-3">
        <Matchup opponent={match.opponent.name} home={match.home} />
        <div className="text-right">
          <div className="scoreboard text-base text-gold">{formatDateShort(match.kickoff)}</div>
          <div className="scoreboard text-sm text-cream/60">{formatTime(match.kickoff)}</div>
        </div>
      </div>
      <p className="mt-2 text-xs text-cream/50">{match.venue}</p>
    </CardShell>
  );
}

function ResultCard({ match, teamName }: { match: Match; teamName: string }) {
  const r = match.result!;
  // Sets do ponto de vista do RCS.
  const rcsSets = match.home ? r.home : r.away;
  const oppSets = match.home ? r.away : r.home;
  const won = rcsSets > oppSets;

  return (
    <CardShell>
      <MatchHead teamName={teamName} extra={formatDateShort(match.kickoff)} />
      <div className="flex items-center justify-between gap-3">
        <Matchup opponent={match.opponent.name} home={match.home} />
        <div className="flex items-center gap-2">
          <span className={`scoreboard text-2xl ${won ? "text-gold" : "text-cream/70"}`}>
            {match.home ? r.home : r.away}
          </span>
          <span className="text-cream/40">–</span>
          <span className={`scoreboard text-2xl ${!won ? "text-gold" : "text-cream/70"}`}>
            {match.home ? r.away : r.home}
          </span>
          <span
            className={`ml-1 rounded px-1.5 py-0.5 font-display text-[0.65rem] uppercase ${
              won ? "bg-gold/20 text-gold" : "bg-white/10 text-cream/60"
            }`}
          >
            {won ? "V" : "D"}
          </span>
        </div>
      </div>
      {r.sets && (
        <p className="mt-2 text-xs text-cream/50">
          {r.sets.map(([h, a], i) => (
            <span key={i}>
              {match.home ? `${h}-${a}` : `${a}-${h}`}
              {i < r.sets!.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      )}
    </CardShell>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-cream/50">
      {children}
    </li>
  );
}
