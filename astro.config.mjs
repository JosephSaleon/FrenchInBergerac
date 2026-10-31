// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://frenchinbergerac.net';

// Le site ne doit être indexé QUE lorsqu'il est servi sur son vrai domaine.
// - `npm run build:preview` (mode preview) : noindex
// - sur Netlify : noindex pour les aperçus de branche/PR, et tant que le domaine
//   frenchinbergerac.net n'est pas le domaine principal du site (adresse en .netlify.app).
//   Netlify fournit CONTEXT et URL pendant le build.
const argv = process.argv.join(' ');
const previewMode = /--mode[ =]preview/.test(argv);
const onNetlify = process.env.NETLIFY === 'true';
const netlifyNotLive =
  onNetlify &&
  (process.env.CONTEXT !== 'production' || !/^https:\/\/(www\.)?frenchinbergerac\.net/.test(process.env.URL ?? ''));
const NOINDEX = previewMode || netlifyNotLive;
if (NOINDEX) console.log('[seo] Build NON indexable (noindex sur toutes les pages)');

export default defineConfig({
  site: SITE,
  // URLs sans slash final ni .html : on garde exactement /contact comme sur l'ancien site
  trailingSlash: 'never',
  build: { format: 'file' },
  vite: { define: { __NOINDEX__: JSON.stringify(NOINDEX) } },
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
