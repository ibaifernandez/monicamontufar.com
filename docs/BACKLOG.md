# Backlog de Tareas (Task Tracker)

Este archivo centraliza el estado actual del proyecto. Última actualización: 2026-04-28.

---

## ✅ Completado — Coming Soon v1.0 (Production-Ready)

- [x] `git init` y vinculación a GitHub
- [x] Configurar `/netlify.toml`
- [x] Mapear estructura de `src/pages/` inicial
- [x] Construir layout central `BaseLayout.astro`
- [x] Desarrollar `SEO.astro`
- [x] Diseñar el componente Cookie Banner
- [x] Implementar el Hero con Tailwind (UI Premium, micro-animaciones)
- [x] Configurar Playwright (`playwright.config.ts`) + tests de accesibilidad y regresión visual
- [x] TailwindCSS, Vitest, Playwright
- [x] Documentación Principal Arquitectónica (8 archivos)
- [x] Integración Cloudflare Turnstile invisible
- [x] Self-hosted variable fonts (Inter + Playfair Display)
- [x] Lighthouse 100/100 en Performance, A11y, SEO, Best Practices
- [x] Pipeline CI/CD bloqueante (quality-gate.yml)
- [x] Security headers + `_redirects`

---

## ✅ Completado — Bugfixes & Legal (2026-03-26)

- [x] Fix: guard `doSubmit()` contra Turnstile auto-callback (ES + EN)
- [x] Fix: botón "Ver Portafolio" en 404 → ruta interna correcta
- [x] Política de privacidad: responsable, base legitimadora, derechos, inventario de cookies (ES + EN)
- [x] Fix hreflang crítico: rutas asimétricas ES ↔ EN con `alternateHref` explícita
- [x] Self-hosted variable fonts migradas a `@fontsource-variable/*`
- [x] Turnstile cambiado a modo managed

---

## ✅ Completado — Sitio Completo v1.0 (2026-04-28)

**Migraciones y nuevas páginas:**
- [x] Tipografía migrada a Gilda Display + Poppins (desde `docs/visual-id/`)
- [x] Logo oficial en navbar (ES + EN)
- [x] Homepage completa (hero editorial, stats, servicios, blog feed, testimonios, CTA)
- [x] Homepage EN (equivalente bilingüe)
- [x] Navbar.astro componente global (responsive, hamburger, bilingual)
- [x] Footer.astro componente global (bilingual, social links)
- [x] Blog index (`/blog/`) con featured post + grid de 9 entradas
- [x] Blog slug (`/blog/[slug]/`) con 10 posts del export WordPress
  - Elementor HTML sanitizado (strip wrappers, rewrite localhost URLs, a11y fixes)
- [x] 404 enlace arreglado a ruta interna `/portafolio/`
- [x] Política de privacidad ES reescrita (eliminado texto "próximamente")
- [x] Política de privacidad EN completa (GDPR/LOPDGDD)
- [x] Ruta dev `/preview/[slug]` eliminada de producción
- [x] Prebuild script: copia automática de `src/assets/wp-content/` a `public/wp-content/` antes del build
- [x] SEO: hreflang suprimido para páginas sin equivalente EN (`omitAlternate`)
- [x] CSP + Cache headers actualizados en `public/_headers`

**CI/CD — Quality Gate verde:**
- [x] Playwright visual + a11y: 6/6 pass (baselines regenerados con Docker Linux)
- [x] Lighthouse CI: accessibility 1.0, SEO 1.0, best-practices 1.0, performance ≥ 0.70
- [x] PR #9 mergeado, CI en `main` verde

---

## 🔶 En Progreso — Mejoras Post-Lanzamiento (2026-04-28)

- [ ] **TTF → WOFF2 conversion** *(en ejecución)*
  - Objetivo: reducir ~40% el tamaño de fuentes (Poppins: 155 KB → ~90 KB)
  - Impacto: LCP bajo mobile throttling mejora de ~5s a ~3s; subir umbral CI a 0.85
  - Herramienta: `ttf2woff2` npm package + fallback TTF en `@font-face`

- [ ] **JSON-LD Structured Data** *(en ejecución)*
  - `BlogPosting` schema en cada post del blog
  - `Person` schema en homepage
  - `WebSite` schema global en `SEO.astro`
  - Impacto: rich snippets en Google (autor, fecha, tipo de contenido)

---

## 🟡 Pendiente — Contenido (requiere aportación de Mónica)

Estas tareas están **bloqueadas** hasta recibir materiales o confirmación de la clienta.

- [ ] **Portafolio con casos de estudio reales** (`/portafolio/` + `/en/portfolio/`)
  - Necesario: 3–6 proyectos con título, descripción, rol, imágenes y (si aplica) resultados
  - Actualmente la página tiene contenido placeholder
  - Es la pieza que más convierte visitas en clientes potenciales

- [ ] **Actualización de bio en /sobre-mi/**
  - Verificar si el texto actual es definitivo o placeholder
  - Foto de perfil en alta resolución si la disponible no es la oficial

- [ ] **Posts nuevos para el blog**
  - El blog tiene 10 posts del export de WordPress (contenido existente)
  - Para SEO real: publicar regularmente (mínimo 1/mes)
  - Formatos posibles: Astro MDX o integración con CMS headless (TinaCMS, Sanity, Contentful)

- [ ] **Decisión de newsletter**
  - ¿Quiere capturar emails de lectores del blog?
  - Si sí: elegir proveedor (Mailchimp, ConvertKit, Brevo, Resend)
  - Implica añadir formulario en el blog y/o footer

- [ ] **Analytics**
  - Actualmente sin tracking (se eliminó Sentry del cliente)
  - Opciones: Google Analytics 4, Plausible (privacy-first), Fathom
  - Decisión de la clienta (afecta política de privacidad y CSP)

- [ ] **Página de servicios con pricing** (`/servicios/`)
  - ¿Precios visibles o solo "contacta para presupuesto"?
  - ¿Qué servicios ofrece exactamente? (diseño gráfico, VA, social media...)

---

## 🔵 Backlog Técnico (sin fecha — no requiere cliente)

- [ ] **Subir umbral CI performance a 0.85** tras conversión TTF→WOFF2
  - Actualmente en 0.70 (documentado como limitación de TTF bajo throttling)
  - Con WOFF2 el LCP bajo throttling debería bajar de ~5s a ~3s

- [ ] **Paginación en el blog**
  - Actualmente se muestran todos los posts en una sola página
  - Con >20 posts el DOM se infla y el performance baja
  - Implementar con Astro `paginate()` helper

- [ ] **Deduplicar mapa de thumbnails del blog**
  - Actualmente duplicado en `blog/index.astro` y `blog/[slug].astro`
  - Extraer a `src/data/blog-thumbnails.ts` para importar desde ambos

- [ ] **Búsqueda en el blog** (client-side con Fuse.js)
  - Bajo impacto hasta que haya >20 posts

- [ ] **Formulario de contacto — test en producción**
  - Verificar que `netlify/functions/submit-contact.ts` está activo en Netlify
  - Hacer un submit real y confirmar recepción del email
  - Requiere acceso al panel de Netlify (revisión manual)

- [ ] **`portafolio.monicamontufar.com`** como subdominio real
  - Actualmente el botón en 404 apunta a la ruta interna `/portafolio/`
  - El subdominio estaba en el plan original pero nunca se configuró

- [ ] **Rate limiting en `/submit-contact`**
  - Para cuando haya tráfico real: Netlify Edge Function o Upstash Redis
