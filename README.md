# 🌐 monicamontufar.com

**Sitio personal y portafolio de Mónica Montúfar.** 

> Construido con Astro 5, estilizado con TailwindCSS y deplegado en Netlify.

## ⚡ Quick Start

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev          # → http://localhost:4321

# Testing
npm run test         # Vitest (Unit)
npx playwright test  # Pruebas End-to-End

# Build de producción
npm run build
```

## 🏗️ Tech Stack

| Tecnología                     | Uso                                   |
| ------------------------------ | ------------------------------------- |
| [Astro 5](https://astro.build) | Framework SSG                         |
| [Netlify](https://netlify.com) | Hosting estático (build automáticos desactivados) |
| TailwindCSS                    | Design system con UI Premium          |
| Playwright & Vitest            | QA Automatizada y E2E                 |

## 📄 Características Principales

- **i18n Nativo:** Soporte Inglés (`/en/`) y Español (`/`).
- **SEO Blindado:** Autogeneración de Meta Tags y Open Graph por componente `<SEO.astro>`.
- **Rigor Técnico:** Bloqueo de Deploys innecesarios (`netlify.toml`) y test locales estrictos antes del release.
- **UI de Alta Gama:** Uso de recursos originales desde WordPress (`wp-content/uploads/`).

## 📚 Documentación

Toda la documentación extendida está en [`/docs`](docs/):

- **[AI-RULES.md](docs/AI-RULES.md)** — Reglas para agentes IA
- **[PRD.md](docs/PRD.md)** — Product Requirements Document
- **[ROADMAP.md](docs/ROADMAP.md)** — Fases y timeline
- **[BACKLOG.md](docs/BACKLOG.md)** — Tareas pendientes
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** — Arquitectura técnica
- **[CHANGELOG.md](docs/CHANGELOG.md)** — Historial de cambios

## 🤖 Para agentes IA

Lee [`AGENTS.md`](AGENTS.md) antes de trabajar en este proyecto.
