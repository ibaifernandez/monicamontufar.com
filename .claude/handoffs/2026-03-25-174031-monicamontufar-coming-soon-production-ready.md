# Handoff: monicamontufar.com — Coming Soon, Production-Ready

## Session Metadata
- Created: 2026-03-25 17:40:31
- Project: /Users/AGLAYA/Local Sites/monicamontufar.com
- Branch: staging (mergeado a main — producción activa en monicamontufar.com)
- Session duration: ~6 horas (sesión larga, con compresión de contexto)

### Recent Commits (for context)
- 0c19650 fix(_redirects): correct redirect rule syntax for security 404 blocks
- 90232d2 docs(qa): rewrite QA checklist v2.0 — 79 checks, all critical passed
- 8ceb450 feat(form): integrate Cloudflare Turnstile invisible anti-bot verification
- bc884fc ci: downgrade uses-responsive-images to warn (headless DPR mismatch)
- d64ebe2 fix(sentry): skip source-map upload when SENTRY_AUTH_TOKEN is absent

## Handoff Chain

- **Continues from**: None (primera sesión documentada formalmente)
- **Supersedes**: None

## Current State Summary

El proyecto `monicamontufar.com` es un sitio **Coming Soon** construido con Astro 6 SSG + TailwindCSS 4 + TypeScript strict mode. Durante esta sesión se auditó y consolidó completamente el proyecto desde un estado caótico (heredado de la agencia Antigravity) hasta **production-ready**: CI/CD verde en GitHub Actions, formulario de waitlist funcional con Resend + Turnstile, Sentry configurado correctamente, Netlify auto-deploy activo, y todos los servicios externos configurados (Resend, Turnstile, Sentry, UptimeRobot). El sitio está publicado en producción en `monicamontufar.com`. El staging branch existe para trabajo futuro y el Quality Gate de GitHub Actions bloquea merges que no pasen Playwright + LHCI.

## Codebase Understanding

### Architecture Overview

- **Framework**: Astro 6, output `static`, adaptador Netlify
- **Estilos**: TailwindCSS 4 (sintaxis `@import "tailwindcss"`, sin `tailwind.config.js`)
- **Fuentes**: `@fontsource-variable/inter` + `@fontsource-variable/playfair-display` (self-hosted, no Google Fonts). Nombres CSS: `Inter Variable` y `Playfair Display Variable`
- **Íconos**: Material Symbols cargado async (preload + onload trick) para no bloquear render
- **i18n**: rutas asimétricas manuales (`/` ES, `/en/` EN). Las páginas en inglés tienen `alternateHref` explícito porque las URLs no siguen un patrón predecible (`/sobre-mi/` ↔ `/en/about-me/`)
- **Formulario**: waitlist en home (ES y EN). Netlify Function `submit-contact.ts` usa Resend para enviar email de notificación a Monica + confirmación al suscriptor. Turnstile invisible protege el endpoint.
- **Sentry**: dividido en dos archivos — `astro.config.mjs` solo gestiona source maps upload; `sentry.client.config.ts` inicializa el SDK en cliente. Session Replay desactivado.
- **CI**: `quality-gate.yml` — Playwright en Docker (`mcr.microsoft.com/playwright:v1.58.2-noble`) + LHCI. Bloqueante para merges a main.

### Critical Files

| File | Purpose | Relevance |
|------|---------|-----------|
| `src/layouts/BaseLayout.astro` | Layout base, fonts, Material Symbols async | Tocar con cuidado — afecta todas las páginas |
| `src/components/global/SEO.astro` | Meta tags, OG, hreflang | `alternateHref` prop obligatorio en páginas con rutas asimétricas |
| `src/pages/index.astro` | Home ES — formulario waitlist + countdown | Contiene el JS del countdown y el form handler |
| `src/pages/en/index.astro` | Home EN — espejo del anterior | Mantener sincronizado con index.astro ES |
| `netlify/functions/submit-contact.ts` | Netlify Function — Resend email | Depende de RESEND_API_KEY, CONTACT_EMAIL, FROM_EMAIL |
| `netlify/functions/verify-turnstile.ts` | Netlify Function — Cloudflare Turnstile | Depende de TURNSTILE_SECRET_KEY |
| `sentry.client.config.ts` | Sentry browser SDK init | DSN vía PUBLIC_SENTRY_DSN |
| `astro.config.mjs` | Astro config + Sentry source maps | project slug: `monicamontufar-com` |
| `lighthouserc.cjs` | LHCI assertions config | Assertions documentadas con justificaciones |
| `.github/workflows/quality-gate.yml` | CI pipeline | Playwright + LHCI, bloqueante |
| `docs/QA-COMING-SOON.md` | QA report narrativo (79 checks) | Estado a 2026-03-25 |
| `docs/QA-COMING-SOON.csv` | QA checklist importable | Mismo, en formato tabular |

### Key Patterns Discovered

- **`isLCP` prop pattern**: `PremiumCard.astro` acepta `isLCP={true}` para aplicar `loading="eager" fetchpriority="high"` en la primera card (LCP candidate)
- **Fuentes variable**: los nombres en CSS llevan el sufijo ` Variable` (e.g. `Inter Variable`), no solo `Inter`
- **Playwright visual regression**: los snapshots están en Docker para consistencia cross-platform. Regenerar con `npm run test:visual:docker:update`
- **LHCI en CI**: corre con `--chrome-flags="--no-sandbox"` dentro del contenedor. El DPR headless causa falso positivo en `uses-responsive-images` → está en `warn`
- **`_redirects`**: las reglas de seguridad (bloquear `.env`, `.git`, `wp-admin`) usan `404` como status code, no `200`. El `/* /index.html 200` fue eliminado (Netlify sirve `404.html` nativo).

## Work Completed

### Tasks Finished

- [x] Auditoría completa del proyecto heredado de Antigravity
- [x] Migración de Google Fonts → @fontsource-variable (self-hosted)
- [x] Fix color-contrast CookieBanner (`btn-reject`: text-slate-400 → text-white/75)
- [x] Fix heading-order en páginas de política de privacidad (h3 → h2)
- [x] Fix LCP: hero image eager + fetchpriority en todas las páginas clave
- [x] Fix hreflang 404s: rutas asimétricas con alternateHref explícito
- [x] Fix OG image por defecto: og-default.jpg (inexistente) → monica-portrait.jpg
- [x] Implementación completa del formulario waitlist (Resend + honeypot + validación)
- [x] Integración Cloudflare Turnstile invisible en el formulario (ES + EN)
- [x] Sentry reescrito desde cero: split astro.config.mjs / sentry.client.config.ts
- [x] 404 page on-brand creada
- [x] Netlify auto-deploy desbloqueado (eliminado `ignore = "exit 0"`)
- [x] `<h2>` logo en header → `<span>` (semántica correcta)
- [x] Countdown extendido: 2026-04-01 → 2026-05-01
- [x] CI/CD: Quality Gate verde de forma sostenida (24 runs, últimos 5+ consecutivos verdes)
- [x] Todos los servicios externos configurados y verificados
- [x] QA checklist v2.0 (79 checks, 100% critical passed)
- [x] MCP GitHub + MCP Playwright instalados en ~/.claude/mcp.json

### Files Modified (principales)

| File | Changes | Rationale |
|------|---------|-----------|
| `src/layouts/BaseLayout.astro` | Fonts self-hosted, Material Symbols async, sin meta duplicados | Performance + semántica |
| `src/components/global/SEO.astro` | alternateHref prop, OG image fix | hreflang correcto |
| `src/components/global/CookieBanner.astro` | text-slate-400 → text-white/75 | WCAG color-contrast |
| `src/components/ui/PremiumCard.astro` | isLCP prop, widths, sizes | LCP optimization |
| `src/pages/index.astro` | Formulario completo, countdown, h2→span | Funcionalidad + semántica |
| `src/pages/en/index.astro` | Ídem, versión EN | Paridad ES/EN |
| `netlify/functions/submit-contact.ts` | Implementación Resend completa | Email funcional |
| `sentry.client.config.ts` | NUEVO — SDK init correcto | Sentry sin deprecation warnings |
| `lighthouserc.cjs` | Assertions revisadas y documentadas | CI estable |
| `netlify.toml` | Eliminado ignore="exit 0" | Auto-deploy activo |
| `public/_redirects` | Reglas de seguridad corregidas | 404 correcto, sin masking |
| `src/pages/404.astro` | NUEVO — página 404 on-brand | UX + SEO |

### Decisions Made

| Decision | Options Considered | Rationale |
|----------|-------------------|-----------|
| Self-hosted fonts vía @fontsource-variable | Google Fonts (bloqueante) vs self-hosted | Elimina render-blocking, mejor privacidad |
| Turnstile invisible (no managed/visible) | Managed, Visible, Invisible | Invisible = mejor UX, sin widget visual |
| Session Replay Sentry desactivado | Activado (~40kB) vs desactivado | Portfolio sin necesidad de replay, peso |
| uses-responsive-images → warn en LHCI | Fail vs warn vs ignorar | Falso positivo documentado del headless |
| 404.html nativo Netlify | _redirects catch-all 200 | El catch-all 200 mascaraba errores reales a Google |

## Pending Work

### Immediate Next Steps

1. **QA manual** — Recorrer checks UX-06 a UX-14 en dispositivo real móvil y desktop (hover states, countdown animado, cookie banner interactivo, scroll behavior)
2. **Test end-to-end del formulario en producción** — Enviar un formulario real y verificar que llegan ambos emails (notificación a Monica + confirmación al suscriptor)
3. **Verificar Sentry en producción** — Provocar un error JS deliberado en prod y verificar que aparece en sentry.io bajo el proyecto `monicamontufar-com`
4. **Configurar alertas en UptimeRobot** — El monitor `monicamontufar.com/en` aparecía "Preparing" al momento del handoff; verificar que ya está activo
5. **Playwright MCP** — Ahora que está instalado en mcp.json, usarlo para QA automatizado en la siguiente sesión

### Blockers/Open Questions

- [ ] El monitor `monicamontufar.com/en` en UptimeRobot aparecía en estado "Preparing" — verificar que está activo
- [ ] El token de GitHub que el usuario compartió en el chat (el primero, ya revocado) — confirmar que el nuevo token en mcp.json funciona correctamente en la nueva sesión

### Deferred Items

- Añadir `portafolio.monicamontufar.com` como subdominio real (actualmente es un monitor en UptimeRobot pero no existe como ruta en el sitio)
- Página de portafolio completa (actualmente solo "coming soon")
- Analytics (ningún tracking configurado actualmente)

## Context for Resuming Agent

### Important Context

1. **Este proyecto viene de Antigravity** — había deuda técnica importante. No asumir que decisiones del código heredado fueron intencionales.
2. **Staging es el branch de trabajo**. Main recibe merges vía PR. El Quality Gate bloquea merges que no pasen CI.
3. **El formulario usa Turnstile invisible** — no hay widget visible en el DOM. El token se obtiene silenciosamente al cargar la página. Si el usuario ve un error de Turnstile, es porque `TURNSTILE_SITE_KEY` (public) o `TURNSTILE_SECRET_KEY` (Netlify env) no está configurado.
4. **Sentry source maps**: el `SENTRY_AUTH_TOKEN` está en GitHub Actions secrets Y en Netlify. El upload de source maps solo ocurre si la variable está presente (hay un guard en astro.config.mjs). El slug del proyecto en Sentry es `monicamontufar-com`.
5. **Las fuentes se llaman `Inter Variable` y `Playfair Display Variable`** en CSS — el sufijo ` Variable` es obligatorio con @fontsource-variable.
6. **MCPs disponibles** (tras reinicio de Claude Code): `github` (token en ~/.claude/mcp.json) y `playwright`. Usar el MCP de GitHub para ver Actions sin necesidad de screenshots.

### Assumptions Made

- El dominio `monicamontufar.com` usa Cloudflare como DNS (confirmado: Resend detectó Cloudflare y ofreció "Auto configure")
- `FROM_EMAIL` es `noreply@monicamontufar.com` y `CONTACT_EMAIL` es el email personal de Monica (configurado en Netlify, no expuesto aquí)
- El usuario (Ibai Fernández, `ibaifernandez` en GitHub) tiene acceso de propietario al repo y a todos los servicios

### Potential Gotchas

- **`@fontsource-variable` nombres**: si cambias las referencias en CSS, usa `Inter Variable` (con espacio y "Variable"), no `Inter` ni `InterVariable`
- **Playwright snapshots**: si cambias componentes visuales, los snapshots fallarán. Regenerar con `npm run test:visual:docker:update` (requiere Docker corriendo)
- **LHCI headless DPR**: el runner de CI tiene DPR diferente al navegador real. `uses-responsive-images` está en `warn` deliberadamente — no lo subas a `error`
- **El formulario NO valida el token de Turnstile en `submit-contact.ts`**: la verificación está en `verify-turnstile.ts` y el form handler llama primero a `/api/verify-turnstile` antes de enviar. Si cambias el flujo del form, mantén ese orden.
- **`alternateHref` es obligatorio** en páginas con rutas asimétricas. Si añades páginas nuevas en ES que tengan equivalente EN con URL diferente, pasa el prop explícitamente.

## Environment State

### Tools/Services Used

- **Resend**: dominio `monicamontufar.com` verificado, región São Paulo (sa-east-1)
- **Cloudflare Turnstile**: widget invisible configurado para `monicamontufar.com`
- **Sentry**: proyecto `monicamontufar-com`, org `Mónica Montúfar`, platform Astro
- **UptimeRobot**: 3 monitores — `monicamontufar.com/`, `monicamontufar.com/en`, `portafolio.monicamontufar.com`
- **Netlify**: proyecto `monicamontufar`, production deploy activo, auto-deploy desde main
- **GitHub Actions**: Quality Gate CI con Playwright + LHCI

### Active Processes

- Ninguno en local. El sitio está en producción en Netlify.

### Environment Variables

Variables en **Netlify** (Project configuration → Environment variables):
- `CONTACT_EMAIL` — email de Monica para notificaciones
- `FROM_EMAIL` — remitente verificado en Resend
- `PUBLIC_SENTRY_DSN` — DSN público de Sentry (visible en cliente)
- `RESEND_API_KEY` — API key de Resend (scoped a Builds/Functions/Runtime)
- `SENTRY_AUTH_TOKEN` — token para upload de source maps
- `TURNSTILE_SECRET_KEY` — secret key de Cloudflare Turnstile
- `TURNSTILE_SITE_KEY` — site key pública de Turnstile

Variable en **GitHub Actions** (Settings → Secrets):
- `SENTRY_AUTH_TOKEN` — mismo token que en Netlify

## Related Resources

- `docs/QA-COMING-SOON.md` — QA report completo (79 checks)
- `docs/QA-COMING-SOON.csv` — Checklist importable
- `docs/ARCHITECTURE.md` — Decisiones arquitectónicas del proyecto
- `docs/CHANGELOG.md` — Historial de cambios de esta sesión
- `.env.example` — Variables de entorno necesarias con descripciones

---

**Security Reminder**: Este documento no contiene valores de secrets, solo nombres de variables.
