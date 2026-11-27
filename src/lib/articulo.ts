/**
 * Utilidades para las páginas de artículos (/articulos/…).
 */
import { getImage, inferRemoteSize } from "astro:assets";
import { services } from "@/config/site";
import type { Article } from "@/lib/medium";

/**
 * Reemplaza las imágenes remotas de Medium por versiones optimizadas servidas desde el
 * propio dominio (así no hay conexiones a terceros, como promete la página de privacidad).
 * Si una imagen no se puede descargar, se elimina en lugar de cargarla desde Medium.
 */
export async function localizeImages(html: string): Promise<{ html: string; cover: string | null }> {
  const tags = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  let cover: string | null = null;
  for (const tag of tags) {
    const src = tag.match(/src="([^"]+)"/)?.[1];
    const alt = tag.match(/alt="([^"]*)"/)?.[1] ?? "";
    let replacement = "";
    if (src) {
      try {
        const { width, height } = await inferRemoteSize(src);
        const w = Math.min(width, 960);
        const h = Math.round((height * w) / width);
        const img = await getImage({ src, width: w, height: h, format: "avif" });
        replacement = `<img src="${img.src}" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async">`;
        cover ??= img.src;
      } catch {
        console.warn(`[articulos] No se pudo descargar una imagen de Medium; se omite: ${src}`);
      }
    }
    html = html.replace(tag, replacement);
  }
  // Figuras que quedaron vacías
  html = html.replace(/<figure>\s*<\/figure>/g, "");
  return { html, cover };
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
