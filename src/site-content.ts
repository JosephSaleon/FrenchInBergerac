// Textes modifiables depuis /admin (Sveltia CMS, voir src/pages/admin/config.yml.ts) :
// un fichier JSON par section et par langue. Chaque fichier est validé au build : une saisie
// invalide fait échouer le déploiement Netlify, et la version en ligne reste alors inchangée.
import { z } from 'astro/zod';
import type { ImageMetadata } from 'astro';
import type { Lang } from './config';

// Photos des sections : rangées dans src/assets/ (l'admin y enregistre les nouvelles),
// référencées dans les fichiers de contenu par leur chemin, ex. "/src/assets/salon.jpg"
const assets = import.meta.glob<ImageMetadata>('/src/assets/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});
const image = z
  .string()
  .refine((path) => path in assets, { message: 'photo introuvable dans src/assets/' })
  .transform((path) => assets[path]);

const text = z.string().min(1);
const seoEntry = z.object({ title: text, description: text });

// Page d'accueil : src/content/home/<section>.<langue>.json, dans l'ordre de la page
const homeSchemas = {
  hero: z.object({
    kicker: text,
    title: text,
    lead: text,
    cta: text,
    ctaSecondary: text,
    photo: image,
    photoAlt: text,
    facts: z.array(z.object({ value: text, label: text })),
  }),
  presentation: z.object({
    title: text,
    p1: text,
    p2: text,
    day: z.object({ title: text, items: z.array(z.object({ when: text, what: text })) }),
  }),
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
    photo: image,
    photoAlt: text,
    badges: z.array(text),
    yogaTitle: z.string(),
    yoga: z.string(),
    yogaCredential: z.string(),
  }),
  house: z.object({ title: text, lead: text }),
  region: z.object({ title: text, p1: text, p2: z.string(), photo: image, photoAlt: text }),
  reviews: z.object({
    title: text,
    items: z.array(z.object({ text, name: text, from: z.string() })),
    note: z.string(),
  }),
  faq: z.object({ title: text, items: z.array(z.object({ question: text, answer: text })) }),
  cta: z.object({ title: text, text, button: text }),
};

// Galerie de la maison : src/content/home/house-gallery.json, commune aux deux langues
// (ordre, taille et cadrage identiques), avec légende et description dans chaque langue
export const GALLERY_SIZES = ['normal', 'wide', 'tall', 'big'] as const;
export const GALLERY_FOCUS = ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'] as const;
const gallerySchema = z.object({
  photos: z
    .array(
      z.object({
        image,
        size: z.enum(GALLERY_SIZES).default('normal'),
        focus: z.enum(GALLERY_FOCUS).default('center'),
        captionFr: text,
        captionEn: text,
        altFr: text,
        altEn: text,
      }),
    )
    .min(1),
});

const contactSchema = z.object({ title: text, lead: text });
const seoSchema = z.object({ home: seoEntry, contact: seoEntry, blog: seoEntry });
const coordinatesSchema = z.object({
  phone: z.string().regex(/^0\d( ?\d{2}){4}$/, 'format attendu : 06 12 34 56 78'),
  email: z.string().email(),
  street: text,
  postalCode: z.string().regex(/^\d{5}$/),
  city: text,
});

const files = import.meta.glob<{ default: unknown }>('./content/{home,contact,settings}/*.json', { eager: true });

function load<S extends z.ZodType>(path: string, schema: S): z.infer<S> {
  const file = files[`./content/${path}`];
  if (!file) throw new Error(`Fichier de contenu introuvable : src/content/${path}`);
  const result = schema.safeParse(file.default);
  if (!result.success) throw new Error(`Contenu invalide dans src/content/${path} :\n${z.prettifyError(result.error)}`);
  return result.data;
}

type Home = { [K in keyof typeof homeSchemas]: z.infer<(typeof homeSchemas)[K]> };

export const getHome = (lang: Lang) =>
  Object.fromEntries(
    Object.entries(homeSchemas).map(([section, schema]) => [section, load(`home/${section}.${lang}.json`, schema)]),
  ) as Home;

export const getGallery = (lang: Lang) =>
  load('home/house-gallery.json', gallerySchema).photos.map((p) => ({
    image: p.image,
    size: p.size,
    focus: p.focus,
    caption: lang === 'fr' ? p.captionFr : p.captionEn,
    alt: lang === 'fr' ? p.altFr : p.altEn,
  }));
export const getContact = (lang: Lang) => load(`contact/contact.${lang}.json`, contactSchema);
export const getSeo = (lang: Lang) => load(`settings/seo.${lang}.json`, seoSchema);

const coordinates = load('settings/coordonnees.json', coordinatesSchema);
const digits = coordinates.phone.replace(/\D/g, '');
/** Coordonnées : src/content/settings/coordonnees.json (rubrique Coordonnées dans l'admin) */
export const CONTACT = {
  ...coordinates,
  /** +33674607819, pour les liens tel: et les données structurées */
  phoneIntl: `+33${digits.slice(1)}`,
  /** +33 6 74 60 78 19, pour la version anglaise */
  phoneIntlDisplay: `+33 ${digits[1]} ${digits.slice(2).replace(/(\d{2})(?=\d)/g, '$1 ')}`,
};
