// Textes modifiables depuis /admin (Sveltia CMS, voir src/pages/admin/config.yml.ts) :
// un fichier JSON par section et par langue. Chaque fichier est validé au build : une saisie
// invalide fait échouer le déploiement Netlify, et la version en ligne reste alors inchangée.
import { z } from 'astro/zod';
import type { Lang } from './config';

const text = z.string().min(1);
const photo = z.object({ caption: text, alt: text });
const seoEntry = z.object({ title: text, description: text });

// Page d'accueil : src/content/home/<section>.<langue>.json, dans l'ordre de la page
const homeSchemas = {
  hero: z.object({
    kicker: text,
    title: text,
    lead: text,
    cta: text,
    ctaSecondary: text,
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
};

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
