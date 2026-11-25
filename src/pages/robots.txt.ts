import type { APIRoute } from "astro";

/**
 * robots.txt generado en el build. Permite el rastreo completo, incluidos los
 * buscadores con IA (ChatGPT Search, Perplexity, Claude, Gemini), para que tus
 * artículos y servicios puedan aparecer en sus respuestas.
 */
export const GET: APIRoute = ({ site }) => {
  const lines = ["User-agent: *", "Allow: /"];
  if (site) lines.push("", `Sitemap: ${new URL("sitemap-index.xml", site).href}`);
  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
