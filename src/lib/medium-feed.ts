/**
 * Lectura y parseo del feed RSS de Medium. Sin alias ni dependencias de Astro
 * para poder usarse también desde `scripts/sync-medium.ts`.
 */
import { XMLParser } from "fast-xml-parser";

export type Article = {
  title: string;
  url: string;
  date: string; // ISO
  excerpt: string;
  image: string | null;
  readingMinutes: number;
  categories: string[];
};

const decodeEntities = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

const toText = (html: string) =>
  decodeEntities(
    html
      .replace(/<figure[\s\S]*?<\/figure>/gi, " ")
      .replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

const truncate = (text: string, max = 180) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:—-]+$/, "") + "…";
};

/** Quita el parámetro de tracking `?source=rss-…` de los enlaces del feed. */
const cleanUrl = (url: string) => url.split("?")[0];

export function parseFeed(xml: string): Article[] {
  const parser = new XMLParser({ ignoreAttributes: true, cdataPropName: false });
  const data = parser.parse(xml);
  const raw = data?.rss?.channel?.item ?? [];
  const items: any[] = Array.isArray(raw) ? raw : [raw];

  return items.map((item) => {
    const html: string = String(item["content:encoded"] ?? item.description ?? "");
    // La primera <img> real (se ignoran los píxeles de estadísticas de Medium)
    const image =
      [...html.matchAll(/<img[^>]+src="([^"]+)"/gi)].map((m) => m[1]).find((src) => !src.includes("/_/stat")) ?? null;
    const text = toText(html);
    const words = text.split(" ").length;
    const categories = item.category ? (Array.isArray(item.category) ? item.category : [item.category]) : [];

    return {
      title: decodeEntities(String(item.title)).trim(),
      url: cleanUrl(String(item.link)),
      date: new Date(item.pubDate).toISOString(),
      excerpt: truncate(text),
      image,
      readingMinutes: Math.max(1, Math.round(words / 200)),
      categories: categories.map(String),
    };
  });
}

export const feedUrl = (user: string) => `https://medium.com/feed/@${user}`;

export async function fetchFeed(user: string, timeoutMs = 8000): Promise<string> {
  const res = await fetch(feedUrl(user), {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; landing-build)" },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`Medium respondió ${res.status}`);
  return res.text();
}
