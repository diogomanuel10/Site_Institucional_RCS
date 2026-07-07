"use client";

import { useId } from "react";

/**
 * Emblema oficial do Real Clube Senhorense, em SVG vetorial.
 * Recriação fiel do emblema circular: anel navy com "REAL CLUBE" / "SENHORENSE",
 * coroa dourada e bola de voleibol sobre disco dourado.
 *
 * - <Crest>: emblema completo (com texto no anel). Usa useId para ids únicos,
 *   pelo que pode ser repetido em qualquer sítio sem colisões de id (textPath).
 * - <CrestMark>: mesmo emblema sem o texto do anel — para tamanhos pequenos /
 *   repetidos (cartões de jogo), onde o texto seria ilegível.
 */

const FONT = '"Arial Narrow", "Oswald", system-ui, sans-serif';

/** Corpo partilhado: coroa + bola + disco + anéis (sem o texto). */
function EmblemBody() {
  return (
    <>
      {/* Fundo e anéis */}
      <circle cx="100" cy="100" r="99" fill="#0d1b2e" />
      <circle cx="100" cy="100" r="98" fill="none" stroke="#e0b431" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="67" fill="#efc23e" />
      <circle cx="100" cy="100" r="67" fill="none" stroke="#0d1b2e" strokeWidth="3" />
      <circle cx="100" cy="100" r="64" fill="none" stroke="#e0b431" strokeWidth="1.2" />

      {/* Coroa */}
      <g stroke="#0d1b2e" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M 66,96 L 62,74 L 78,86 L 100,66 L 122,86 L 138,74 L 134,96 Z" fill="#e0b431" />
        <rect x="66" y="96" width="68" height="7" fill="#e0b431" />
      </g>
      <circle cx="62" cy="72" r="3.5" fill="#0d1b2e" />
      <circle cx="100" cy="63" r="3.5" fill="#0d1b2e" />
      <circle cx="138" cy="72" r="3.5" fill="#0d1b2e" />
      <circle cx="78" cy="84" r="2.6" fill="#0d1b2e" />
      <circle cx="122" cy="84" r="2.6" fill="#0d1b2e" />

      {/* Bola de voleibol */}
      <circle cx="100" cy="128" r="24" fill="#ffffff" stroke="#0d1b2e" strokeWidth="2" />
      <g fill="none" stroke="#0d1b2e" strokeWidth="2" strokeLinecap="round">
        <path d="M 100,104 C 92,116 92,140 100,152" />
        <path d="M 79,116 C 92,122 108,122 121,116" />
        <path d="M 79,140 C 90,134 110,134 121,140" />
      </g>
    </>
  );
}

export function Crest({
  className,
  title = "Emblema do Real Clube Senhorense",
  decorative = false,
}: {
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const topId = `arc-top-${uid}`;
  const bottomId = `arc-bottom-${uid}`;
  const a11y = decorative
    ? { "aria-hidden": true as const }
    : { role: "img", "aria-label": title };

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      {...a11y}
      xmlns="http://www.w3.org/2000/svg"
    >
      {!decorative && <title>{title}</title>}
      <defs>
        <path id={topId} d="M 100,100 m -80,0 a 80,80 0 1,1 160,0" fill="none" />
        <path id={bottomId} d="M 100,100 m -78,0 a 78,78 0 1,0 156,0" fill="none" />
      </defs>

      <EmblemBody />

      {/* Texto do anel */}
      <text fontFamily={FONT} fontWeight={700} fill="#e0b431" fontSize="20" letterSpacing="3">
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          REAL CLUBE
        </textPath>
      </text>
      <text fontFamily={FONT} fontWeight={700} fill="#e0b431" fontSize="20" letterSpacing="4">
        <textPath href={`#${bottomId}`} startOffset="50%" textAnchor="middle">
          SENHORENSE
        </textPath>
      </text>

      {/* Losangos laterais */}
      <path d="M 20,100 l 5,-5 5,5 -5,5 z" fill="#e0b431" />
      <path d="M 170,100 l 5,-5 5,5 -5,5 z" fill="#e0b431" />
    </svg>
  );
}

/** Emblema sem o texto do anel — para tamanhos pequenos / repetidos. */
export function CrestMark({
  className,
  title = "Emblema do Real Clube Senhorense",
  decorative = false,
}: {
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  const a11y = decorative
    ? { "aria-hidden": true as const }
    : { role: "img", "aria-label": title };
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      {...a11y}
      xmlns="http://www.w3.org/2000/svg"
    >
      {!decorative && <title>{title}</title>}
      <EmblemBody />
    </svg>
  );
}

/** Monograma — só a coroa — para acentos decorativos. */
export function CrownMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 44"
      className={className}
      role="img"
      aria-label="Coroa do emblema RCS"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 6,40 L 2,10 L 22,26 L 40,2 L 58,26 L 78,10 L 74,40 Z"
        fill="currentColor"
      />
    </svg>
  );
}
