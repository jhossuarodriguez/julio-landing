/**
 * Utilidades para las páginas de artículos (/articulos/…).
 */
import { getImage, inferRemoteSize } from "astro:assets";
import { services } from "@/config/site";
import type { Article } from "@/lib/medium";

export type RemoteImage = { src: string; width: number; height: number; alt: string };
export type ArticlePart = { type: "html"; html: string } | { type: "img"; img: RemoteImage };

/**
 * Tamaño de una imagen remota de Medium, necesario para optimizarla con <Image />
 * (AVIF servido desde el propio dominio: sin conexiones a terceros, como promete la
 * página de privacidad). Devuelve null si no se puede descargar.
 */
export async function remoteImage(src: string | null, alt = ""): Promise<RemoteImage | null> {
  if (!src) return null;
  try {
    const { width, height } = await inferRemoteSize(src);
    return { src, width, height, alt };
  } catch {
    console.warn(`[articulos] No se pudo descargar una imagen de Medium; se omite: ${src}`);
    return null;
  }
}

/**
 * Divide el HTML del artículo en trozos de texto e imágenes, para que cada imagen se
 * renderice con <Image />. Las que no se pueden descargar se eliminan (nunca se cargan
 * desde Medium). También devuelve la URL optimizada de la portada, para el schema.
 */
export async function splitArticle(html: string): Promise<{ parts: ArticlePart[]; cover: string | null }> {
  const images = new Map<string, RemoteImage | null>();
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    const src = tag.match(/src="([^"]+)"/)?.[1] ?? null;
    const alt = tag.match(/alt="([^"]*)"/)?.[1] ?? "";
    images.set(tag, await remoteImage(src, alt));
  }
  // Quita las imágenes fallidas y las figuras que quedaron vacías
  for (const [tag, img] of images) if (!img) html = html.replaceAll(tag, "");
  html = html.replace(/<figure>\s*<\/figure>/g, "");

  const parts: ArticlePart[] = [];
  let last = 0;
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (m.index > last) parts.push({ type: "html", html: html.slice(last, m.index) });
    parts.push({ type: "img", img: images.get(m[0])! });
    last = m.index + m[0].length;
  }
  if (last < html.length) parts.push({ type: "html", html: html.slice(last) });

  // Portada para el schema (JPG: el formato más compatible para buscadores y redes)
  const first = parts.find((p): p is Extract<ArticlePart, { type: "img" }> => p.type === "img")?.img;
  let cover: string | null = null;
  if (first) {
    const width = Math.min(first.width, 1200);
    const height = Math.round((first.height * width) / first.width);
    cover = (await getImage({ src: first.src, width, height, format: "jpg" })).src;
  }
  return { parts, cover };
}

/**
 * Servicio más afín al artículo (para el bloque "¿Te identificas?").
 * Temas de duelo, ruptura o crecimiento personal → terapia individual; el resto (pareja) → terapia de pareja.
 */
export function relatedService(a: Article) {
  const cats = a.categories.join(" ").toLowerCase();
  const individual = /(salud-mental|superaci|introspec|crecimiento|emocional|rechazo|abandono)/.test(cats);
  const pareja = /(terapia-de-pareja|couples|parejas)/.test(cats);
  const slug = individual && !pareja ? "individual" : "pareja";
  return services.find((s) => s.slug === slug)!;
}

/** Fecha legible en español (República Dominicana) */
export const fmtDate = (iso: string, month: "short" | "long" = "long") =>
  new Intl.DateTimeFormat("es-DO", { day: "numeric", month, year: "numeric", timeZone: "America/Santo_Domingo" }).format(
    new Date(iso),
  );
