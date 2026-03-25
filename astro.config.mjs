// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sentry from '@sentry/astro';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://monicamontufar.com',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
        },
      },
    }),
    sentry({
      dsn: process.env.SENTRY_DSN || '',
      sourceMapsUploadOptions: {
        telemetry: false,
      },
      // Reduce client-side bundle: desactiva integraciones pesadas no necesarias
      // para este sitio estático con tráfico predecible.
      autoSessionTracking: false,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});