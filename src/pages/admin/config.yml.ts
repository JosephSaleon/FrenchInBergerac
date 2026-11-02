// Configuration de l'espace d'administration (Sveltia CMS, chargé par public/admin/index.html).
// Générée au build en /admin/config.yml (le JSON est du YAML valide).
// Les champs doivent correspondre aux schémas de src/content.config.ts.
import type { APIRoute } from 'astro';

type Field = Record<string, unknown>;

// Champ traduit : une valeur par langue
const str = (name: string, label: string, hint?: string): Field => ({ name, label, widget: 'string', i18n: true, ...(hint && { hint }) });
const txt = (name: string, label: string, hint?: string): Field => ({ name, label, widget: 'text', i18n: true, ...(hint && { hint }) });
const optional = (field: Field): Field => ({ ...field, required: false });
const group = (name: string, label: string, fields: Field[], extra: Field = {}): Field => ({
  name,
  label,
  widget: 'object',
  i18n: true,
  collapsed: true,
  fields,
  ...extra,
});
const list = (name: string, label: string, fields: Field[], extra: Field = {}): Field => ({
  name,
  label,
  widget: 'list',
  i18n: true,
  collapsed: true,
  fields,
  ...extra,
});
const stringList = (name: string, label: string, itemLabel: string): Field => ({
  name,
  label,
  widget: 'list',
  i18n: true,
  field: { name: 'item', label: itemLabel, widget: 'string', i18n: true },
});
const photo = (name: string, label: string) =>
  group(name, label, [str('caption', 'Légende'), str('alt', 'Description de la photo', 'Pour Google et les personnes malvoyantes')]);

// Page d'accueil : une fiche par section, dans l'ordre de la page (src/content/home/<section>.<langue>.json)
const homeSections: { name: string; label: string; fields: Field[] }[] = [
  {
    name: 'hero',
    label: '1. En-tête',
    fields: [
      str('kicker', 'Surtitre'),
      str('title', 'Titre principal', 'Le titre le plus important pour Google.'),
      txt('lead', 'Introduction'),
      str('cta', 'Bouton principal'),
      str('ctaSecondary', 'Bouton secondaire'),
      str('photoAlt', 'Description de la photo', 'Pour Google et les personnes malvoyantes'),
      list('facts', 'Chiffres clés', [str('value', 'Chiffre'), str('label', 'Libellé')], { summary: '{{value}} {{label}}' }),
    ],
  },
  {
    name: 'presentation',
    label: '2. Présentation et journée type',
    fields: [
      str('title', 'Titre'),
      txt('p1', 'Paragraphe 1'),
      txt('p2', 'Paragraphe 2'),
      group(
        'day',
        'Journée type',
        [str('title', 'Titre'), list('items', 'Moments', [str('when', 'Moment'), txt('what', 'Description')], { summary: '{{when}}' })],
        { collapsed: false },
      ),
    ],
  },
  {
    name: 'stay',
    label: '3. Le séjour et le prix',
    fields: [
      str('title', 'Titre'),
      txt('intro', 'Introduction'),
      stringList('includes', 'Ce qui est inclus', 'Élément'),
      {
        name: 'price',
        label: 'Prix (€)',
        widget: 'number',
        value_type: 'int',
        i18n: 'duplicate',
        hint: 'Pensez aussi à mettre à jour la FAQ et la description Google (Réglages → Référencement Google).',
      },
      str('priceLabel', 'Texte avant le prix'),
      str('pricePer', 'Texte après le prix'),
      txt('priceNote', 'Note sous le prix'),
      str('cta', 'Bouton'),
    ],
  },
  {
    name: 'teacher',
    label: '4. Votre professeure',
    fields: [
      str('kicker', 'Surtitre'),
      str('title', 'Titre'),
      stringList('badges', 'Badges', 'Badge'),
      txt('p1', 'Paragraphe 1'),
      txt('p2', 'Paragraphe 2'),
      optional(txt('p3', 'Paragraphe 3')),
      str('photoAlt', 'Description de la photo', 'Pour Google et les personnes malvoyantes'),
      optional(str('yogaTitle', 'Encadré yoga : titre')),
      optional(txt('yoga', 'Encadré yoga : texte', 'Laisser vide pour masquer l’encadré.')),
      optional(txt('yogaCredential', 'Encadré yoga : formation')),
    ],
  },
  {
    name: 'house',
    label: '5. La maison',
    fields: [
      str('title', 'Titre'),
      txt('lead', 'Introduction'),
      group(
        'photos',
        'Photos',
        [
          photo('salon', 'Salon'),
          photo('chambre', 'Chambre'),
          photo('sde1', 'Salle d’eau'),
          photo('sde2', 'Salle d’eau attenante'),
          photo('jardin', 'Jardin'),
          photo('velos', 'Vélos'),
        ],
        { collapsed: false },
      ),
    ],
  },
  {
    name: 'region',
    label: '6. La région',
    fields: [str('title', 'Titre'), txt('p1', 'Paragraphe 1'), optional(txt('p2', 'Paragraphe 2')), str('photoAlt', 'Description de la photo')],
  },
  {
    name: 'reviews',
    label: '7. Avis',
    fields: [
      str('title', 'Titre'),
      list('items', 'Avis', [txt('text', 'Texte'), str('name', 'Prénom'), optional(str('from', 'Pays ou ville'))], { summary: '{{name}}' }),
      optional(str('note', 'Note sous les avis')),
    ],
  },
  {
    name: 'faq',
    label: '8. Questions fréquentes',
    fields: [
      str('title', 'Titre'),
      list('items', 'Questions', [str('question', 'Question'), txt('answer', 'Réponse')], { summary: '{{question}}' }),
    ],
  },
  {
    name: 'cta',
    label: '9. Appel à l’action (bas de page)',
    fields: [str('title', 'Titre'), txt('text', 'Texte'), str('button', 'Bouton')],
  },
];

const seoPage = (name: string, label: string) =>
  group(
    name,
    label,
    [
      str('title', 'Titre dans Google', 'Environ 60 caractères, avec les mots-clés principaux.'),
      txt('description', 'Description dans Google', 'Environ 155 caractères : le texte affiché sous le titre dans les résultats.'),
    ],
    { collapsed: false },
  );

// Coordonnées : identiques dans les deux langues (pied de page, page contact, données pour Google)
const plain = (name: string, label: string, extra: Field = {}): Field => ({ name, label, widget: 'string', ...extra });
const coordinatesFields: Field[] = [
  plain('phone', 'Téléphone', { hint: 'Format : 06 12 34 56 78', pattern: ['^0\\d( ?\\d{2}){4}$', 'Format attendu : 06 12 34 56 78'] }),
  plain('email', 'E-mail'),
  plain('street', 'Adresse (rue)'),
  plain('postalCode', 'Code postal', { pattern: ['^\\d{5}$', '5 chiffres'] }),
  plain('city', 'Ville'),
];

const blogFields: Field[] = [
  str('title', 'Titre'),
  txt('description', 'Résumé', 'Une ou deux phrases (environ 155 caractères), affichées dans la liste des articles et dans Google.'),
  { name: 'date', label: 'Date de publication', widget: 'datetime', i18n: 'duplicate' },
  { name: 'cover', label: 'Photo de couverture', widget: 'image', required: false, i18n: 'duplicate' },
  optional(str('coverAlt', 'Description de la photo', 'Ce que montre la photo, pour Google et les personnes malvoyantes.')),
  { name: 'draft', label: 'Brouillon (non publié)', widget: 'boolean', default: false, required: false, i18n: 'duplicate' },
  { name: 'body', label: 'Texte', widget: 'markdown', i18n: true },
];

const config = {
  backend: {
    name: 'github',
    repo: 'JosephSaleon/FrenchInBergerac',
    branch: 'main',
    // Connexion par le fournisseur OAuth GitHub de Netlify (pas de base_url : c'est le défaut)
  },
  site_url: 'https://frenchinbergerac.net',
  media_folder: 'public/uploads',
  public_folder: '/uploads',
  slug: { encoding: 'ascii', clean_accents: true },
  i18n: {
    structure: 'multiple_files',
    locales: ['fr', 'en'],
    default_locale: 'fr',
    // Nouvel article : français seulement ; l'anglais s'active au besoin (menu ⋮ de l'éditeur)
    initial_locales: 'default',
  },
  collections: [
    {
      name: 'blog',
      label: 'Blog',
      label_singular: 'Article',
      folder: 'src/content/blog',
      path: '{{slug}}/index',
      extension: 'md',
      format: 'frontmatter',
      create: true,
      // photos rangées dans le dossier de l'article
      media_folder: '',
      public_folder: '',
      i18n: true,
      summary: '{{title}}',
      sortable_fields: ['date', 'title'],
      fields: blogFields,
    },
    {
      name: 'accueil',
      label: 'Page d’accueil',
      i18n: true,
      files: homeSections.map(({ name, label, fields }) => ({
        name,
        label,
        file: `src/content/home/${name}.{{locale}}.json`,
        format: 'json',
        i18n: true,
        fields,
      })),
    },
    {
      name: 'contact',
      label: 'Page contact',
      i18n: true,
      files: [
        {
          name: 'contact',
          label: 'Contact',
          file: 'src/content/contact/contact.{{locale}}.json',
          format: 'json',
          i18n: true,
          fields: [str('title', 'Titre'), txt('lead', 'Introduction')],
        },
      ],
    },
    {
      name: 'reglages',
      label: 'Réglages',
      files: [
        {
          name: 'coordonnees',
          label: 'Coordonnées',
          file: 'src/content/settings/coordonnees.json',
          format: 'json',
          fields: coordinatesFields,
        },
        {
          name: 'seo',
          label: 'Référencement Google',
          file: 'src/content/settings/seo.{{locale}}.json',
          format: 'json',
          i18n: true,
          fields: [seoPage('home', 'Page d’accueil'), seoPage('contact', 'Page contact'), seoPage('blog', 'Blog')],
        },
      ],
    },
  ],
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(config, null, 2), { headers: { 'Content-Type': 'text/yaml; charset=utf-8' } });
