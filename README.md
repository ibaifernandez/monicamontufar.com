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

# ⚠️ Actualización de Referencias Visuales (Aislamiento de OS)
# Usa este script ÚNICAMENTE si has hecho un cambio intencional de diseño y
# requieres actualizar las fotografías base de Playwright para que aprueben 
# en GitHub Actions (Ubuntu).
npm run test:visual:docker

# Build de producción
npm run build
```

## 🏗️ Tech Stack

| Tecnología                     | Uso                                   |
| ------------------------------ | ------------------------------------- |
| [Astro 5](https://astro.build) | Framework SSG                         |
| [Netlify](https://netlify.com) | Edge Hosting & Serverless Functions   |
| TailwindCSS                    | Design system con UI Premium          |
| Playwright, Vitest, Lighthouse | QA Automatizada, A11y & Visual Testing|
| Sentry                         | Observabilidad y Monitoreo Frontend   |

## 📄 Características Principales

- **i18n Nativo:** Soporte Inglés (`/en/`) y Español (`/`).
- **SEO Blindado:** Autogeneración de Meta Tags vía `<SEO.astro>`, Sitemap XML Automático y `robots.txt` alineado.
- **Rigor Técnico:** Bloqueo de Deploys innecesarios (`netlify.toml`), pipeline estricto en GitHub Actions (Quality Gate) evaluando E2E, Lighthouse y Accesibilidad (Axe).
- **Seguridad y Backend API:** Funciones Serverless con validación de CAPTCHA, Hardening de cabeceras (`_headers` con CSP/HSTS) y enmascaramiento de rutas.
- **UI de Alta Gama:** Uso de recursos originales desde WordPress (`wp-content/uploads/`) con soporte baseline de Playwright Visual Regression.
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
