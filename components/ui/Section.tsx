type Tone = "navy" | "panel" | "paper" | "cream";

const tones: Record<Tone, string> = {
  navy: "bg-navy text-cream",
  panel: "bg-navy-panel text-cream",
  paper: "bg-paper text-ink",
  cream: "bg-cream text-ink",
};

export function Section({
  id,
  tone = "navy",
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  action,
  tone = "navy",
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
  tone?: "navy" | "light";
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2
          className={`section-title mt-2 ${
            tone === "light" ? "text-ink" : "text-cream"
          }`}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
