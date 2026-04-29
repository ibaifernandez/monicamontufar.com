# monicamontufar.com

**Sitio web personal de Mónica Montúfar** — Diseñadora gráfica, nómada digital y asistente virtual. Bilingüe ES/EN, blog con 10 artículos, CI/CD completo y cero deuda técnica crítica.

[![Quality Gate](https://github.com/ibaifernandez/monicamontufar.com/actions/workflows/quality-gate.yml/badge.svg)](https://github.com/ibaifernandez/monicamontufar.com/actions/workflows/quality-gate.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/9aecd914-7663-48c8-a302-117a9e4762b1/deploy-status)](https://monicamontufar.com)
[![Playwright Tests](https://img.shields.io/badge/playwright-passing-brightgreen?logo=playwright&logoColor=white)](https://github.com/ibaifernandez/monicamontufar.com/actions)
[![Lighthouse Accessibility](https://img.shields.io/badge/accessibility-100%2F100-brightgreen?logo=googlechrome&logoColor=white)](https://github.com/ibaifernandez/monicamontufar.com/actions)
[![Lighthouse SEO](https://img.shields.io/badge/SEO-100%2F100-brightgreen?logo=googlechrome&logoColor=white)](https://github.com/ibaifernandez/monicamontufar.com/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-6-orange?logo=astro&logoColor=white)](https://astro.build)

---

## Live

🌐 **[monicamontufar.com](https://monicamontufar.com)** — Production (Netlify, auto-deploy from `main`)  
🗂️ **[portafolio.monicamontufar.com](https://portafolio.monicamontufar.com)** — Portfolio (subdominio externo)

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 6](https://astro.build) — SSG, `output: static` |
| Language | TypeScript (strict mode) |
| Styles | [TailwindCSS 4](https://tailwindcss.com) — `@import "tailwindcss"`, no config.js |
| Typography | Gilda Display + Poppins — self-hosted WOFF2 (subsetted, -80% size), zero render-blocking |
| Serverless | Netlify Functions v2 (TypeScript) |
| Testing | Playwright + Axe-core (a11y) + Lighthouse CI |
| Email | [Resend](https://resend.com) — transactional + audience management |
| Anti-bot | Cloudflare Turnstile (invisible) + honeypot + server-side validation |
| Rate limiting | Netlify Blobs — 5 req/h per IP on `/api/submit-contact` |
| Deploy | Netlify — auto-deploy on push to `main` |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage ES — hero, servicios, blog feed, testimonios |
| `/en/` | Homepage EN |
| `/sobre-mi/` | Sobre Mí |
| `/en/about-me/` | About Me |
| `/blog/` | Blog index ES — 10 artículos paginados (pageSize: 9) |
| `/blog/[slug]/` | Blog post individual ES |
| `/en/blog/` | Blog index EN |
| `/en/blog/[slug]/` | Blog post individual EN |
| `/contacto/` | Formulario de contacto |
| `/politica-de-privacidad-y-cookies/` | Política de privacidad + cookies ES (RGPD/LOPDGDD) |
| `/en/politica-de-privacidad-y-cookies/` | Privacy & Cookies Policy EN |
| `/portafolio/` | → 301 redirect a portafolio.monicamontufar.com |
| `/en/portfolio/` | → 301 redirect a portafolio.monicamontufar.com |
| `/404` | Página 404 personalizada |

---

## Features

- **Bilingüe completo ES/EN** — todas las páginas disponibles en ambos idiomas con hreflang bidireccional
- **Blog con 10 artículos** — migración desde WordPress/Elementor, HTML sanitizado, paginación, hreflang ES↔EN
- **WOFF2 font subsetting** — 11 ficheros de fuente con rango Unicode Latin/Extended (-80% tamaño vs TTF)
- **JSON-LD structured data** — BlogPosting, Person, WebSite (validado con Google Rich Results Test)
- **Cookie consent** — banner con 3 opciones (Aceptar todas / Solo esenciales / Rechazar), persistencia localStorage
- **Rate limiting serverless** — 5 req/hora por IP con Netlify Blobs
- **CI/CD Quality Gate** — Playwright visual regression + Axe-core a11y + Lighthouse CI, bloqueante en main
- **Lighthouse 100/100** — Accessibility, SEO, Best Practices; Performance ≥ 78 (throttling simulado)
- **llms.txt** — estándar llmstxt.org para discoverability por modelos de lenguaje
- **Security headers** — CSP, HSTS, X-Frame-Options en `public/_headers`
- **Real 404** — devuelve HTTP 404 (no soft 404)

---

## CI/CD Pipeline

```
Push to main
  → quality-gate.yml (GitHub Actions)
      → npm run build (Astro SSG + wp-uploads prebuild)
      → Playwright E2E + a11y (Docker: mcr.microsoft.com/playwright:v1.58.2-noble)
      → Lighthouse CI (Accessibility 1.0 / SEO 1.0 / Perf ≥ 0.78)
  → Si pasa: Netlify auto-deploy
```

Playwright corre en Docker para garantizar paridad visual exacta entre macOS local y Linux CI. Los baselines están versionados en `/tests/visual/screenshots/`.

---

## Getting Started

```bash
# Instalar dependencias
npm install

# Dev server
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

### Variables de entorno

```bash
cp .env.example .env
```

| Variable | Descripción |
|----------|-------------|
| `RESEND_API_KEY` | Clave API de Resend para envío de emails |
| `RESEND_AUDIENCE_ID` | ID de la Audience en Resend (opcional — para persistir contactos) |
| `CONTACT_EMAIL` | Email de destino para notificaciones (buzón de Mónica) |
| `FROM_EMAIL` | Dirección remitente verificada en Resend |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (pública) |

---

## Testing

```bash
# E2E + a11y (local)
npm run test:e2e

# Visual regression con Docker (idéntico a CI)
npm run test:visual:docker

# Actualizar baselines visuales
npm run test:visual:docker:update

# Lighthouse CI
npm run lhci
```

> Si modificas componentes visuales, la CI fallará en visual regression hasta que regeneres los baselines con el comando Docker.

---

## Project Structure

```
monicamontufar.com/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # Layout base — fuentes, head, SEO, cookie banner
│   ├── components/
│   │   ├── global/
│   │   │   ├── SEO.astro             # Meta tags, OG, hreflang, JSON-LD WebSite
│   │   │   ├── Navbar.astro          # Navbar responsive bilingüe
│   │   │   ├── Footer.astro          # Footer bilingüe con social links
│   │   │   └── CookieBanner.astro    # Cookie consent (3 opciones, localStorage)
│   │   ├── ui/                       # PremiumCard, botones, UI atoms
│   │   └── sections/                 # Hero, About, PortfolioGrid, InternalHero
│   ├── data/
│   │   ├── wp-archive/
│   │   │   ├── posts.json            # 10 posts exportados de WordPress (ES)
│   │   │   └── posts-en.json         # 10 posts traducidos al inglés (EN)
│   │   └── blog-thumbnails.ts        # SSOT del mapa slug → ImageMetadata
│   ├── pages/
│   │   ├── index.astro               # Homepage ES
│   │   ├── 404.astro
│   │   ├── blog/
│   │   │   ├── [...page].astro       # Blog index ES paginado
│   │   │   └── [slug].astro          # Blog post ES
│   │   ├── sobre-mi/index.astro
│   │   ├── portafolio/index.astro    # 301 → portafolio.monicamontufar.com
│   │   ├── contacto/index.astro
│   │   ├── politica-de-privacidad-y-cookies.astro
│   │   └── en/
│   │       ├── index.astro           # Homepage EN
│   │       ├── about-me/index.astro
│   │       ├── portfolio/index.astro # 301 → portafolio.monicamontufar.com
│   │       ├── blog/
│   │       │   ├── [...page].astro   # Blog index EN paginado
│   │       │   └── [slug].astro      # Blog post EN
│   │       └── politica-de-privacidad-y-cookies.astro
│   └── styles/
│       └── global.css                # Tailwind, @font-face WOFF2+TTF, custom props
├── netlify/
│   └── functions/
│       ├── submit-contact.ts         # Email via Resend + rate limiting Netlify Blobs
│       └── verify-turnstile.ts       # Validación Cloudflare Turnstile
├── tests/
│   ├── quality-gate.spec.ts          # Visual regression + Lighthouse a11y
│   └── internal-pages.spec.ts        # Smoke tests rutas internas
├── scripts/
│   └── prepare-wp-uploads.mjs        # Prebuild: copia src/assets/wp-content/ → public/
├── public/
│   ├── _headers                      # Security headers (CSP, HSTS, cache)
│   ├── _redirects                    # Bloqueo rutas sensibles
│   ├── fonts/                        # WOFF2 subsetted + TTF fallback
│   ├── images/                       # Logo, OG image, flags
│   ├── llms.txt                      # LLM discoverability (llmstxt.org)
│   └── robots.txt
├── docs/
│   ├── CHANGELOG.md
│   ├── BACKLOG.md
│   ├── ARCHITECTURE.md
│   ├── RUNBOOK.md
│   ├── PRD.md
│   ├── ROADMAP.md
│   └── AI-RULES.md
├── AGENTS.md                         # Instrucciones para agentes IA
├── lighthouserc.cjs                  # LHCI assertions con rationale documentado
├── playwright.config.ts
├── netlify.toml
└── astro.config.mjs
```

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Producción — auto-deploy a Netlify. Protegida por Quality Gate CI. |
| `staging-*` | Feature branches — deploy preview por PR. |

---

## Known Limitations

Entradas documentadas como `warn` en `lighthouserc.cjs`:

- `total-byte-weight` — Fuentes self-hosted (~115 KB tras subsetting). Decisión arquitectónica: zero render-blocking supera el coste de red.
- `dom-size-insight` (blog con muchos posts) — Acceptable hasta que el blog crezca a >50 posts.
- Performance CI threshold en `0.78` — Docker throttling consistentemente da 0.78–0.79; en producción real con CDN Cloudflare el LCP es 1–2s.

---

## Built by

**[Ibai Fernández](https://ibaifernandez.com)** @ **[AGLAYA](https://aglaya.biz)**

> *Why do it manually when a system can do it for you?*
