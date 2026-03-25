module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-gpu --disable-dev-shm-usage',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // ── Puertas de calidad estrictas (CI bloqueante) ──────────────────────
        'categories:performance':   ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:seo':           ['error', { minScore: 0.9 }],
        'categories:best-practices':['error', { minScore: 0.9 }],

        // ── Métricas de rendimiento individuales ──────────────────────────────
        'first-contentful-paint':   ['warn',  { minScore: 0.9 }],
        'largest-contentful-paint': ['warn',  { minScore: 0.9 }],
        'interactive':              ['warn',  { minScore: 0.9 }],

        // ── Restricciones de terceros conocidas (no bloqueantes) ─────────────
        // Sentry SDK: ships some polyfills and code paths for pre-modern browsers.
        // Mitigated via autoSessionTracking:false + replays disabled, but we can't
        // eliminate 100% without dropping Sentry entirely.
        'legacy-javascript':              ['warn', { maxLength: 1 }],
        'unused-javascript':              ['warn', { maxLength: 2 }],

        // Material Symbols se carga desde Google CDN de forma async (preload).
        // La cadena de red sigue existiendo pero ya no bloquea el renderizado.
        'network-dependency-tree-insight':['warn', { minScore: 0 }],

        // Portfolio grid intencionalmente tiene > 800 nodos DOM.
        // Mitigación: paginación o virtualización planificada en BACKLOG.
        'dom-size-insight':               ['warn', { minScore: 0 }],

        // @fontsource-variable sirve fuentes completas (Inter + Playfair Display Variable).
        // El peso total está por encima del umbral de LH pero es la elección arquitectónica
        // consciente: 0 dependencias externas, privacy-first, sin FOUT.
        // Mitigación futura: subset con `glyphhanger` o migración a system-ui stack.
        'total-byte-weight':              ['warn', { minScore: 0 }],

        // Nuevo audit de LH 12+ que detecta imágenes sin format moderno explícito.
        // Astro Image ya sirve WebP/AVIF automáticamente; este audit a veces genera
        // falsos positivos en SSG donde el formato se negocia vía Content-Type.
        'image-delivery-insight':         ['warn', { minScore: 0 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
