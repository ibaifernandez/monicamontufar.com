# Architecture Technical Design

**Última actualización:** 2026-04-29

---

## Core Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 6 (SSG — `output: static`) |
| Styles | TailwindCSS 4 + `@tailwindcss/vite` |
| Hosting | Netlify — estático + Serverless Functions v2 |
| Source data | WordPress export → JSON (`src/data/wp-archive/`) |
| QA | GitHub Actions: Playwright + Axe A11y + Regresión Visual + Lighthouse CI |

---

## Tipografía (Self-hosted, zero render-blocking)

- **Gilda Display** — `font-family: var(--font-serif)` — titulares y headings
- **Poppins** (Regular, Medium, SemiBold, Bold, Light + itálicas) — `font-family: var(--font-sans)` — texto de cuerpo y UI
- **Material Symbols Outlined** — iconos, carga desde Google CDN de forma async no-blocking (`rel="preload" as="style" onload=...`)

### Subsetting WOFF2

Todos los `@font-face` usan `-subset.woff2` como primera fuente con `.ttf` como fallback:

```css
src: url("/fonts/GildaDisplay-Regular-subset.woff2") format("woff2"),
     url("/fonts/GildaDisplay-Regular.ttf") format("truetype");
```

Rango Unicode: `U+0020-007E, U+00A0-017F, U+0180-024F, U+2013-2014, U+2018-201F, U+2022, U+2026, U+20AC, U+FEFF` — cubre Latin, Latin Extended-A/B y caracteres tipográficos. Total: 565 KB TTF → 115 KB WOFF2 (-80%).

Los ficheros TTF completos permanecen en `public/fonts/` como fallback para browsers que no soporten WOFF2 (< 0.5% del tráfico).

---

## Arquitectura de Páginas

```
src/pages/
├── index.astro                    # Homepage ES
├── 404.astro
├── blog/
│   ├── [...page].astro            # Blog index paginado (pageSize 9, Astro paginate())
│   └── [slug].astro               # Blog post individual
├── sobre-mi/index.astro
├── portafolio/index.astro         # 301 → portafolio.monicamontufar.com
├── contacto/index.astro
├── politica-de-privacidad-y-cookies.astro
└── en/                            # Espejo EN de todas las rutas ES
    ├── index.astro
    ├── about-me/index.astro
    ├── portfolio/index.astro      # 301 → portafolio.monicamontufar.com
    ├── blog/
    │   ├── [...page].astro
    │   └── [slug].astro
    └── politica-de-privacidad-y-cookies.astro
```

---

## Blog: Arquitectura de Datos

### Fuente de datos

WordPress fue el CMS original. Se exportó el contenido a JSON vía la WP REST API:

```
src/data/wp-archive/
├── posts.json       # 10 posts ES — estructura completa WP (title.rendered, content.rendered, etc.)
└── posts-en.json    # 10 posts EN — misma estructura, HTML semántico limpio (sin Elementor wrappers)
```

### Limpieza de HTML Elementor (`cleanContent()`)

El HTML en `posts.json` viene de Elementor y contiene capas de `<div>` con clases `elementor-*`. La función `cleanContent()` en `[slug].astro` aplica estas transformaciones en orden:

1. Reescritura de URLs `localhost:*` a paths relativos
2. Strip de opening tags `<div|section|article>` con clases `elementor-*`
3. Strip de closing tags correspondientes
4. Strip de clases `elementor-*` en tags restantes
5. Strip de atributos `style="color:*"` (negro sobre fondo blanco → invisible en dark theme)
6. `data-elementor-lightbox-title` → `aria-label` (fix `link-name` a11y)
7. Strip de `aria-label="Read more about…"` en inglés sobre texto español
8. `tabindex="-1"` links → añadir `aria-hidden="true"` (fix `link-name` a11y)
9. `h3` → `h2`, `h4` → `h3` (fix heading-order: el post title es h1)
10. Colapso de whitespace excesivo

Los posts EN en `posts-en.json` ya son HTML semántico limpio — `cleanContent()` actúa como passthrough.

### Thumbnails

```
src/data/blog-thumbnails.ts
```

SSOT del mapa `slug → ImageMetadata`. Importado tanto por `[slug].astro` como por `[...page].astro`. Las imágenes están en `src/assets/wp-content/uploads/` y son procesadas por Astro Image a WebP + múltiples resoluciones en build time.

El script `scripts/prepare-wp-uploads.mjs` (prebuild) copia `src/assets/wp-content/` → `public/wp-content/` para que los paths `<img src="/wp-content/...">` del HTML de Elementor funcionen en producción.

---

## i18n Estrategia

Sin dependencias externas pesadas. Patrón basado en:

1. **Rutas paralelas**: `/ruta-es/` ↔ `/en/route-en/` — cada página gestiona sus propias cadenas de texto
2. **`hreflang` cruzados**: gestionados en `SEO.astro`. Para rutas simétricas (home, privacidad) se infieren automáticamente. Para rutas asimétricas se pasa `alternateHref` explícito:

```astro
<BaseLayout alternateHref="/en/about-me/" lang="es">
```

3. **Blog**: mismo slug en ambos idiomas (`/blog/[slug]/` ↔ `/en/blog/[slug]/`) — el hreflang se construye dinámicamente en `[slug].astro`.
4. **`omitAlternate={true}`**: prop para suprimir hreflang en páginas sin equivalente (contacto, formularios).

---

## SEO Técnico

- `SEO.astro`: `<title>`, `<meta description>`, canonical, hreflang, OG completo, Twitter Cards. Sin duplicados.
- Sitemap automático vía `@astrojs/sitemap` en cada build.
- `robots.txt` explícito con Sitemap reference.
- `public/llms.txt`: estándar llmstxt.org para discoverability por modelos de lenguaje.
- **JSON-LD schemas**:
  - `WebSite` (global, en todos los `<head>` vía SEO.astro)
  - `Person` (homepage ES + EN)
  - `BlogPosting` (cada post del blog, ES + EN) — incluye ImageObject con dimensiones, datePublished, dateModified, author, publisher con logo

### Lighthouse CI thresholds (`lighthouserc.cjs`)

| Audit | Threshold | Rationale |
|-------|-----------|-----------|
| performance | ≥ 0.78 | Docker throttling consistentemente da 0.78–0.79; en prod CDN el LCP es 1–2s |
| accessibility | 1.0 | No negotiable |
| seo | 1.0 | No negotiable |
| best-practices | 1.0 | No negotiable |

---

## Performance

- **LCP images**: `loading="eager"` + `fetchpriority="high"` + preload en `<head>` con `imagesrcset`/`imagesizes`
- **Imágenes responsive**: todos los `<Image>` incluyen `widths` y `sizes` → `srcset` WebP multi-resolución
- **Font display**: `swap` en todas las fuentes (evita invisible text durante carga)
- **Blog pagination**: `pageSize: 9` — evita DOM inflation con muchos posts

---

## Serverless (Netlify Functions v2)

### `submit-contact.ts` — `/api/submit-contact`

Flujo completo:
1. **Rate limiting** por IP (5 req/hora) vía Netlify Blobs (`consistency: strong`). Falla abierto en dev.
2. **Honeypot** (`bot_field`, `website`) — responde 200 silencioso a bots
3. **Validación** de email con regex
4. **Resend Audience** — `contacts.create()` idempotente (no duplica si el email ya existe)
5. **Email notificación** a Mónica (dark-themed HTML)
6. **Email confirmación** al suscriptor

Variables de entorno requeridas: `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` (opcional), `CONTACT_EMAIL`, `FROM_EMAIL`.

### `verify-turnstile.ts` — `/api/verify-turnstile`

Valida tokens de Cloudflare Turnstile (invisible mode) contra la API de CF. Variable requerida: `TURNSTILE_SECRET_KEY`.

---

## Controles de Seguridad

- **`public/_headers`**: CSP (`script-src`, `style-src`, `img-src`), HSTS (`max-age=31536000; includeSubDomains`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, cache headers por tipo de fichero
- **`public/_redirects`**: bloqueo de rutas sensibles (`.env`, `.git`, `wp-admin`, etc.)
- **`netlify.toml`**: `ignore = "git diff --quiet HEAD^ HEAD -- . ':(exclude)docs/'"`  — evita builds inútiles por cambios solo en documentación
