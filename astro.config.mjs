// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://frenchinbergerac.net',
  // URLs sans slash final ni .html : on garde exactement /contact comme sur l'ancien site
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(merci|en\/thank-you)$/.test(page),
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-GB' },
      },
    }),
  ],
});
