import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllNewsSlugs, getNewsBySlug } from "@/lib/news";
import { formatDateLong } from "@/lib/format";

export function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getNewsBySlug(params.slug);
  if (!article) return { title: "Notícia não encontrada" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: "article" },
  };
}

// Estilos aplicados aos elementos gerados a partir do MDX.
const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 font-display text-2xl font-semibold uppercase tracking-tight text-cream"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 leading-relaxed text-cream/80" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-cream/80" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-cream/80" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-2 border-gold pl-4 italic text-cream/60"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-gold underline underline-offset-2 hover:text-gold-soft" {...props} />
  ),
};

export default function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getNewsBySlug(params.slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/noticias"
        className="font-display text-sm uppercase tracking-wide text-gold-soft hover:text-gold"
      >
        ← Notícias
      </Link>

      <header className="mt-6 border-b border-white/10 pb-8">
        <div className="flex items-center gap-3 text-sm">
          {article.category && (
            <span className="rounded-full bg-gold/15 px-3 py-1 font-display text-xs uppercase tracking-wide text-gold">
              {article.category}
            </span>
          )}
          <time className="text-cream/50" dateTime={article.date}>
            {formatDateLong(article.date)}
          </time>
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-cream sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-cream/70">{article.excerpt}</p>
        {article.author && (
          <p className="mt-4 text-sm text-cream/50">Por {article.author}</p>
        )}
      </header>

      <div className="mt-8">
        <MDXRemote source={article.content} components={mdxComponents} />
      </div>
    </article>
  );
}
