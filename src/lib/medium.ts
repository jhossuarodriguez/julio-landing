/**
 * Artículos de Julio (escritos en Medium) publicados también en el sitio, en /articulos/.
 *
 * Fuente: el feed RSS de Medium (solo trae los 10 más recientes) + el archivo
 * `@/data/medium-articles.json`, que solo crece. Así, cuando un artículo sale del feed
 * sigue teniendo su página, y su URL (slug) no cambia nunca: Medium apunta a ella
 * con el enlace canónico. Actualiza el archivo con `pnpm sync:medium` y haz commit.
 */
import archive from "@/data/medium-articles.json";
import { site } from "@/config/site";
import { fetchFeed, parseFeed, mergeArchive, type Article } from "@/lib/medium-feed";

export type { Article };

/** Cuántos artículos se destacan en la landing (y se describen en los datos estructurados). */
export const ARTICLES_SHOWN = 4;

/** Ruta del artículo en el sitio */
export const articlePath = (a: Pick<Article, "slug">) => `/articulos/${a.slug}/`;

let cache: Promise<Article[]> | undefined;

export function getArticles(): Promise<Article[]> {
  cache ??= fetchFeed(site.social.mediumUser)
    .then(parseFeed)
    .catch((err) => {
      console.warn(`[medium] Feed no disponible; se usa solo el archivo local (${err?.message ?? err})`);
      return [] as Article[];
    })
    .then((fresh) => {
      const merged = mergeArchive(archive as Article[], fresh);
      const nuevos = fresh.filter((a) => !(archive as Article[]).some((x) => x.id === a.id));
      if (nuevos.length) {
        console.warn(`[medium] ${nuevos.length} artículo(s) nuevo(s) aún no guardados en el archivo: ejecuta "pnpm sync:medium" y haz commit para fijar su URL.`);
      }
      return merged;
    });
  return cache;
}
