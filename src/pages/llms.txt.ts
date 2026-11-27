import type { APIRoute } from "astro";
import base from "@/data/llms-base.txt?raw";
import { getArticles, articlePath } from "@/lib/medium";

/**
 * llms.txt: resumen para asistentes de IA. Texto fijo en @/data/llms-base.txt
 * + la lista de artículos, generada en cada build.
 */
export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => (site ? new URL(p, site).href : p);
  const articles = await getArticles();
  const list = articles.map((a) => `- [${a.title}](${abs(articlePath(a))}): ${a.excerpt}`).join("\n");
  const body = base.replace(
    "## Optional",
    `## Artículos\n\nEscritos por Julio Cesar Sánchez Medina (también publicados en Medium). Índice: ${abs("/articulos/")}\n\n${list}\n\n## Optional`,
  );
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
