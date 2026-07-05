import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getAllNews } from "@/lib/news";
import { formatDateShort } from "@/lib/format";

export function NewsSection() {
  const news = getAllNews();
  if (news.length === 0) return null;

  const [featured, ...rest] = news;
  const list = rest.slice(0, 4);

  return (
    <Section id="noticias" tone="navy">
      <SectionHeader
        eyebrow="Atualidade"
        title="Notícias"
        action={
          <Button href="/noticias" variant="ghost">
            Ver todas →
          </Button>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Destaque */}
        <Link
          href={`/noticias/${featured.slug}`}
          className="group flex flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-navy-panel p-7 transition-colors hover:border-gold/40 sm:p-9"
        >
          <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-deep text-5xl">
            📰
          </div>
          <div className="flex items-center gap-3 text-xs">
            {featured.category && (
              <span className="rounded-full bg-gold/15 px-3 py-1 font-display uppercase tracking-wide text-gold">
                {featured.category}
              </span>
            )}
            <time className="text-cream/50" dateTime={featured.date}>
              {formatDateShort(featured.date)}
            </time>
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold uppercase leading-tight text-cream transition-colors group-hover:text-gold sm:text-3xl">
            {featured.title}
          </h3>
          <p className="mt-3 text-cream/70">{featured.excerpt}</p>
        </Link>

        {/* Lista das últimas */}
        <ul className="flex flex-col divide-y divide-white/10 rounded-2xl border border-white/10 bg-navy-panel/60">
          {list.map((n) => (
            <li key={n.slug}>
              <Link
                href={`/noticias/${n.slug}`}
                className="group flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-white/[0.03]"
              >
                <div className="flex items-center gap-2 text-xs text-cream/50">
                  {n.category && <span className="text-gold-soft">{n.category}</span>}
                  <time dateTime={n.date}>{formatDateShort(n.date)}</time>
                </div>
                <span className="font-display text-lg font-semibold uppercase leading-tight text-cream transition-colors group-hover:text-gold">
                  {n.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
