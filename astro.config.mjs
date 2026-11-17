// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, existsSync } from 'node:fs';

const SITE = 'https://frenchinbergerac.net';

// Le site ne doit être indexé QUE lorsqu'il est servi sur son vrai domaine.
// - `npm run build:preview` (mode preview) : noindex dans les pages
// - sur Cloudflare Pages, les adresses en .pages.dev reçoivent un en-tête X-Robots-Tag: noindex
//   (public/_headers) : le même build sert ainsi l'adresse provisoire et le vrai domaine.
const argv = process.argv.join(' ');
const NOINDEX = /--mode[ =]preview/.test(argv);
if (NOINDEX) console.log('[seo] Build NON indexable (noindex sur toutes les pages)');

// Langues ayant au moins un article publié : un index de blog vide n'est pas indexé
// (noindex dans BlogIndex.astro), il ne doit donc pas figurer dans le sitemap.
const BLOG = new URL('./src/content/blog/', import.meta.url);
const blogLangs = ['fr', 'en'].filter((lang) =>
  readdirSync(BLOG, { withFileTypes: true }).some((dir) => {
    const file = new URL(`${dir.name}/index.${lang}.md`, BLOG);
    return dir.isDirectory() && existsSync(file) && !/^draft:\s*true\s*$/m.test(readFileSync(file, 'utf8'));
  }),
);

export default defineConfig({
  site: SITE,
  // URLs sans .html : /contact comme sur l'ancien site. Les index de dossier (en/index.html,
  // blog/index.html) sont servis avec un slash final (/en/, /blog/) : un fichier en.html à côté
  // d'un dossier en/ faisait boucler les redirections sur Netlify (ancien hébergeur).
  trailingSlash: 'ignore',
  build: { format: 'preserve' },
  vite: { define: { __NOINDEX__: JSON.stringify(NOINDEX) } },
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/(merci|en\/thank-you)$/.test(page) &&
        !(/\/blog\/?$/.test(page) && !blogLangs.includes(page.includes('/en/') ? 'en' : 'fr')),
      // index de dossier (/en/, /blog/, /en/blog/) : même adresse que la canonique, avec slash final
      serialize(item) {
        const fix = (/** @type {string} */ u) => u.replace(/\/(en|blog|en\/blog)$/, '/$1/');
        item.url = fix(item.url);
        item.links = item.links?.map((l) => ({ ...l, url: fix(l.url) }));
        return item;
      },
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-GB' },
      },
    }),
  ],
});
