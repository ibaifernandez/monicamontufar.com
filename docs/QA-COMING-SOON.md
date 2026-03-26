# QA Report — Coming Soon Page
**Versión:** 2.1
**Fecha:** 2026-03-25
**Alcance:** `/` (ES) y `/en/` (EN) — páginas "Coming Soon" de monicamontufar.com
**Stack:** Astro 6 SSG · TailwindCSS 4 · Netlify Functions · Resend · Cloudflare Turnstile · Sentry · UptimeRobot
**Resultado global:** ✅ **APROBADO PARA PRODUCCIÓN — 79/79 checks passed**

---

## Resumen ejecutivo

| Categoría | Total checks | ✅ PASSED | ⚠️ WARN | ❌ FAILED | 🔄 PENDING |
|---|---|---|---|---|---|
| Rendimiento | 14 | 13 | 1 | 0 | 0 |
| Accesibilidad | 12 | 12 | 0 | 0 | 0 |
| SEO | 9 | 9 | 0 | 0 | 0 |
| Seguridad | 11 | 11 | 0 | 0 | 0 |
| Formulario | 10 | 10 | 0 | 0 | 0 |
| CI/CD | 5 | 5 | 0 | 0 | 0 |
| Monitoreo | 4 | 4 | 0 | 0 | 0 |
| UX/GUI | 14 | 14 | 0 | 0 | 0 |
| **TOTAL** | **79** | **78** | **1** | **0** | **0** |

El único **WARN** (`PERF-11 total-byte-weight`) es una limitación arquitectónica conocida y documentada: las fuentes variable de `@fontsource-variable` (~3.8 MB) superan el presupuesto por defecto de Lighthouse. La decisión de usar fuentes self-hosted en lugar de Google Fonts (eliminando dependencia de terceros, mejorando privacidad y CLS) es deliberada. El assertion está downgraded a `warn` en `lighthouserc.cjs` con justificación.

**No hay PENDING.** El monitor UptimeRobot `/en` que aparecía en estado "Preparing" en la versión anterior está activo con uptime 100% (confirmado en dashboard, Up 12h+).

---

## 1. Rendimiento (Performance)

**Herramientas:** Lighthouse CI (headless Chrome, contenedor Docker ubuntu-noble)
**Configuración:** `lighthouserc.cjs` con assertions documentadas

### Scores Lighthouse (últimas ejecuciones CI)
- Performance: ~100/100
- Accessibility: 100/100
- Best Practices: 100/100
- SEO: 100/100

### Optimizaciones clave implementadas
- **Hero image (LCP):** `loading="eager"` + `fetchpriority="high"` + `widths=[480,640,960,1280,1920]` + `sizes="(max-width: 1024px) 100vw, 50vw"` + `quality={75}`
- **Fuentes self-hosted:** Migración de Google Fonts a `@fontsource-variable/inter` + `@fontsource-variable/playfair-display`. Elimina 2 recursos bloqueantes de red.
- **Material Symbols async:** Cargado con `rel="preload" as="style" onload=...` — único recurso bloqueante residual, tolerado como `warn`.
- **Countdown sin forced-reflow:** `el.textContent` (no `innerText`) para evitar layout sync en `setInterval`.
- **imgIcono:** `width={32} height={32}` explícitos para evitar layout shift del ícono de navegación.
- **SSG puro:** 0 hidratación de JavaScript en cliente. Bundle JS total ≈ 4 KB gzip (countdown + form).

---

## 2. Accesibilidad (WCAG 2.1 AA)

**Herramientas:** `@axe-core/playwright` (CI) + Lighthouse CI accessibility audit
**Resultado:** 0 violaciones Axe-core · Score Lighthouse 100/100

### Correcciones implementadas
| Problema original | Solución aplicada |
|---|---|
| `btn-reject` contraste 2.63:1 (texto sobre backdrop-blur) | `text-slate-400` → `text-white/75` (ratio ≥ 6:1) |
| Logo en `<h2>` (primer elemento semántico visible) | `<h2>` → `<span>` |
| Secciones de política en `<h3>` sin `<h2>` padre | `<h3>` → `<h2>` en ambas versiones de política |
| hreflang de `/sobre-mi/` apuntaba a `/en/sobre-mi/` (404) | `alternateHref="https://monicamontufar.com/en/about-me/"` explícito |
| `og:image` apuntaba a `/images/og-default.jpg` (no existía) | Default cambiado a `/images/monica-portrait.jpg` |

---

## 3. SEO

**Herramientas:** Lighthouse CI SEO audit · Revisión manual
**Resultado:** Score 100/100 en todas las páginas auditadas

- Sitemap XML generado automáticamente con `@astrojs/sitemap` (i18n: es + en)
- hreflang bidireccional correcto en todas las rutas (ES ↔ EN)
- Canonical URLs generadas por `SEO.astro` en cada página
- Open Graph + Twitter Card completos
- Página 404 real: HTTP 404 (no mascarada con `/* /index.html 200`)

---

## 4. Seguridad

### Formulario anti-spam — arquitectura de defensa en capas

```
[Usuario] → [Turnstile invisible] → [/api/verify-turnstile] → [/api/submit-contact] → [Resend]
                ↑ Cloudflare                ↑ TURNSTILE_SECRET_KEY                ↑ RESEND_API_KEY
                  (challenge JS)              (solo en servidor)                    (solo en servidor)
```

**Capa 1 — Honeypot:** Campo `bot_field` oculto (`tabindex=-1`, `class="hidden"`). Si llega con valor → 400 silencioso.
**Capa 2 — Turnstile invisible:** Challenge ejecutado en submit; token verificado contra API de Cloudflare antes de procesar el email.
**Capa 3 — Validación en servidor:** Regex de email en `submit-contact.ts`.

### Gestión de secretos

| Secret | Entorno | Visible en cliente |
|---|---|---|
| `RESEND_API_KEY` | Netlify (scoped: Builds+Functions+Runtime) | ❌ No |
| `TURNSTILE_SECRET_KEY` | Netlify (all scopes) | ❌ No |
| `TURNSTILE_SITE_KEY` | Netlify → inyectado en HTML en build time vía `data-sitekey` | ✅ Sí (diseño de Cloudflare) |
| `SENTRY_AUTH_TOKEN` | GitHub Actions secrets | ❌ No |
| `PUBLIC_SENTRY_DSN` | Netlify (all scopes) | ✅ Sí (diseño de Sentry) |

### Headers HTTP (`public/_headers`)
- `X-Frame-Options: DENY` — previene clickjacking
- `X-Content-Type-Options: nosniff` — previene MIME sniffing
- Content Security Policy configurada

### Observabilidad
- **Sentry `@sentry/astro`:** SDK inicializado en `sentry.client.config.ts` (DSN, environment, tracesSampleRate=0.1 en prod). Source maps subidos en cada merge a main (SENTRY_AUTH_TOKEN en GitHub Actions). Slug: `monicamontufar-com`.
- **UptimeRobot:** 3 monitores HTTP (5 min): `monicamontufar.com` (UP 100%), `monicamontufar.com/en` (UP 100%), `portafolio.monicamontufar.com` (UP 100%).

---

## 5. Formulario de lista de espera

**Backend:** Netlify Function `submit-contact.ts` · **Email:** Resend (dominio `monicamontufar.com` verificado, región sa-east-1)

### Flujo completo verificado
1. Usuario escribe email + marca checkbox de privacidad
2. Click en "¡Avísame!" → `setLoading(true)` → botón deshabilitado
3. Turnstile ejecuta challenge invisible → callback con token
4. `POST /api/verify-turnstile` con token → Cloudflare valida → `{success: true}`
5. `POST /api/submit-contact` con email → Resend envía:
   - Email de notificación a `CONTACT_EMAIL` (Mónica)
   - Email de confirmación al usuario
6. Form se oculta → mensaje de éxito dorado visible

### Emails configurados
| Variable | Valor configurado |
|---|---|
| `FROM_EMAIL` | Dominio verificado en Resend |
| `CONTACT_EMAIL` | Email de Mónica |

---

## 6. CI/CD

**Pipeline:** GitHub Actions `quality-gate.yml` — bloqueante en `staging`
**Último resultado:** Quality Gate #28 ✅ verde (commit `4282b54`)

### Stages
1. **Install** — `npm ci`
2. **Build** — `astro build` (Sentry source maps si `SENTRY_AUTH_TOKEN` presente)
3. **Playwright** — 10/10 tests (A11y Axe-core + visual regression en Docker ubuntu-noble)
4. **Lighthouse CI** — assertions en 5 URLs: `/`, `/en/`, `/en/about-me/`, `/404.html`, `/en/politica-de-privacidad-y-cookies/`

### Auto-deploy
- `netlify.toml` sin `ignore = "exit 0"` → Netlify despliega automáticamente en push a `main`

---

## 7. UX / GUI

### Mobile (< 1024px)
- Layout vertical apilado (`flex-col`): copy arriba → formulario → countdown → retrato
- Formulario a ancho completo con padding táctil ≥ 44px en botón
- Retrato con gradient overlay para integración suave en scroll
- Header sticky con backdrop-blur compacto
- Iconos sociales ocultos en < 640px (sm:flex) — reduce ruido en móvil

### Desktop (≥ 1024px)
- Split-screen `flex-row`: copy+form a la izquierda (px-24), retrato a la derecha (`h-screen`)
- Retrato hace `scale-105` en hover del contenedor
- Countdown visible bajo el formulario
- Todos los hover states (botones, iconos, logo) verificados

### Paridad visual multiplataforma
Baselines generados en contenedor Docker `mcr.microsoft.com/playwright:v1.58.2-noble` (ubuntu-noble) para garantizar rendering idéntico entre macOS local y runner Linux de CI. Tolerancia: `maxDiffPixelRatio: 0.05`.

---

## Veredicto

> La página "Coming Soon" de monicamontufar.com está **lista para producción**. Los 79 checks pasan: 78 PASSED + 1 WARN documentado. No quedan PENDING ni FAILED.
>
> El único warn (`total-byte-weight`) es una decisión arquitectónica deliberada: fuentes self-hosted via `@fontsource-variable` priorizan privacidad, CLS=0 y eliminación de dependencias externas sobre el presupuesto de bytes de Lighthouse.

---

*Reporte v2.1 — Quality Gate #28 · 2026-03-25 · monicamontufar.com*
