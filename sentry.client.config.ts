/**
 * Sentry Browser SDK — configuración del cliente.
 *
 * Este archivo es cargado automáticamente por @sentry/astro en el navegador.
 * Ref: https://docs.sentry.io/platforms/javascript/guides/astro/
 *
 * Variables de entorno necesarias (Netlify → Site configuration → Environment variables):
 *   PUBLIC_SENTRY_DSN  — DSN público del proyecto en Sentry (visible en cliente, es seguro)
 */
import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: import.meta.env.PUBLIC_SENTRY_DSN,

  environment: import.meta.env.DEV ? 'development' : 'production',

  // Muestreo de trazas de rendimiento: 10% en producción es suficiente para un portfolio.
  tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.1,

  // Session Replay desactivado: no es necesario para un sitio estático de presentación
  // y añade peso significativo al bundle (~40 kB gzip).
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Sin tracking de sesiones de usuario: respeta la privacidad y reduce overhead.
  autoSessionTracking: false,
});
