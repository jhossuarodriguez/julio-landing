/**
 * Lectura y parseo del feed RSS de Medium. Sin alias ni dependencias de Astro
 * para poder usarse también desde `scripts/sync-medium.ts`.
 */
import { XMLParser } from "fast-xml-parser";
import sanitizeHtml from "sanitize-html";

export type Article = {
  /** Id del post en Medium (sufijo hexadecimal de su URL): estable aunque cambie el título */
  id: string;
  /** Ruta propia en el sitio (/articulos/<slug>/). Se congela al entrar en el archivo. */
  slug: string;
  title: string;
  url: string;
  date: string; // ISO
  excerpt: string;
  image: string | null;
  readingMinutes: number;
  categories: string[];
  /** Contenido completo, ya limpio (sin píxel de Medium ni etiquetas peligrosas) */
  html: string;
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
    // Sin espacio antes de la puntuación ("pareja ." → "pareja.") al quitar etiquetas en línea
    .replace(/\s+([.,;:!?)»”])/g, "$1")
    .trim();

/**
 * Extracto de hasta `max` caracteres (sirve también de meta description): termina en una
 * frase completa si cabe al menos una razonable; si no, corta en una palabra y añade "…".
 */
const truncate = (text: string, max = 155) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentenceEnd = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  if (sentenceEnd >= 80) return cut.slice(0, sentenceEnd + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:—-]+$/, "") + "…";
};

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** "…/11-formas-…-de-pareja-fd42d4170461" + título → { id: "fd42d4170461", slug: <título normalizado> } */
const idAndSlug = (url: string, title: string) => {
  const last = decodeURIComponent(url.split("/").pop() ?? "");
  const m = last.match(/^(.*)-([0-9a-f]{8,16})$/);
  // El slug sale del título (sin erratas del enlace de Medium); el id, del sufijo de Medium
  return { id: m?.[2] ?? slugify(title), slug: slugify(title) };
};

/**
 * Limpia el HTML de Medium para publicarlo en el sitio:
 * - quita el píxel de estadísticas y cualquier etiqueta/atributo no permitido
 * - baja un nivel los subtítulos (la página ya tiene su H1): h3→h2, h4→h3
 * - enlaces externos con rel seguro
 */
export const cleanArticleHtml = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "a", "ul", "ol", "li", "blockquote", "h2", "h3", "h4", "figure", "figcaption", "img", "hr", "code", "pre"],
    allowedAttributes: { a: ["href"], img: ["src", "alt", "width", "height"] },
    allowedSchemes: ["https", "mailto", "tel"],
    exclusiveFilter: (frame) => frame.tag === "img" && /medium\.com\/_\/stat/.test(frame.attribs.src ?? ""),
    transformTags: {
      h3: "h2",
      h4: "h3",
      a: (_tag, attribs) => ({
        tagName: "a",
        attribs: { href: attribs.href, ...(/^https?:/.test(attribs.href ?? "") ? { target: "_blank", rel: "noopener noreferrer" } : {}) },
      }),
    },
  }).trim();

/** Une el archivo guardado con el feed: añade artículos nuevos, actualiza los existentes y conserva su slug. */
export function mergeArchive(archive: Article[], fresh: Article[]): Article[] {
  const byId = new Map(archive.map((a) => [a.id, a]));
  for (const a of fresh) {
    const prev = byId.get(a.id);
    byId.set(a.id, prev ? { ...a, slug: prev.slug } : a);
  }
  return [...byId.values()].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

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

    const title = decodeEntities(String(item.title)).trim();
    const url = cleanUrl(String(item.link));
    return {
      ...idAndSlug(url, title),
      title,
      url,
      date: new Date(item.pubDate).toISOString(),
      excerpt: truncate(text),
      image,
      readingMinutes: Math.max(1, Math.round(words / 200)),
      categories: categories.map(String),
      html: cleanArticleHtml(html),
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
