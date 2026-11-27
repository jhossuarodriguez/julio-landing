/**
 * Descarga el feed de Medium y lo AÑADE al archivo local de artículos (nunca borra ni
 * cambia el slug de uno existente). Después, haz commit de src/data/medium-articles.json.
 * Uso: pnpm sync:medium
 */
import { readFile, writeFile } from "node:fs/promises";
import { fetchFeed, parseFeed, mergeArchive, type Article } from "../src/lib/medium-feed.ts";

const user = process.argv[2] ?? "medina.juliocesar16";
const out = new URL("../src/data/medium-articles.json", import.meta.url);

let archive: Article[] = [];
try {
  archive = JSON.parse(await readFile(out, "utf8"));
} catch {
  /* primer uso */
}
// Archivos de versiones anteriores (sin id/slug/html) se regeneran desde el feed
archive = archive.filter((a) => a.id && a.slug && a.html);

const fresh = parseFeed(await fetchFeed(user));
const merged = mergeArchive(archive, fresh);
await writeFile(out, JSON.stringify(merged, null, 2) + "\n");
const added = merged.length - archive.length;
console.log(`✓ ${merged.length} artículos en el archivo (${added} nuevo${added === 1 ? "" : "s"}): src/data/medium-articles.json`);
