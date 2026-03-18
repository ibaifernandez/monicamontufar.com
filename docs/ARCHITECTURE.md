# Architecture Technical Design

## Core Stack
- **Framework**: Astro 5 (Modo SSG: Static Site Generation).
- **Styling**: TailwindCSS 3/4.
- **Hosting**: Netlify.
- **Source**: Migración manual de Mónica Montúfar (WordPress local -> Astro estático).
- **QA**: Vitest para unitarios / Playwright para E2E (Cross browser visual testing / Flows).

## Component Structure y Modulidad
```
src/
 ├─ components/
 │   ├─ global/          (SEO.astro, Header, Footer)
 │   ├─ ui/              (Buttons, Cards pre-estilizados Premium)
 │   └─ sections/        (Hero, About, PortfolioGrid)
 ├─ layouts/
 │   └─ BaseLayout.astro (Inyecta fuentes, SEO, Tailwind Base, Hreflangs)
 ├─ pages/               
 │   ├─ index.astro      (ES Home)
 │   └─ en/
 │       └─ index.astro  (EN Home)
 └─ styles/
     └─ global.css       (Directivas Tailwind, root custom props limitadas)
```

## i18n Estrategia Intacta
- Evitamos dependencias externas pesadas. i18n se maneja mapeando el diccionario en un archivo físico estático `src/i18n/ui.ts`.
- Enlaces con `hreflang` cruzados (`<link rel="alternate" hreflang="en" href="https://monicamontufar.com/en/" />`).

## SEO (Search Engine Optimization)
- `SEO.astro` Componente.
- Props genericos: `title`, `description`, `image`, `canon`.
- Generación Estática (SSG) de 100/100 Lighthouse Performance.

## Controles de Hosting
- Repositorio vinculado: GitHub.
- Protección a coste de despliegue mediante netlify Ignore Script.
