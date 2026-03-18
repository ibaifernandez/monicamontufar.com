# 🤖 AGENTS.md — Guía para agentes IA

> Este documento establece las reglas, convenciones y contexto que cualquier agente IA
> debe conocer antes de trabajar en este proyecto.

## Identidad del proyecto

| Campo                    | Valor                                       |
| ------------------------ | ------------------------------------------- |
| **Proyecto**             | monicamontufar.com                          |
| **Tipo**                 | Marca personal / Portafolio                 |
| **Owner**                | Mónica Montúfar                             |
| **Framework**            | Astro 5                                     |
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

## Flujo de trabajo con agentes

### Antes de empezar cualquier tarea

1. **Lee** `AGENTS.md` (este archivo)
2. **Lee** `docs/AI-RULES.md` (reglas obligatorias)
3. **Consulta** `docs/BACKLOG.md` (tareas pendientes)
4. **Verifica** `docs/ARCHITECTURE.md` (estructura del proyecto)

### Al completar una tarea

1. **Actualiza** `docs/CHANGELOG.md` con los cambios realizados
2. **Actualiza** `docs/BACKLOG.md` marcando tareas completadas
3. **Verifica** que el build pasa: `npm run build`
4. **Pruebas E2E**: Ejecuta `npx playwright test` antes del deploy

## Estructura del proyecto

```
monicamontufar.com-astro/
├── AGENTS.md                  ← Estás aquí
├── README.md                  ← Overview del proyecto
├── docs/                      ← Documentación completa
├── src/
│   ├── components/            ← Componentes reutilizables (.astro)
│   ├── layouts/               ← Layouts (Base, etc)
│   ├── pages/                 ← Rutas del sitio (ES e /en/)
│   └── styles/                ← Design system global
├── public/                    ← Assets estáticos (imágenes originales)
├── astro.config.mjs           ← Configuración de Astro
└── package.json
```

## Convenciones rápidas

- **Componentes**: PascalCase → `HeroSection.astro`
- **Páginas**: kebab-case
- **Tailwind**: Uso intensivo para styling Premium (glassmorphism, animaciones).
- **SEO/i18n**: Rutas nativas, `<link rel="alternate" hreflang="...">`
- **Commits**: Conventional Commits → `feat:`, `fix:`, `docs:`, `style:`
