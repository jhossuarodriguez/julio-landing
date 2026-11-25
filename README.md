# Landing — Julio Cesar Sánchez Medina, Psicoterapeuta

Landing page construida con **Astro 7** y **Tailwind CSS 4**, basada en el manual de marca
(paleta, tipografías, logotipo y estilo fotográfico).

## Comandos

| Comando           | Acción                                         |
| :---------------- | :--------------------------------------------- |
| `pnpm install`    | Instala dependencias                           |
| `pnpm dev`     | Servidor de desarrollo en `localhost:4321`     |
| `pnpm build`   | Genera el sitio estático en `./dist/`          |
| `pnpm preview` | Sirve el build localmente                      |
| `pnpm astro check` | Verificación de tipos                          |
| `pnpm sync:medium` | Actualiza la copia local de artículos de Medium |
| `pnpm indexnow` | Avisa a Bing/Yandex de cambios (tras publicar; requiere `SITE_URL`) |

## Estructura

```
src/
├── assets/
│   ├── brand/        # Logotipo (símbolo JS + red neuronal) en blanco y verde
│   └── images/       # Fotografías y textura verde del manual
├── components/
│   ├── layout/       # Header (menú móvil) y Footer
│   ├── sections/     # Hero, About, Services, Articles, Booking, Contact
│   └── ui/           # Logo, Icon (SVG en línea), FloatingBooking
├── config/site.ts    # ⭐ Teléfonos, centros de citas, contacto, Medium y navegación
├── data/medium-articles.json  # Copia de respaldo de los artículos
├── lib/              # Lectura del feed RSS de Medium
├── layouts/Layout.astro
├── pages/index.astro
└── styles/global.css # Tokens de marca (@theme) y utilidades
```

### Rutas absolutas

Todas las importaciones usan el alias `@/` → `src/` (definido en `tsconfig.json`), por ejemplo:

```astro
import Logo from "@/components/ui/Logo.astro";
import { site } from "@/config/site";
```

Los enlaces internos también son absolutos (`/#agenda`, `/#servicios`, …).

## Agenda tu cita

Todos los botones "Agenda tu cita" llevan a la sección `/#agenda`, donde cada centro tiene un
botón de **WhatsApp** (con mensaje prellenado) y uno de **llamada**. Para cambiar centros,
teléfonos o el mensaje, edita `bookingCenters` y `BOOKING_MESSAGE` en `src/config/site.ts`.

## Artículos de Medium

La sección **Artículos** (`/#articulos`) lee el feed RSS de
[medium.com/@medina.juliocesar16](https://medium.com/@medina.juliocesar16) **al hacer el build**
y muestra los 4 más recientes (el primero destacado). Las portadas se optimizan a WebP.

- Como el sitio es estático, un artículo nuevo aparece al **volver a hacer build/deploy**
  (puedes programar un rebuild diario en Netlify/Vercel/Cloudflare).
- Si Medium no responde durante el build, se usa `src/data/medium-articles.json`.
  Actualízalo con `pnpm sync:medium`.
- Para mostrar más o menos artículos, cambia `SHOWN` en `src/components/sections/Articles.astro`.

## SEO y dominio

El dominio es **https://juliocesarsanchez.com** (`SITE_URL` en `astro.config.mjs`; se puede
sobrescribir con la variable de entorno `SITE_URL`, p. ej. para un staging). Con él se generan automáticamente:

- `<link rel="canonical">`, `og:url` y URLs absolutas de `og:image`
- `sitemap-index.xml` (con `@astrojs/sitemap`) y la línea `Sitemap:` de `robots.txt`

Sin dominio, el build avisa y omite esas URLs en lugar de generar unas incorrectas.

- **Imagen para compartir:** `public/og-image.jpg` (1200×630, JPG por compatibilidad con WhatsApp/Facebook).
- **Datos estructurados:** JSON-LD `WebSite` + `Person` en `src/layouts/Layout.astro`.
- **404:** `src/pages/404.astro` (con `noindex`).
- **IndexNow:** la clave está en `public/<clave>.txt`; tras cada publicación ejecuta
  `pnpm indexnow`.

## Publicar en Cloudflare

Se publica como **Cloudflare Worker con static assets** (`wrangler.jsonc` sirve la carpeta `dist/`).
En **Workers & Pages → Create → Import a repository**:

| Campo | Valor |
|---|---|
| Build command | `pnpm run build` |
| Deploy command | `npx wrangler deploy` |
| Variable de build | `NODE_VERSION` = `22` |

El nombre del Worker en el panel debe ser **`julio-landing`** (igual que `name` en `wrangler.jsonc`).
`public/_headers` aplica cabeceras de seguridad (HSTS, CSP…) y caché, y las rutas inexistentes
devuelven `404.html` con estado 404. Para validar sin publicar: `pnpm wrangler deploy --dry-run`.

En el panel de Cloudflare del dominio:
- **SSL/TLS → Full (strict)** y **Always Use HTTPS** activado.
- **Settings → Domains & Routes** del Worker: añadir `juliocesarsanchez.com` y `www.juliocesarsanchez.com`.
- **Redirect Rule** `www.juliocesarsanchez.com/*` → `https://juliocesarsanchez.com/$1` (301).
- Tras el primer deploy: enviar `https://juliocesarsanchez.com/sitemap-index.xml` en Google Search Console
  y Bing Webmaster Tools, y ejecutar `pnpm indexnow`.

## Marca

- Colores: verde apagado `#9dab87`, amarillo pastel `#dfd7b2`, naranja apagado `#E08F62`,
  naranja `#CC7353`, verde bosque `#3f4537` (clases `sage`, `cream`, `apricot`, `terracotta`, `forest`…).
- Tipografía primaria del manual: *The Seasons* (comercial). Se usa **Gilda Display** como
  alternativa libre; si se adquiere la licencia, basta cambiar `--font-display` en `global.css`.
- Tipografía secundaria: **Poppins**.
