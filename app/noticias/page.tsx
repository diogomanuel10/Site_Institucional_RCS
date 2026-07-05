import type { Metadata } from "next";
import Link from "next/link";
import { getAllNews } from "@/lib/news";
import { formatDateShort } from "@/lib/format";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Últimas notícias do Real Clube Senhorense.",
};

export default function NewsIndexPage() {
  const news = getAllNews();

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
      <p className="eyebrow">Atualidade</p>
      <h1 className="section-title mt-2 text-cream">Notícias</h1>

      {news.length === 0 ? (
        <p className="mt-10 text-cream/60">Ainda não há notícias publicadas.</p>
      ) : (
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <li key={n.slug}>
              <Link
                href={`/noticias/${n.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-navy-panel p-6 transition-colors hover:border-gold/40"
              >
                <div className="flex items-center gap-3 text-xs">
                  {n.category && (
                    <span className="rounded-full bg-gold/15 px-3 py-1 font-display uppercase tracking-wide text-gold">
                      {n.category}
                    </span>
                  )}
                  <time className="text-cream/50" dateTime={n.date}>
                    {formatDateShort(n.date)}
                  </time>
                </div>
                <h2 className="mt-4 font-display text-xl font-semibold uppercase leading-tight text-cream transition-colors group-hover:text-gold">
                  {n.title}
                </h2>
                <p className="mt-3 flex-1 text-sm text-cream/70">{n.excerpt}</p>
                <span className="mt-4 font-display text-sm uppercase tracking-wide text-gold-soft">
                  Ler mais →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
