/**
 * Descarga el feed de Medium y actualiza la copia local usada como respaldo.
 * Uso: pnpm sync:medium
 */
import { writeFile } from "node:fs/promises";
import { fetchFeed, parseFeed } from "../src/lib/medium-feed.ts";

const user = process.argv[2] ?? "medina.juliocesar16";
const articles = parseFeed(await fetchFeed(user));
const out = new URL("../src/data/medium-articles.json", import.meta.url);
await writeFile(out, JSON.stringify(articles, null, 2) + "\n");
console.log(`✓ ${articles.length} artículos guardados en src/data/medium-articles.json`);
