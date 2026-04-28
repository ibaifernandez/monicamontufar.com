# 🤖 AGENTS.md — Guía para agentes IA

> Este documento establece las reglas, convenciones y contexto que cualquier agente IA
> debe conocer antes de trabajar en este proyecto.

## Identidad del proyecto

| Campo                    | Valor                                       |
| ------------------------ | ------------------------------------------- |
| **Proyecto**             | monicamontufar.com                          |
| **Tipo**                 | Marca personal / Portafolio                 |
| **Owner**                | Mónica Montúfar                             |
| **Framework**            | Astro 6 (^6.0.6)                            |
| **Styling**              | TailwindCSS 4 (^4.2.2) + `@tailwindcss/vite` — sin `tailwind.config.js` |
| **Deploy**               | Netlify                                     |
| **Idioma del contenido** | Español (es-ES) / Inglés (en-US)            |
| **Idioma del código**    | Inglés (variables, clases CSS, componentes) |

## Documentación de referencia

Toda la documentación vive en `/docs`. Lee estos archivos **antes** de hacer cambios:

| Documento                                 | Propósito                                                |
| ----------------------------------------- | -------------------------------------------------------- |
| [`AI-RULES.md`](docs/AI-RULES.md)         | Reglas estrictas para agentes IA                         |
| [`PRD.md`](docs/PRD.md)                   | Product Requirements Document — qué estamos construyendo |
| [`ROADMAP.md`](docs/ROADMAP.md)           | Fases de desarrollo y prioridades                        |
| [`BACKLOG.md`](docs/BACKLOG.md)           | Tareas pendientes organizadas por prioridad              |
| [`ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Arquitectura técnica del proyecto                        |
| [`CHANGELOG.md`](docs/CHANGELOG.md)       | Historial de cambios                                     |
| [`README.md`](README.md)                  | Guía general del proyecto                                |

## Activos de Identidad Visual

Los activos del kit de marca de Mónica Montúfar viven en `docs/visual-id/`:

| Ruta | Contenido |
| ---- | --------- |
| `docs/visual-id/kIt-diseno-mon-mont-2026.pdf` | Kit de diseño oficial 2026 con paleta, tipografías y logotipo |
| `docs/visual-id/png-logo/` | 8 variantes del logotipo en PNG (isotipo, logotipo completo, versiones con subtítulo de blog, negro/blanco) |
| `docs/visual-id/gilda-display/` | Fuente `GildaDisplay-Regular.ttf` — tipografía de display del kit |
| `docs/visual-id/poppins/` | Familia completa Poppins (18 pesos) — tipografía de cuerpo del kit |
| `docs/visual-id/testimonials/` | Fotos de testimoniales: `ibai.png`, `rose.png`, `bani.jpeg` |

> **IMPORTANTE para agentes**: El kit de marca usa **Gilda Display** (display/headings) y **Poppins** (body). El sitio actual usa Inter Variable + Playfair Display. La migración tipográfica al kit oficial de la cliente es una tarea pendiente (ver `BACKLOG.md`).

## Flujo de trabajo con agentes

### Antes de empezar cualquier tarea

1. **Lee** `AGENTS.md` (este archivo)
2. **Lee** `docs/AI-RULES.md` (reglas obligatorias)
3. **Lee** `docs/NEXT-AGENT-BRIEFING.md` (plan de acción operativo actualizado — fuente de verdad de estado actual y próximos pasos)
4. **Consulta** `docs/BACKLOG.md` (tareas pendientes)
5. **Verifica** `docs/ARCHITECTURE.md` (estructura del proyecto)

### Al completar una tarea

1. **Actualiza** `docs/CHANGELOG.md` con los cambios realizados
2. **Actualiza** `docs/BACKLOG.md` marcando tareas completadas
3. **Verifica** que el build pasa: `npm run build`
4. **Pruebas E2E**: Ejecuta `npx playwright test` antes del deploy

## Estructura del proyecto

```
monicamontufar.com-astro/
├── .github/                   ← CI/CD Pipelines (Quality Gate)
├── AGENTS.md                  ← Estás aquí
├── README.md                  ← Overview del proyecto
├── docs/                      ← Documentación completa (incluye RUNBOOK.md)
├── netlify/                   ← Funciones Serverless (Turnstile, Forms)
├── src/
│   ├── components/            ← Componentes reutilizables (.astro)
│   ├── layouts/               ← Layouts (Base, etc)
│   ├── pages/                 ← Rutas del sitio (ES e /en/)
│   └── styles/                ← Design system global
├── tests/                     ← E2E Tests de Regresión Visual y A11y
├── public/                    ← Assets, _headers de seguridad, _redirects y robots.txt
├── astro.config.mjs           ← Configuración de Astro, Sitemap y Sentry
├── lighthouserc.cjs           ← Presupuestos de Performance/SEO
└── package.json
```

## Convenciones rápidas

- **Componentes**: PascalCase → `HeroSection.astro`
- **Páginas**: kebab-case
- **Tailwind**: Uso intensivo para styling Premium (glassmorphism, animaciones).
- **SEO/i18n**: Rutas nativas, `<link rel="alternate" hreflang="...">`
- **Commits**: Conventional Commits → `feat:`, `fix:`, `docs:`, `style:`
