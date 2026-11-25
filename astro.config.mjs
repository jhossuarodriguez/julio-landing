// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

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

// https://astro.build/config
export default defineConfig({
  site: SITE_URL || undefined,
  integrations: SITE_URL ? [sitemap({ filter: (page) => !page.includes("/404") })] : [],
  // Portadas de los artículos de Medium (se optimizan en el build)
  image: {
    domains: ["cdn-images-1.medium.com", "miro.medium.com"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
