# Architecture Technical Design

## Core Stack
- **Framework**: Astro 5 (Modo SSG: Static Site Generation).
- **Styling**: TailwindCSS 3/4.
- **Hosting**: Netlify estático con Backend Serverless (`netlify/functions`).
- **Source**: Migración manual de Mónica Montúfar (WordPress local -> Astro estático).
- **QA & Observabilidad**: Pipeline GitHub Actions bloqueante, Playwright (Axe A11y + Regresión Visual), Lighthouse CI. Monitoreo pasivo con Sentry y UptimeRobot (`RUNBOOK.md`).
  - *Nota sobre Regresión Visual*: Dado que GitHub Actions corre en `ubuntu-latest` nativamente con fuentes variables, se inyecta la directiva `container: mcr.microsoft.com/playwright` para que la CI entera procese la UI idéntica al entorno Linux de Microsoft. Localmente en macOS/Windows, los *snapshots base* se generan **aisladamente dentro del mismo contenedor Docker de Ubuntu** usando el comando de paquete `npm run test:visual:docker`, logrando la paridad multiplataforma absoluta.
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
- `SEO.astro` Componente genérico para tags y Graph (`title`, `description`, `image`).
- Sitemap generado automáticamente en ciclo de compilación de Astro (`@astrojs/sitemap`).
- Indexación dirigida mediante `public/robots.txt`.
- Generación Estática (SSG) de 100/100 Lighthouse Performance garantizado por `.github/workflows/quality-gate.yml`.

## Controles de Hosting y Seguridad
- Repositorio vinculado: GitHub con CI gate automatizado.
- Netlify Functions para capa backend.
- Bloqueo de URLs Legacy y CSP mediante `public/_headers` y `_redirects`.
- Limitador inteligente de builds inútiles en `netlify.toml`.
