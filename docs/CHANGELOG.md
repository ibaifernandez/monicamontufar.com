# Changelog
Todos los cambios notables del proyecto se documentarán en este archivo según los lineamientos de [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]
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
- **Accesibilidad y Tests E2E**: Correcciones de contraste de color (`text-slate-400` -> `text-slate-300`/`200`), *landmark regions* (`<aside>` en `CookieBanner`), y *aria-labels* faltantes.
- **Visual Regression (CI)**: Se actualizó `playwright.config.ts` (`snapshotPathTemplate` sin prefijo de OS) para garantizar la paridad visual multiplataforma en GitHub Actions y se generaron los snapshots base.
