# Backlog de Tareas (Task Tracker)

Este archivo centraliza el estado actual del proyecto. **Última actualización: 2026-04-29.**

---

## ✅ Completado — v1.3.0 (2026-04-29)

- [x] **Blog EN** (`/en/blog/` + `/en/blog/[slug]/`): 10 artículos traducidos al inglés con HTML semántico limpio
- [x] **`posts-en.json`**: fuente de verdad para traducciones del blog
- [x] **Hreflang ES↔EN** en todas las páginas del blog (índice paginado + posts individuales)
- [x] **Portafolio → subdominio externo**: todos los enlaces apuntan a `https://portafolio.monicamontufar.com/` con redirect 301 permanente en rutas internas
- [x] **`public/llms.txt`**: estándar llmstxt.org para rastreo por LLMs
- [x] **Playwright test fix**: separación de tests de páginas con contenido vs. redirects

---

## ✅ Completado — v1.2.0 Sprint Backlog (PR #11, 2026-04-28)

- [x] **TTF → WOFF2 subsetting**: -80% peso de fuentes con `pyftsubset` (115 KB total desde 565 KB)
- [x] **Paginación del blog**: `[...page].astro` con `paginate()`, pageSize 9, nav gold-themed
- [x] **`blog-thumbnails.ts`**: deduplicación del mapa de thumbnails en SSOT
- [x] **Rate limiting en `/api/submit-contact`**: 5 req/hora por IP vía Netlify Blobs, 429 + Retry-After

---

## ✅ Completado — v1.1.0 Post-Launch (PR #10, 2026-04-28)

- [x] **OG image homepage/sobre-mi**: `og-home.jpg` 1200×630 px landscape
- [x] **JSON-LD BlogPosting completo**: ImageObject con dimensiones, dateModified, publisher.logo, url
- [x] **Blog post OG**: cada post usa su propio thumbnail (fix prop `ogImage` vs `image`)

---

## ✅ Completado — v1.0.0 Sitio Completo (PR #9, 2026-04-28)

- [x] Homepage ES + EN (hero, stats, servicios, blog feed, testimonios, CTA, footer)
- [x] Navbar.astro + Footer.astro componentes globales bilingües
- [x] Blog index (`/blog/`) featured + grid con 9 entradas
- [x] Blog slug (`/blog/[slug]/`) 10 posts WordPress con Elementor HTML sanitizado
- [x] JSON-LD: BlogPosting, Person, WebSite
- [x] Tipografía oficial: Gilda Display + Poppins (self-hosted, zero render-blocking)
- [x] Logo oficial en navbar
- [x] Material Symbols CLS fix
- [x] Prebuild script `wp-uploads`
- [x] CSP + Cache headers
- [x] Playwright CI verde (visual + a11y, Docker baselines)
- [x] Lighthouse: a11y 1.0, SEO 1.0, best-practices 1.0, perf ≥ 0.78

---

## ✅ Completado — Infraestructura Base

- [x] Pipeline CI/CD bloqueante (Playwright + Axe + LHCI)
- [x] Security headers (CSP, HSTS, X-Frame-Options)
- [x] Serverless: `verify-turnstile.ts` + `submit-contact.ts`
- [x] Sitemap XML automático, robots.txt, RUNBOOK.md
- [x] Política de privacidad y cookies (ES + EN, RGPD/LOPDGDD)
- [x] Cookie consent banner (Aceptar todas / Solo esenciales / Rechazar)
- [x] 404 personalizada
- [x] Hreflang ES↔EN en todo el sitio
- [x] Resend Audience integration (contactos) + email de confirmación al suscriptor
- [x] Cloudflare Turnstile (invisible) + honeypot

---

## 🔴 Bloqueado — Requiere acción de Mónica

- [ ] **Test del formulario de contacto en producción**
  - Hacer un submit real desde monicamontufar.com/contacto/
  - Confirmar recepción del email de notificación en `hola@monicamontufar.com`
  - Si no llega: revisar variables de entorno en Netlify (`RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL`)

- [ ] **Resend Audience ID** — variable de entorno pendiente en Netlify
  - En Resend (resend.com → Audiences): crear Audience "Lista monicamontufar.com" y copiar el ID
  - En Netlify → Site configuration → Environment variables: añadir `RESEND_AUDIENCE_ID = <ID>`
  - Sin esto los contactos del formulario no se persisten en la lista de Resend (los emails se envían igualmente)

- [ ] **Bio en "Sobre mí"** — verificar si el texto actual (migrado de WordPress) es definitivo
- [ ] **Foto de perfil** — confirmar si la foto actual es la oficial o hay versión más reciente
- [ ] **Analytics** — elegir entre: GA4 (gratuito), Plausible (9€/mes, sin cookies), o ninguno
- [ ] **Newsletter** — decidir si capturar emails del blog y elegir proveedor (Mailchimp / Brevo / Resend)
- [ ] **Estrategia de publicación del blog** — ¿envía artículos para subida manual o quiere CMS headless?

---

## 🟡 Técnico — Pendiente sin fecha

- [ ] **Subir umbral CI performance a 0.85–0.90**
  - Actualmente en 0.78 (documentado: Docker throttling consistentemente da 0.78–0.79)
  - Con WOFF2 ya implementado, revisar si las puntuaciones mejoradas en prod justifican subir el umbral
  - Ejecutar serie de 10 runs LHCI para obtener percentil estable

- [ ] **Búsqueda en el blog** (client-side Fuse.js)
  - Bajo impacto hasta que haya >20 posts. Priorizar cuando el blog crezca.

- [ ] **CMS headless** (TinaCMS / Sanity / Contentful)
  - Solo si Mónica quiere publicar artículos sin pasar por el dev
  - Implica migrar de JSON estático a API de contenido
  - Estimación: 1–2 sprints

- [ ] **Página de servicios con detalle** (`/servicios/` + `/en/services/`)
  - ¿Pricing visible? ¿Qué servicios exactamente?
  - Requiere briefing de Mónica

- [ ] **Visual regression baselines** — regenerar si se modifican componentes visuales
  - Comando: `npm run test:visual:docker:update`
