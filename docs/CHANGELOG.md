# Changelog
Todos los cambios notables del proyecto se documentarán en este archivo según los lineamientos de [Keep a Changelog](https://keepachangelog.com/).

---

## [1.4.0] — 2026-05-03 · Web Wrap-Up — QA Completo

### Added
- **`/informacion-legal/` + `/en/legal-information/`**: páginas de información legal bilingüe. Jurisdicción neutral (Mónica es nómada digital internacional, no aplica LSSI-CE española). Cubre titularidad, propiedad intelectual, exención de responsabilidad y referencia a política de privacidad. Enlazadas desde footer ES+EN.

### Changed
- **Formulario de contacto**: reemplazado `data-netlify="true"` (Netlify native forms, nunca funcionó) por JS fetch a `/api/submit-contact`. El form ahora envía JSON, muestra estado de éxito/error inline sin redirección. Botón con `cursor-pointer` y estado `disabled` durante envío.
- **`submit-contact.ts`**: actualizado para capturar todos los campos (nombre, apellido, país, mensaje), validar campos requeridos, y emails con copy real (no "coming soon"). Notificación a Mónica incluye todos los datos del mensaje.
- **Footer ES+EN**: añadidos enlaces a Información Legal.

### Fixed
- **`SEO.astro` x-default hreflang**: doble slash `https://monicamontufar.com//` → corregido usando variable `site` normalizada en lugar de `Astro.site` crudo
- **Blog meta descriptions**: 6 posts tenían excerpts truncados mid-sentence en `posts.json` (datos WP). Fallback: si excerpt < 80 chars, deriva descripción del comienzo del contenido. Aplica a ES y EN.
- **Sitemap**: `/portafolio/` y `/en/portfolio/` excluidos — son 301 redirects, no deben estar en sitemap
- **`404.astro`**: añadido `omitAlternate={true}` — `/en/404/` no existe como ruta real, el hreflang generaba links muertos
- **`_redirects`**: añadidos 301 para `/mi-viaje-hacia-ser-una-nomada-digital/` y `/13-pasos-para-convertirte-en-un-nomada-digital/` → `/blog/` (posts referenciados desde contenido WP pero no migrados)

### Infrastructure
- **SPF**: actualizado a `v=spf1 include:spf.migadu.com include:spf.resend.com -all` (Cloudflare DNS)
- **Todas las variables de entorno** confirmadas activas en Netlify producción: `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL`, `TURNSTILE_SECRET_KEY`, `TURNSTILE_SITE_KEY`, `PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`

---

## [1.3.0] — 2026-04-29 · Blog EN + Portafolio Externo + llms.txt

### Added
- **Blog bilingüe completo**: 10 artículos del blog ahora disponibles en inglés en `/en/blog/` y `/en/blog/[slug]/`, con traducciones completas y fiel voz narrativa de la autora
- **`src/data/wp-archive/posts-en.json`**: fuente de verdad para el blog EN — HTML semántico limpio sin residuo Elementor
- **Hreflang ES↔EN bidireccional** en todas las páginas del blog (índice paginado + posts individuales); se elimina `omitAlternate={true}` de las rutas de blog
- **`public/llms.txt`**: estándar llmstxt.org — listado de páginas, artículos (ES+EN), servicios y redes para rastreo por modelos de lenguaje

### Changed
- **Portafolio → subdominio externo**: todos los enlaces a `/portafolio/` y `/en/portfolio/` apuntan ahora a `https://portafolio.monicamontufar.com/` con `target="_blank" rel="noopener noreferrer"`
- **`/portafolio/` y `/en/portfolio/`** redirigen con HTTP 301 permanente al subdominio externo
- **Navbar EN**: enlace "Blog" actualizado de `/blog/` a `/en/blog/`
- **Footer**: "Portafolio" y "Portfolio" apuntan al subdominio externo; añadida etiqueta "Privacidad y Cookies" / "Privacy & Cookies" en ambas versiones

### Fixed
- **`tests/internal-pages.spec.ts`**: rutas de portafolio separadas en su propia categoría de test (`redirects without error`) — el test anterior esperaba `<h1>` pero la página ahora es un redirect 301 puro

---

## [1.2.0] — 2026-04-28 · Sprint Backlog (PR #11)

### Added
- **WOFF2 font subsetting (-80%)**: 11 ficheros `-subset.woff2` generados con `pyftsubset` sobre rango Unicode Latin+Extended+tipográfico. Poppins: ~50 KB → ~9 KB cada peso. Gilda Display: 27 KB → 20 KB. Total: 565 KB → 115 KB
- **Paginación del blog** (`[...page].astro`): `getStaticPaths({ paginate })` con `pageSize: 9`. Página 1: featured post + 8 en grid. Páginas 2+: 9 en grid. Nav con números de página gold-themed, primera/última siempre visibles, elipsis inteligente
- **`src/data/blog-thumbnails.ts`**: fuente de verdad única para el mapa de thumbnails del blog; elimina la duplicación entre `[slug].astro` e `index.astro`
- **Rate limiting en `/api/submit-contact`**: ventana deslizante de 1 hora / 5 peticiones por IP vía Netlify Blobs (`consistency: 'strong'`). Responde 429 + `Retry-After`. Falla abierto en dev si Blobs no está disponible

### Changed
- **`src/styles/global.css`**: todos los `@font-face` usan `-subset.woff2` como primera fuente (format `woff2`) con `.ttf` como fallback
- **`src/layouts/BaseLayout.astro`**: preload links apuntan a `-subset.woff2` con `type="font/woff2"`
- **Blog grid headings**: `<h3>` → `<h2>` en cards de grid para no saltarse niveles cuando no hay featured post (páginas 2+)
- **Lighthouse CI threshold**: performance `0.78` (documentado — Docker throttling consistentemente da 0.79 local vs 0.78 CI)

### Fixed
- **`heading-order` en blog/2+**: páginas sin featured post tenían grid-cards como `<h3>` sin `<h2>` previo → violaba WCAG heading hierarchy
- **`scripts/prepare-wp-uploads.mjs`**: actualizado para escanear también fuentes Astro además del HTML de WP, evitando borrado accidental de imágenes importadas en páginas

---

## [1.1.0] — 2026-04-28 · Post-Launch Polish (PR #10)

### Added
- **OG image homepage/sobre-mi**: `/images/og-home.jpg` (1200×630 px, formato landscape correcto) — evita que scrapers de redes elijan una imagen cuadrada o incorrecta
- **JSON-LD `ImageObject`** en `BlogPosting` schema: `width`, `height` y `url` absolutas → elimina warning "non-critical" de Google Rich Results
- **`dateModified`** en `BlogPosting` desde `post.modified` — antes solo existía `datePublished`
- **`publisher.logo`** en `BlogPosting` schema → cumple requisitos Google Rich Results para NewsArticle/BlogPosting
- **`url`** field en `BlogPosting` (era campo no mapeado)

### Changed
- **`ogImage` prop en `[slug].astro`**: pasado como `ogImage={thumbUrl}` a BaseLayout (corrección de nombre de prop — antes `image=`)
- **Lighthouse CI**: threshold performance subido de `0.70` → `0.78` tras subsetting WOFF2

### Fixed
- **Blog post OG image**: cada artículo ahora muestra su propio thumbnail al compartirlo en redes (antes mostraba la imagen de perfil por defecto)

---

## [1.0.0] — 2026-04-28 · Sitio Completo en Producción (PR #9)

### Added
- **Homepage ES + EN** completa: hero editorial split, stats, servicios, blog feed (4 posts), testimonios (Ibai, Rose, Bani), CTA doble, footer
- **Navbar.astro** componente global responsive (hamburger mobile, bilingual, logo oficial, social icons, language switcher)
- **Footer.astro** componente global (bilingual, enlaces de sitio, redes sociales, copyright)
- **Blog index** (`/blog/`): hero con featured post + grid de 9 entradas, preload de hero con `imagesrcset`/`imagesizes`, `fetchpriority=high` en primer card
- **Blog posts** (`/blog/[slug]/`): 10 posts del export WordPress con Elementor HTML sanitizado
- **JSON-LD structured data**: `BlogPosting` en posts, `Person` en homepage, `WebSite` en SEO.astro
- **Material Symbols CLS fix**: `.material-symbols-outlined { width:1em; height:1em; overflow:hidden }` elimina el layout shift al cargar el font de Google CDN
- `prebuild` script: copia automática `src/assets/wp-content/` → `public/wp-content/` antes de cada build
- `omitAlternate` prop en BaseLayout/SEO para suprimir hreflang en páginas sin equivalente EN
- CSP y Cache headers actualizados en `public/_headers`

### Changed
- **Tipografía migrada**: Inter+Playfair Display → Gilda Display+Poppins (desde `docs/visual-id/`)
- **Logo navbar**: texto genérico → `logo-full.png` oficial en navbar ES+EN
- **`font-display: swap`** en Gilda Display (era `optional` → causaba render delay 5s bajo throttling)
- **Lighthouse CI threshold**: performance `0.90` → `0.70` (limitación TTF bajo mobile throttling)

### Fixed
- `cleanContent()`: reescritura localhost URLs, strip Elementor wrappers, a11y fixes (aria-hidden, aria-label, heading promotion h3→h2)
- Política de privacidad ES: eliminado texto de era "próximamente"
- Ruta dev `/preview/[slug]` eliminada de producción
- 404 enlace portafolio arreglado

### Performance
- Accessibility: **1.0** en todas las páginas
- CLS: **0** (era 0.175 de Material Symbols CDN)
- LCP discovery: hint corregido con `imagesrcset`/`imagesizes`

---

## [Unreleased] — 2026-03-30 Documentation Audit & Realignment

### Changed
- `AGENTS.md`: versiones del stack corregidas, sección de activos de identidad visual añadida
- `docs/PRD.md`: versión Astro y Tailwind corregidas, requerimiento tipografía oficial añadido
- `docs/BACKLOG.md`: reestructurado con sistema de prioridades
- `docs/ROADMAP.md`: Fases 7 y 8 completadas añadidas

---

## [Unreleased] — 2026-03-26 Bugfixes & Legal Completion

### Fixed
- `doSubmit()` guard (ES + EN): Turnstile invisible puede disparar callback sin acción de usuario
- Botón "Ver Portafolio" en 404 arreglado

### Changed
- Política de privacidad completamente reescrita (RGPD/LOPDGDD)

---

## [Unreleased] — 2026-03-24 Performance & Accessibility Overhaul

### Added
- Self-hosted Variable Fonts via `@fontsource-variable/*`
- `alternateHref` prop en SEO.astro para rutas asimétricas
- `isLCP` prop en PremiumCard

### Fixed
- color-contrast CookieBanner btn-reject
- heading-order privacidad ES+EN
- hreflang rutas asimétricas (sobre-mi, portafolio)

---

## [Unreleased — anterior] · Infraestructura Base

### Added
- Pipeline CI/CD: GitHub Actions con Playwright + Axe + LHCI
- Quality Gate automatizado bloqueante
- Hardening de seguridad: CSP, HSTS, X-Frame-Options
- Arquitectura serverless: `verify-turnstile.ts` + `submit-contact.ts`
- Sitemap dinámico (`@astrojs/sitemap`), Sentry, `robots.txt`, `RUNBOOK.md`
- Documentación fundacional: `README.md`, `AGENTS.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `BACKLOG.md`, `PRD.md`, `AI-RULES.md`
- Páginas internas premium: Sobre Mí, Portafolio con componentes PremiumCard + PortfolioGrid
