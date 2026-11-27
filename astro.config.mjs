// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";
import { site, services } from "./src/config/site.ts";
import { servicePages } from "./src/data/servicios.ts";

/**
 * Dominio público del sitio (con https y sin barra final), p. ej. "https://www.tudominio.com".
 * De él dependen el canonical, el sitemap, robots.txt, og:url/og:image e IndexNow.
 * Se puede sobrescribir en el hosting con la variable de entorno SITE_URL (útil para staging).
 */
const SITE_URL = process.env.SITE_URL ?? "https://juliocesarsanchez.com";

if (!SITE_URL) {
  console.warn(
    "\n⚠️  [seo] Falta el dominio: define SITE_URL en astro.config.mjs o como variable de entorno.\n" +
      "   Sin él no se generan canonical, sitemap ni URLs absolutas para compartir.\n",
  );
}

/** Fecha de última modificación de cada URL para el sitemap (<lastmod>), desde los mismos datos que muestran las páginas */
/** @type {{ slug: string; date: string }[]} */
const articles = JSON.parse(readFileSync(new URL("./src/data/medium-articles.json", import.meta.url), "utf8"));
/** @type {Map<string, string>} */
const lastmod = new Map(/** @type {[string, string][]} */ ([
  ["/", site.contentUpdated],
  ["/privacidad/", site.privacyUpdated],
  ["/articulos/", articles[0]?.date],
  ...articles.map((a) => [`/articulos/${a.slug}/`, a.date]),
  ...services.map((s) => [s.path, servicePages[s.slug].updated]),
]));

// https://astro.build/config
export default defineConfig({
  site: SITE_URL || undefined,
  // CSS en línea en el HTML: evita una petición bloqueante que retrasa el LCP (H1)
  build: { inlineStylesheets: "always" },
  integrations: SITE_URL
    ? [
        sitemap({
          filter: (page) => !page.includes("/404"),
          serialize(item) {
            const date = lastmod.get(new URL(item.url).pathname);
            return date ? { ...item, lastmod: new Date(date).toISOString() } : item;
          },
        }),
      ]
    : [],
  // Portadas de los artículos de Medium (se optimizan en el build)
  image: {
    domains: ["cdn-images-1.medium.com", "miro.medium.com"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
