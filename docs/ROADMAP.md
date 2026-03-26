# Roadmap y Cronograma de Desarrollo
> Visión general de las fases del proyecto.

## FASE 1: Scaffolding y Arquitectura (✓)
- Generación de `task.md` y `implementation_plan.md` (Biblia del proyecto).
- Base Astro y dependencias (Tailwind, Vitest, Playwright).
- Creación de `/docs` y estructuración del repositorio local.

## FASE 2: Extracción y Componentes Base
- Scraper manual de copys e imágenes High-Res (`wp-content/uploads/`).
- Desarrollo de UI Premium base (Colores, Tipografía, Botones, Hero).
- Implementación del componente `<SEO.astro>` global.

## FASE 3: i18n y Core Features
- Traducción 1:1 de Español e Inglés con enrutado nativo.
- Componente interactivo y accesible de Cookie Banner.
- Implementación de `hreflang` y Metas dinámicas.

## FASE 4: QA Total y Despliegue Configurado (✓)
- Auditoria Lighthouse (Performance, A11y).
- Script `npx playwright test` de E2E exitoso.
- Vinculación a GitHub y Netlify con `netlify.toml` protegiendo *builds*.

## FASE 5: Hardening, Observabilidad y CI/CD (✓)
- Pipeline bloqueante GitHub Actions (quality-gate.yml): Playwright 10/10 + LHCI 100/100.
- Cloudflare Turnstile invisible + honeypot + validación servidor.
- Sentry error tracking + source maps en CI.
- UptimeRobot: 3 monitores HTTP, 5 min, uptime 100%.
- Security headers (`_headers`) + redirects de seguridad (`_redirects`).
- Self-hosted variable fonts (zero render-blocking).

## FASE 6: Bugs & Legal Completion (✓) — 2026-03-26
- Fix: guard en `doSubmit()` contra Turnstile auto-callback bypasseando privacidad.
- Fix: botón "Ver Portafolio" en 404 corregido a `portafolio.monicamontufar.com`.
- Política de privacidad completada con datos del titular, base legitimadora y derechos RGPD.
- 85/85 QA checks documentados.

## SIGUIENTE FASE: Sitio Web Completo
Objetivo a largo plazo: replicar y superar el contenido de `localhost:8083` (WordPress actual).
- Página "Sobre Mí" con bio completa y galería.
- Portafolio con proyectos reales y casos de estudio.
- Blog / sección de contenidos.
- Páginas de servicios.
- Sistema de contacto completo.
