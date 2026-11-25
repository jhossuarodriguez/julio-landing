/**
 * Artículos de Medium, leídos del feed RSS público en tiempo de build.
 * Si Medium no responde, se usa la copia local `@/data/medium-articles.json`
 * para que el build nunca falle. Regenera esa copia con `pnpm sync:medium`.
 */
import fallback from "@/data/medium-articles.json";
import { site } from "@/config/site";
import { fetchFeed, parseFeed, type Article } from "@/lib/medium-feed";

export type { Article };

/** Cuántos artículos se destacan en la landing (y se describen en los datos estructurados). */
export const ARTICLES_SHOWN = 4;

let cache: Promise<Article[]> | undefined;

export function getArticles(): Promise<Article[]> {
  cache ??= fetchFeed(site.social.mediumUser)
    .then(parseFeed)
    .then((list) => {
      if (!list.length) throw new Error("feed vacío");
      return list;
    })
    .catch((err) => {
      console.warn(`[medium] Usando copia local de artículos (${err?.message ?? err})`);
      return fallback as Article[];
    })
    .then((list) => [...list].sort((a, b) => +new Date(b.date) - +new Date(a.date)));
  return cache;
}
