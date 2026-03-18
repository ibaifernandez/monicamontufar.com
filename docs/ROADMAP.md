# Roadmap y Cronograma de Desarrollo
> Visión general de las fases del proyecto.

## FASE 1: Scaffolding y Arquitectura (✓)
- Generación de `task.md` y `implementation_plan.md` (Biblia del proyecto).
- Base Astro y dependencias (Tailwind, Vitest, Playwright).
- Creación de `/docs` y estructuración del repositorio local.

## FASE 2: Extracción y Componentes Base
- Scraper manual de copys e imágenes High-Res (`wp-content/uploads/`).
- Desarrollo de UI Premium base (Colores, Tipografía, Botones, Hero).
- Implementación del componente `<SEO.astro>` global.

## FASE 3: i18n y Core Features
- Traducción 1:1 de Español e Inglés con enrutado nativo.
- Componente interactivo y accesible de Cookie Banner.
- Implementación de `hreflang` y Metas dinámicas.

## FASE 4: QA Total y Despliegue Configurado
- Auditoria Lighthouse (Performance, A11y).
- Script `npx playwright test` de E2E exitoso.
- Vinculación a GitHub y Netlify con `netlify.toml` protegiendo *builds*.
