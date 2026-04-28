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

## FASE 7: Performance & Observabilidad (✓) — 2026-03-24
- Self-hosted variable fonts migradas a `@fontsource-variable/*` (zero render-blocking).
- hreflang asímétrico corregido vía prop `alternateHref` en páginas internas.
- Sentry configurado con `autoSessionTracking:false`, replays desactivados.
- `lighthouserc.cjs` reescrito con justificaciones documentadas.
- Material Symbols a non-blocking async.

## FASE 8: Estabilización Post-Lanzamiento (✓) — 2026-03-26
- Turnstile cambiado a modo managed (elimina auto-submit indeseado).
- Resend Audience: persistencia de contactos/waitlist.
- Páginas internas scaffold creadas: `sobre-mi/`, `portafolio/`, `en/about-me/`, `en/portfolio/`.
- Informe a cliente enviado (`docs/informe-cliente-monicamontufar.md`).

## SIGUIENTE FASE: Sitio Web Completo (Objetivo: 1 mayo 2026)

**Prerequisito bloqueante (9B)**: Recibir feedback de cliente sobre el informe enviado el 26-03-2026.
**9A es independiente** — puede ejecutarse antes de tener el feedback.

### 9A: Identidad Visual Oficial *(ejecutable ahora)*
- Migración tipográfica a **Gilda Display** (headings) + **Poppins** (body) — activos en `docs/visual-id/`.
- Integración del logotipo oficial en navbar (`png-logo-7.png` candidato principal).
- Revisión de paleta vs. kit oficial — confirmar con cliente antes de cambiar colores.
- ⚠️ Regenerar baselines Playwright con Docker tras cualquier cambio visual.
- Revisar `docs/visual-id/kIt-diseno-mon-mont-2026.pdf` para guía completa de estilos.

### 9B: Páginas de Contenido *(bloqueado hasta feedback de cliente)*
- Página "Sobre Mí" con bio completa, fotografías y línea de tiempo.
- Portafolio con proyectos reales y casos de estudio.
- Blog / sección de contenidos (MDX o CMS headless — pendiente decisión).
- Páginas de servicios con pricing (formato pendiente de confirmar).
- Sistema de contacto completo.
- Sección Testimoniales — fotos en `docs/visual-id/testimonials/`.
- Toda página nueva requiere: `alternateHref` explícito, `<SEO.astro>`, test en Playwright.

### 9C: Deploy a Producción *(solo tras 9A + 9B)*
- `npm run build` 0 errores → `npx playwright test` 10/10 → `npm run lhci` → `npm run test:visual:docker`.
- PR `staging` → `main` con Quality Gate superado.
- Eliminar la landing "Próximamente" como página de inicio.
- Verificar Netlify + UptimeRobot post-deploy.

---

## Advertencias arquitectónicas críticas

| Issue | Qué hacer |
|-------|-----------|
| **TailwindCSS v4** | Sin `tailwind.config.js`. Customizaciones en `global.css` con `@theme {}`. |
| **Visual regression** | Baselines SIEMPRE con Docker (`npm run test:visual:docker:update`). En macOS nativo rompe CI. |
| **Sentry** | No usar Partytown con Sentry — incompatibles (necesita main thread). |
| **hreflang asimétrico** | `/sobre-mi/` ↔ `/en/about-me/` requiere `alternateHref` explícito en `<SEO.astro>`. |
| **Fuentes self-hosted** | No usar CDN externos. Todo en `public/fonts/` + `@font-face` en CSS. |
| **Turnstile managed** | No cambiar de managed a invisible en Cloudflare — el auto-submit volvería. |
