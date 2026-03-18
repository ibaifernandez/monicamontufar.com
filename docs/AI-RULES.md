# AI Rules (Reglas para Agentes IA)

> Estas reglas son **inquebrantables**. Si no puedes cumplirlas, **detén tu ejecución y notifica al usuario inmediatamente.**

## 1. Diseño y UI (TailwindCSS)
1. El diseño debe verse y sentirse "Premium".
2. Jamás utilices paletas de colores genéricas (ej: puro `bg-red-500` brillante o verde puro). Usa HSL o variables semánticas.
3. Se recomienda el uso de *Glassmorphism* (ej: `bg-white/10 backdrop-blur-md`), gradientes sutiles y bordes delicados.
4. Implementa Micro-animaciones para Hover, Focus y Active states.

## 2. Desarrollo Frontend (Astro)
1. Nunca uses React, Vue, Svelte, etc., para componentes puramente estáticos. Mantenlo en `.astro`.
2. Las rutas monolingües van en `src/pages/` e internacionales en subcarpetas `src/pages/en/`.
3. Inyecta siempre el componente `<SEO.astro>` en cada layout de página, pasando los props de `title` y `description`.

## 3. Comandos de Consola y Entorno
1. El contenedor OrbStack de WordPress original vive arriba en `/Users/AGLAYA/Local Sites/wordpress/monicamontufar.com/`. NO toques su `docker-compose.yml` ni efectúes comandos `mv` en su raíz. 
2. Todas nuestras operaciones ocurren en `monicamontufar.com-astro/`.
3. Para manipular y crear directorios grandes evita operaciones repetitivas.

## 4. Pruebas y CI
1. No se lanzan Deploys a Main sin una corrida completa y exitosa de `npx playwright test`.
2. Archivo `netlify.toml` debe siempre tener `build.ignore = "exit 0"`.
3. A11y es mandatorio (Contrastes 4.5:1 min, inputs con labels, imáganes con alt).

## 5. Control de Calidad de Assets
1. Extrae imágenes manualmente desde `wp-content/uploads/` asegurándote de usar su tamaño íntegro, evitando los archivos autogenerados con dimensiones (ej: ignorar `foto-150x150.jpg` y elegir `foto.jpg`).
