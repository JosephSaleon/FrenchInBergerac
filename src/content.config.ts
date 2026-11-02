// Articles du blog, modifiables depuis /admin (Sveltia CMS, voir src/pages/admin/config.yml.ts).
// Les textes des pages sont chargés par src/site-content.ts.
// Les schémas valident les fichiers au build : une saisie invalide fait échouer le
// déploiement Netlify, et la version en ligne reste alors inchangée.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.string().min(1);

// Blog : un dossier par article, src/content/blog/<slug>/index.fr.md (+ index.en.md si traduit),
// les photos de l'article sont rangées dans le même dossier. id = "<langue>/<slug>"
const blog = defineCollection({
  loader: glob({
    pattern: '*/index.{fr,en}.md',
    base: './src/content/blog',
    generateId: ({ entry }) => {
      const [slug, file] = entry.split('/');
      return `${file.split('.')[1]}/${slug}`;
    },
  }),
  schema: ({ image }) =>
    z.object({
      title: text,
      description: text,
      date: z.coerce.date(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
