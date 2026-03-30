# Backlog de Tareas (Task Tracker)

Este archivo centraliza el estado actual, separándose de `ROADMAP.md` y alineado con `task.md`.

## ✅ Completado — Coming Soon v1.0 (Production-Ready)

- [x] `git init` y vinculación a GitHub
- [x] Configurar `/netlify.toml`
- [x] Mapear estructura de `src/pages/` inicial
- [x] Construir layout central `BaseLayout.astro`
- [x] Desarrollar `SEO.astro`
- [x] Diseñar el componente Cookie Banner
- [x] Implementar el Hero con Tailwind (UI Premium, Micro-animaciones)
- [x] Configurar Playwright (`playwright.config.ts`) + tests de accesibilidad y regresión visual
- [x] Ejecutar `npm create astro@latest`
- [x] Añadir TailwindCSS, Vitest, Playwright
- [x] Documentación Principal Arquitectónica (8 archivos)
- [x] Identificar estructura local y directorios raíz requeridos
- [x] Alcanzar paridad técnica con el dossier de `elmst.ibaifernandez.com`
- [x] Integración Cloudflare Turnstile invisible
- [x] Self-hosted variable fonts (Inter + Playfair Display)
- [x] Lighthouse 100/100 en Performance, A11y, SEO, Best Practices
- [x] Pipeline CI/CD bloqueante (quality-gate.yml)
- [x] UptimeRobot: 3 monitores, 100% uptime
- [x] Sentry error tracking
- [x] Security headers + _redirects
- [x] QA 85/85 documentado en `docs/QA-COMING-SOON.md`

## ✅ Completado — Bugfixes & Legal (2026-03-26)

- [x] Fix: guard `doSubmit()` contra Turnstile auto-callback (ES + EN)
- [x] Fix: botón "Ver Portafolio" en 404 → `portafolio.monicamontufar.com`
- [x] Política de privacidad: responsable, base legitimadora, derechos, inventario de cookies
- [x] README.md actualizado con badges adicionales
- [x] Fix hreflang crítico: `/sobre-mi/` ↔ `/en/about-me/`, `/portafolio/` ↔ `/en/portfolio/` (prop `alternateHref` explícita)
- [x] Self-hosted variable fonts migradas a `@fontsource-variable/*` (zero render-blocking)
- [x] Turnstile cambiado a modo managed (elimina auto-submit)
- [x] Integración Resend Audience para persistencia de contactos waitlist
- [x] Páginas internas scaffold: `sobre-mi/`, `portafolio/`, `en/about-me/`, `en/portfolio/` (con contenido de placeholder estructurado)

## 🔜 Siguiente Fase — Sitio Web Completo

Objetivo: lanzar el sitio completo eliminando la landing "Próximamente" antes del 1 de mayo de 2026.

### 🟥 BLOQUEANTE — Feedback pendiente de cliente
- [ ] Recibir respuestas del informe `docs/informe-cliente-monicamontufar.md` (enviado el 26-03-2026)
  - ¿El diseño actual le representa? ¿Cambiaría algo?
  - ¿Qué página es prioritaria? (Portafolio / Servicios / Sobre Mí)
  - ¿Textos preparados o necesitan redacción?
  - ¿Blog con autonoma de publicación?
  - ¿Servicios con precios visibles o sólo contacto?

### 🟠 Alta Prioridad — Identidad Visual (kit oficial)
*Independiente del feedback de la cliente. Se puede ejecutar ahora.*

- [ ] **Migración tipográfica** (pasos en orden):
  1. Copiar `docs/visual-id/gilda-display/GildaDisplay-Regular.ttf` + pesos necesarios de `docs/visual-id/poppins/` a `public/fonts/`
  2. Declarar `@font-face` en `src/styles/global.css` (sin CDN externo — política del proyecto)
  3. Actualizar variables tipográficas en `global.css` con `@theme {}` (TailwindCSS v4): `font-display` → Gilda Display, `font-body` → Poppins
  4. ⚠️ Regenerar baselines Playwright con Docker (`npm run test:visual:docker:update`) — hacerlo en macOS nativo rompe CI
  5. Verificar Lighthouse: `npm run lhci`
- [ ] **Logo en navbar**: sustituir el bloque `src/pages/index.astro` líneas 18-19 (y equivalente EN)
  - Candidato principal: `png-logo-7.png` (logotipo completo "MÓN + Mónica Montúfar")
  - Alternativa: `png-logo-1.png` (isotipo "M" solo)
  - El logo debe actuar como enlace a `/` (ES) y `/en/` (EN)
- [ ] **Revisión de paleta**: contrastar dorado `#e6b319` actual con paleta del kit (`#E8503A` coral, `#F5924A` naranja, `#F5C842` amarillo, `#E84C8B` magenta, `#4DC5B8` teal) — **esperar confirmación de la cliente antes de cambiar**
- [ ] Revisar `docs/visual-id/kIt-diseno-mon-mont-2026.pdf` para extraer guía completa de estilos

### 🟡 Media Prioridad — Páginas de contenido
*Bloqueadas hasta recibir feedback de la cliente.*

**Sobre Mí** (`/sobre-mi/` + `/en/about-me/`)
- [ ] Bio completa (reemplazar placeholder actual)
- [ ] Fotografía oficial de alta resolución
- [ ] Línea de tiempo profesional
- [ ] Habilidades/skills con iconografía

**Portafolio** (`/portafolio/` + `/en/portfolio/`)
- [ ] Proyectos reales con imágenes y casos de estudio
- [ ] Confirmar con cliente si mantener sección pricing en portafolio o separar en `/servicios/`

**Nuevas páginas**
- [ ] Blog (`/blog/`) — pendiente decisión: MDX o CMS headless
- [ ] Servicios con pricing (`/servicios/` + `/en/services/`)
- [ ] Contacto completo (`/contacto/` + `/en/contact/`)
- [ ] Sección de Testimoniales — fotos disponibles en `docs/visual-id/testimonials/` (`ibai.png`, `rose.png`, `bani.jpeg`)

**Checklist para cada página nueva**
- `hreflang` con `alternateHref` cruzado explícito (asimétrico — no es automático)
- `<SEO.astro>` con `title`, `description`, `og:image`
- Test añadido en `tests/internal-pages.spec.ts`
- Sitemap se actualiza automáticamente

### 🟢 Infraestructura — Deploy
*Solo cuando 9A + 9B estén completos y testeados.*

- [ ] `npm run build` — 0 errores
- [ ] `npx playwright test` — 10/10 passing
- [ ] `npm run lhci` — Performance ≥90, A11y 100, SEO ≥90, Best Practices ≥90
- [ ] `npm run test:visual:docker` — 0 regresiones visuales
- [ ] PR `staging` → `main` (Quality Gate CI bloqueante)
- [ ] Verificar deploy en Netlify + UptimeRobot
- [ ] Eliminar landing "Próximamente" como página de inicio una vez el sitio completo esté en main
- [ ] Migración de contenido WordPress → Astro (copys, imágenes, proyectos) — auditar `localhost:8083` antes de planificar

### 🔵 Backlog de Infraestructura (sin fecha)
- [ ] Resend Audiences: crear Audience en resend.com → copiar ID → añadir `RESEND_AUDIENCE_ID` en Netlify env vars (instrucciones completas en memoria del proyecto)
- [ ] Rate limiting en `submit-contact`: Netlify Edge Functions o Upstash Redis para prevenir spam masivo en caso de tráfico real
- [ ] `portafolio.monicamontufar.com` como subdominio real (actualmente solo monitor UptimeRobot)
- [ ] Analytics — ningún tracking configurado (pendiente decisión de la cliente)
- [ ] Countdown `2026-05-01T09:00-05:00` — actualizar o reemplazar cuando se lance el sitio
