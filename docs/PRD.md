# Product Requirements Document (PRD)

## 1. Visión del Producto
Migración del sitio personal de Mónica Montúfar a una arquitectura JAMStack moderna (Astro 5 + Netlify) garantizando un nivel de desarrollo técnico premium, con especial atención en el performance (100/100 Lighthouse), Accesibilidad, Internacionalización y Testing rígido. El portafolio previo sirvió de modelo de exigencia.

## 2. Requerimientos Funcionales
### 2.1 Multilenguaje (i18n)
- Dos idiomas de lanzamiento: Español (rutas nativas `/`) e Inglés (rutas en `/en/`).
- Las imágenes y textos deben ser exactas a las originales pero renderizadas con `<Picture>` tag de Astro.

### 2.2 Framework y UI
- Componentes generados con Astro 5. Opcional el uso de islas interactivas (Preact o Svelte) si la animación o estado lo justifica.
- El diseño debe replicar el anterior pero verse **Premium** vía Tailwind (Glassmorphism, sombras pulidas, tipografías armónicas y animaciones no intrusivas).

### 2.3 SEO y Crawlability
- `robots.txt` y `sitemap.xml` autogenerados.
- Un componente Global `<SEO.astro>` que tome la data desde Frontmatter para inyectar Title, Metas descriptivas, Open Graph, Twitter cards, Canonical tags e Hreflang.

### 2.4 Extracción Correcta de Media
- No descargar thumbnails. Las URLs de las imágenes deben apuntar a la calidad original en `wp-content/uploads/` (WordPress local) y luego copiarse a `public/images/`.

### 2.5 Banner de Cookies y Legal
- Crear y requerir el uso de un script funcional y no intrusivo para la aceptación de Cookies.

## 3. Requerimientos No Funcionales
- **Control de Builds**: Netlify no desplegará automáticamente con push a GitHub para no desgastar "build minutes". Archivo `netlify.toml` ignora todos los builds excepto cuando se especifica.
- **QA Automático**: Scripts locales ejecutados manualmente con Playwright y Vitest pre-Lanzamiento garantizan 0 regresiones.
