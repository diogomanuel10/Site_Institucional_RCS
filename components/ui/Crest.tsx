/**
 * Emblema-marcador do RCS: coroa + bola de voleibol sobre escudo navy.
 *
 * ⚠️ PLACEHOLDER vetorial. Substituir pelo emblema oficial em SVG assim que
 * disponível (ver /public/emblema.svg). Mantido em código para o protótipo ter
 * o motivo-assinatura (coroa + bola) sem depender de um ficheiro externo.
 */
export function Crest({
  className,
  title = "Emblema do Real Clube Senhorense",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 72"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* Escudo */}
      <path
        d="M4 8 L32 3 L60 8 V38 C60 54 47 64 32 69 C17 64 4 54 4 38 Z"
        fill="#0d1b2e"
        stroke="#e0b431"
        strokeWidth="2.5"
      />
      {/* Coroa */}
      <path
        d="M20 18 L24 24 L32 15 L40 24 L44 18 L42 30 H22 Z"
        fill="#e0b431"
      />
      <rect x="21" y="31" width="22" height="3.5" rx="1" fill="#e0b431" />
      {/* Bola de voleibol */}
      <circle cx="32" cy="49" r="11" fill="#f5f0e6" stroke="#0d1b2e" strokeWidth="1.2" />
      <path
        d="M32 38 C28 44 28 54 32 60 M23 44 C29 47 35 47 41 44 M23 55 C28 51 36 51 41 55"
        stroke="#c8a96e"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Monograma (só a coroa) para favicon/detalhes. */
export function CrownMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      className={className}
      role="img"
      aria-label="Coroa do emblema RCS"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 12 L15 21 L24 6 L33 21 L40 12 L37 28 H11 Z" fill="currentColor" />
    </svg>
  );
}
