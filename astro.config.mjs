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
      // Solo configuración de la integración Astro/Vite (source maps, SDK injection).
      // El init del SDK (dsn, opciones) va en sentry.client.config.ts.
      sourceMapsUploadOptions: {
        project: 'monicamontufar-com',
        authToken: process.env.SENTRY_AUTH_TOKEN,
        telemetry: false,
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});