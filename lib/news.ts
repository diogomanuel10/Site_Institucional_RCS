import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Camada de notícias em MDX versionado no repositório.
 *
 * Fluxo editorial: escrever um ficheiro `.mdx` em content/noticias/ → push →
 * deploy. Sem base de dados, sem painel. O nome do ficheiro é o slug.
 */

const NEWS_DIR = path.join(process.cwd(), "content", "noticias");

export interface NewsFrontmatter {
  title: string;
  date: string; // ISO (YYYY-MM-DD)
  excerpt: string;
  author?: string;
  category?: string;
  featured?: boolean;
  cover?: string;
}

export interface NewsMeta extends NewsFrontmatter {
  slug: string;
}

export interface NewsArticle extends NewsMeta {
  content: string;
}

function readDir(): string[] {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs.readdirSync(NEWS_DIR).filter((f) => f.endsWith(".mdx"));
}

/** Todas as notícias, ordenadas da mais recente para a mais antiga. */
export function getAllNews(): NewsMeta[] {
  return readDir()
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(NEWS_DIR, file), "utf8");
      const { data } = matter(raw);
      return { slug, ...(data as NewsFrontmatter) };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** A notícia em destaque (featured: true) ou, na falta dela, a mais recente. */
export function getFeaturedNews(): NewsMeta | null {
  const all = getAllNews();
  if (all.length === 0) return null;
  return all.find((n) => n.featured) ?? all[0];
}

/** Uma notícia completa por slug, com o corpo MDX. */
export function getNewsBySlug(slug: string): NewsArticle | null {
  const file = path.join(NEWS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, content, ...(data as NewsFrontmatter) };
}

/** Slugs de todas as notícias — para generateStaticParams. */
export function getAllNewsSlugs(): string[] {
  return readDir().map((f) => f.replace(/\.mdx$/, ""));
}
