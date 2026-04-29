/**
 * blog-thumbnails.ts
 *
 * Single source of truth for blog post thumbnail images.
 * Imported by both blog/index.astro and blog/[slug].astro so the
 * mapping is never duplicated.
 */

import imgTatacoa10   from '~/assets/wp-content/uploads/2025/04/Desierto_de_la_Tatacoa_Colombia_10.jpg';
import imgCasaTomasa  from '~/assets/wp-content/uploads/2025/05/Casa-Tomasa-Bogota.jpeg';
import imgTatacoa1    from '~/assets/wp-content/uploads/2025/05/Desierto-de-la-Tatacoa-1.jpg';
import imgTatacoa5    from '~/assets/wp-content/uploads/2025/04/Desierto_de_la_Tatacoa_Colombia_5.jpg';
import imgNomada      from '~/assets/wp-content/uploads/2024/07/Nomada-digitales.jpg';
import imgAlojamiento from '~/assets/wp-content/uploads/2024/04/Nomada-digital-alojamiento.jpeg';
import imgUnAno       from '~/assets/wp-content/uploads/2024/06/Un-ano-como-nomada-digital-1.jpg';
import imgLaPersev    from '~/assets/wp-content/uploads/2024/05/La-perseverancia.jpeg';
import imgVisa        from '~/assets/wp-content/uploads/2024/04/Visa-para-nomadas-digitales.jpeg';
import imgAjiaco      from '~/assets/wp-content/uploads/2024/04/Ajiaco.jpg';

export const thumbnails: Record<string, ImageMetadata> = {
  'postales-de-otro-planeta-tatacoa-como-nunca-la-habias-visto':              imgTatacoa10,
  'mi-peor-experiencia-en-airbnb-una-advertencia-para-nomadas-digitales-y-viajeros': imgCasaTomasa,
  '7-cosas-que-debes-saber-antes-de-visitar-el-desierto-de-la-tatacoa':       imgTatacoa1,
  'donde-el-silencio-habla-cronica-de-un-viaje-al-desierto-de-la-tatacoa':   imgTatacoa5,
  '9-pasos-a-seguir-para-iniciarte-como-nomada-digital':                       imgNomada,
  'nomadas-digitales-viaja-trabaja-y-vive-en-tus-propios-terminos':           imgAlojamiento,
  'suenos-de-infancia-la-historia-de-una-nomada-digital':                     imgUnAno,
  'street-food-en-bogota-un-festin-en-los-mercados-tradicionales':            imgLaPersev,
  'descubre-los-destinos-visa-para-nomadas-digitales-alrededor-del-mundo':    imgVisa,
  'delicias-de-colombia-un-viaje-por-la-gastronomia-colombiana-a-traves-de-mis-platillos-favoritos': imgAjiaco,
};

/** Fallback image when a slug has no specific thumbnail. */
export const thumbnailFallback: ImageMetadata = imgNomada;
