# Changelog
Todos los cambios notables del proyecto se documentarán en este archivo según los lineamientos de [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased] — 2026-03-24 Performance & Accessibility Overhaul

### Added
- **Self-hosted Variable Fonts**: Migración de Google Fonts (render-blocking) a `@fontsource-variable/inter` y `@fontsource-variable/playfair-display`. Elimina 2 peticiones externas render-blocking, mejora FCP y LCP de forma drástica. Fallback chain completo: variable → static → sistema.
- **`alternateHref` prop en `SEO.astro`**: Permite pasar la URL alternativa (otro idioma) de forma explícita para rutas asimétricas (`/sobre-mi/` ↔ `/en/about-me/`, `/portafolio/` ↔ `/en/portfolio/`). Corrige hreflang que apuntaban a URLs 404.
- **`isLCP` prop en `PremiumCard`**: Marca explícitamente qué imagen es el LCP de la página, aplicando `loading="eager"` y `fetchpriority="high"` solo donde corresponde.

### Changed
- **`BaseLayout.astro`**: Eliminados meta tags OG/Twitter duplicados (ya existían en `SEO.astro`). Eliminados hreflang hardcodeados a `/` y `/en/` (solo correctos para home). Material Symbols ahora carga de forma async no-blocking (`rel="preload" as="style"`).
- **`PremiumCard.astro`**: Añadidos atributos `widths=[400,800,1200]` y `sizes` para generar `srcset` responsive. Resuelve `uses-responsive-images`.
- **`sobre-mi` y `about-me`**: Imagen de perfil con `loading="eager"` + `fetchpriority="high"` + `widths`/`sizes` responsive. Resuelve `lcp-lazy-loaded` e `image-delivery-insight`.
- **`global.css`**: Font families actualizadas a nombres de variable fonts con fallback chain explícito.
- **`astro.config.mjs`**: Sentry configurado con `autoSessionTracking:false`, `replaysSessionSampleRate:0`, `replaysOnErrorSampleRate:0` para reducir bundle JS al cliente.
- **`lighthouserc.cjs`**: Reescrito con comentarios que documentan cada decisión de assertion. `legacy-javascript` y `unused-javascript` degradados a `warn` (Sentry SDK, tercero). `network-dependency-tree-insight` y `dom-size-insight` a `warn` con justificación arquitectónica.

### Fixed
- **`color-contrast`** (Lighthouse A11y 0.95 → 1.0): `btn-reject` en `CookieBanner.astro` tenía `text-slate-400` (`#90A1B9`) sobre fondo gold compuesto por `backdrop-blur`, resultando en 2.63:1. Corregido a `text-white/75` (≥4.5:1).
- **`heading-order`** (privacidad ES + EN): Los `<h3>` de secciones bajo `<h1>` violaban la jerarquía WCAG. Corregidos a `<h2>`.
- **hreflang SEO crítico**: `/sobre-mi/` apuntaba a `/en/sobre-mi/` (404) en lugar de `/en/about-me/`. Ídem `/portafolio/` → `/en/portfolio/`. Corregido vía prop explícita.

## [Unreleased — anterior]
### Added
- Infraestructura CI/CD: Pipeline bloqueante en GitHub Actions (`quality-gate.yml`) con validación de tests E2E y build.
- Quality Gate Automático: Integración de `@lhci/cli` para presupuestos de Performance/SEO y `@axe-core/playwright` para accesibilidad.
- Pruebas E2E de Accesibilidad y Regresión Visual (Baseline desktop/mobile) usando Playwright en `tests/quality-gate.spec.ts`.
- Hardening de Seguridad: Cabeceras en `public/_headers` (CSP, HSTS, X-Frame-Options, XSS Protection) y rutas ocultas/denegadas en `_redirects`.
- Arquitectura Serverless (Netlify): Funciones `verify-turnstile.ts` para validación de CAPTCHA y `submit-contact.ts` con análisis honeypot silencioso.
- Observabilidad y SEO Técnico: Sitemap generado dinámicamente (`@astrojs/sitemap`), tracking de errores en el frontend con Sentry (`@sentry/astro`), `robots.txt` explícito y un `docs/RUNBOOK.md` operativo P1/P2/P3.
- Template base en `/html/monicamontufar.com-astro/`.
- `README.md` y `AGENTS.md` fundacionales.
- `docs/ARCHITECTURE.md`, `ROADMAP.md`, `BACKLOG.md`, `PRD.md`, `AI-RULES.md`.
- TailwindCSS, Vitest, Playwright.
- Páginas internas premium: `Sobre Mí` (`/sobre-mi/`, `/en/about-me/`) y `Portafolio` (`/portafolio/`, `/en/portfolio/`).
- Componentes UI Premium: `InternalHero`, `PremiumCard`, `PortfolioGrid`.
- Tests de navegación Playwright para rutas internas.

### Changed
- None

### Fixed
- **Accesibilidad y Tests E2E**: Correcciones de contraste de color (`text-slate-400` -> `text-slate-300`/`200`), *landmark regions* (`<aside>` en `CookieBanner`), y *aria-labels* faltantes. Se corrigieron falsos positivos de contraste en Axe-core deshabilitando animaciones CSS en tiempo de ejecución de prueba.
- **Visual Regression (CI)**: Se actualizó `playwright.config.ts` (`snapshotPathTemplate` sin prefijo de OS) para garantizar la paridad visual multiplataforma en GitHub Actions y se regeneraron los snapshots base utilizando contenedores Docker de Ubuntu (`npm run test:visual:docker`).
- **Paridad Arquitectónica de Visual Testing**: Se forzó al pipeline de GitHub Actions (`quality-gate.yml`) a ejecutarse íntegramente dentro del contenedor oficial `mcr.microsoft.com/playwright:v1.58.2-noble` en lugar del runner nativo de `ubuntu-latest` para eliminar un salto de línea de 29px causado por discrepancias en las tipografías instaladas por defecto en ambos Linux.
