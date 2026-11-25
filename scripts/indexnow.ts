/**
 * Avisa a Bing, Yandex, Naver, Seznam (IndexNow) de que el sitio cambió.
 * Ejecútalo DESPUÉS de publicar:  pnpm indexnow
 * La clave vive en public/<clave>.txt y se publica junto al sitio.
 */
const KEY = "2a8cd436d68695b7d232718a5c3d32d7";
const site = (process.env.SITE_URL ?? process.argv[2] ?? "https://juliocesarsanchez.com").replace(/\/$/, "");
if (!site.startsWith("https://")) {
  console.error("Indica el dominio: SITE_URL=https://www.tudominio.com pnpm indexnow");
  process.exit(1);
}
const host = new URL(site).host;
const urlList = [`${site}/`];

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${site}/${KEY}.txt`, urlList }),
});
console.log(res.ok ? `✓ IndexNow aceptó ${urlList.length} URL(s) (HTTP ${res.status})` : `✗ IndexNow respondió HTTP ${res.status}: ${await res.text()}`);
if (!res.ok) process.exit(1);

export {};
