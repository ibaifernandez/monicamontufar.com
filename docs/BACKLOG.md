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

## 🔜 Siguiente Fase — Sitio Web Completo

Objetivo: replicar y superar el contenido de `localhost:8083` (WordPress actual).

- [ ] Página "Sobre Mí" con bio completa, fotografías y línea de tiempo
- [ ] Portafolio con proyectos reales y casos de estudio
- [ ] Blog / sección de contenidos (MDX o CMS headless)
- [ ] Páginas de servicios con pricing
- [ ] Formulario de contacto completo
- [ ] Migración de contenido WordPress → Astro
- [ ] Internacionalización de las nuevas páginas (ES/EN)
- [ ] Actualizar baselines de Playwright tras nuevas páginas
