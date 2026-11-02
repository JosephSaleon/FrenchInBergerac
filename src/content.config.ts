// Contenus modifiables depuis /admin (Sveltia CMS, voir public/admin/config.yml).
// Les schémas valident les fichiers au build : une saisie invalide fait échouer le
// déploiement Netlify, et la version en ligne reste alors inchangée.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.string().min(1);
const photo = z.object({ caption: text, alt: text });

// Page d'accueil : src/content/home/home.fr.json et home.en.json (id = langue)
const home = defineCollection({
  loader: glob({
    pattern: 'home.*.json',
    base: './src/content/home',
    generateId: ({ entry }) => entry.split('.')[1],
  }),
  schema: z.object({
    seo: z.object({ title: text, description: text }),
    hero: z.object({
      kicker: text,
      title: text,
      lead: text,
      cta: text,
      ctaSecondary: text,
      photoAlt: text,
      facts: z.array(z.object({ value: text, label: text })),
    }),
    intro: z.object({ title: text, p1: text, p2: text }),
    day: z.object({ title: text, items: z.array(z.object({ when: text, what: text })) }),
    stay: z.object({
      title: text,
      intro: text,
      includes: z.array(text),
      price: z.number().positive(),
      priceLabel: text,
      pricePer: text,
      priceNote: text,
      cta: text,
    }),
    teacher: z.object({
      kicker: text,
      title: text,
      p1: text,
      p2: text,
      p3: z.string(),
      photoAlt: text,
      badges: z.array(text),
      yogaTitle: z.string(),
      yoga: z.string(),
      yogaCredential: z.string(),
    }),
    house: z.object({
      title: text,
      lead: text,
      photos: z.object({ salon: photo, chambre: photo, sde1: photo, sde2: photo, jardin: photo, velos: photo }),
    }),
    region: z.object({ title: text, p1: text, p2: z.string(), photoAlt: text }),
    reviews: z.object({
      title: text,
      items: z.array(z.object({ text, name: text, from: z.string() })),
      note: z.string(),
    }),
    faq: z.object({ title: text, items: z.array(z.object({ question: text, answer: text })) }),
    cta: z.object({ title: text, text, button: text }),
  }),
});

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

export const collections = { home, blog };
