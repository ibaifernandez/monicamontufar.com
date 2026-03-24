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
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});