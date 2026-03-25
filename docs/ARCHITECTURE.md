# Architecture Technical Design

## Core Stack
- **Framework**: Astro 6 (SSG — Static Site Generation).
- **Styling**: TailwindCSS 4 + `@tailwindcss/vite`.
- **Hosting**: Netlify estático + Serverless (`netlify/functions`).
- **Source**: Migración de WordPress local → Astro estático.
- **QA & Observabilidad**: Pipeline GitHub Actions bloqueante (Playwright + Axe A11y + Regresión Visual + Lighthouse CI). Sentry error tracking + UptimeRobot pasivo (`RUNBOOK.md`).

## Tipografía (Self-hosted, zero render-blocking)
- **Inter Variable** vía `@fontsource-variable/inter` — `font-family: "Inter Variable"` — importado en `BaseLayout.astro` (bundled por Vite, cero requests externos).
- **Playfair Display Variable** vía `@fontsource-variable/playfair-display` — `font-family: "Playfair Display Variable"`.
- **Material Symbols** — sigue cargando desde Google CDN pero de forma **async no-blocking** (`rel="preload" as="style" onload=...`). Iconos decorativos, no afectan LCP ni FCP.
- Fallback chain en `global.css`: `"Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif`.
  - *Nota sobre Regresión Visual*: Dado que GitHub Actions corre en `ubuntu-latest` nativamente con fuentes variables, se inyecta la directiva `container: mcr.microsoft.com/playwright` para que la CI entera procese la UI idéntica al entorno Linux de Microsoft. Localmente en macOS/Windows, los *snapshots base* se generan **aisladamente dentro del mismo contenedor Docker de Ubuntu** usando el comando de paquete `npm run test:visual:docker`, logrando la paridad multiplataforma absoluta.
## Component Structure y Modulidad
```
src/
 ├─ components/
 │   ├─ global/          (SEO.astro, Header, Footer)
 │   ├─ ui/              (Buttons, Cards pre-estilizados Premium)
 │   └─ sections/        (Hero, About, PortfolioGrid)
 ├─ layouts/
 │   └─ BaseLayout.astro (Inyecta fuentes, SEO, Tailwind Base, Hreflangs)
 ├─ pages/               
 │   ├─ index.astro      (ES Home)
 │   └─ en/
 │       └─ index.astro  (EN Home)
 └─ styles/
     └─ global.css       (Directivas Tailwind, root custom props limitadas)
```

## i18n Estrategia
- Sin dependencias externas pesadas. Diccionario en `src/i18n/ui.ts`.
- `hreflang` cruzados gestionados por `SEO.astro`. Para rutas simétricas (home, privacidad) se infieren automáticamente. Para rutas **asimétricas** (`/sobre-mi/` ↔ `/en/about-me/`, `/portafolio/` ↔ `/en/portfolio/`) se pasa `alternateHref` explícito desde la página vía `BaseLayout`. Esto evita hreflang apuntando a URLs 404.

## SEO
- `SEO.astro`: `<title>`, `<meta description>`, canonical, hreflang, OG completo, Twitter Cards. Sin duplicados (BaseLayout no repite tags).
- Sitemap automático vía `@astrojs/sitemap` en cada build.
- `robots.txt` explícito.
- Lighthouse CI gate en `.github/workflows/quality-gate.yml`: Performance ≥90, Accessibility 100, SEO ≥90, Best Practices ≥90.

## Performance (decisiones de implementación)
- **LCP images**: marcadas con `loading="eager"` + `fetchpriority="high"` + prop `isLCP={true}` en PremiumCard. Sin lazy-load en imágenes above-the-fold.
- **Imágenes responsive**: todos los `<Image>` de Astro incluyen `widths` y `sizes` para generar `srcset` multi-resolución y WebP automático.
- **Sentry**: `autoSessionTracking:false`, replays desactivados → bundle JS mínimo al cliente. Solo error tracking esencial.

## Controles de Hosting y Seguridad
- Repositorio vinculado: GitHub con CI gate automatizado.
- Netlify Functions para capa backend.
- Bloqueo de URLs Legacy y CSP mediante `public/_headers` y `_redirects`.
- Limitador inteligente de builds inútiles en `netlify.toml`.
