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

const homeFields: Field[] = [
  group('seo', 'Référencement Google', [
    str('title', 'Titre dans Google', 'Environ 60 caractères. Il contient les mots-clés principaux : à modifier avec prudence.'),
    txt('description', 'Description dans Google', 'Environ 155 caractères : le texte affiché sous le titre dans les résultats.'),
  ]),
  group('hero', 'En-tête', [
    str('kicker', 'Surtitre'),
    str('title', 'Titre principal', 'Le titre le plus important pour Google.'),
    txt('lead', 'Introduction'),
    str('cta', 'Bouton principal'),
    str('ctaSecondary', 'Bouton secondaire'),
    str('photoAlt', 'Description de la photo'),
    list('facts', 'Chiffres clés', [str('value', 'Chiffre'), str('label', 'Libellé')], { summary: '{{value}} {{label}}' }),
  ]),
  group('intro', 'Présentation', [str('title', 'Titre'), txt('p1', 'Paragraphe 1'), txt('p2', 'Paragraphe 2')]),
  group('day', 'Journée type', [
    str('title', 'Titre'),
    list('items', 'Moments', [str('when', 'Moment'), txt('what', 'Description')], { summary: '{{when}}' }),
  ]),
  group('stay', 'Séjour et prix', [
    str('title', 'Titre'),
    txt('intro', 'Introduction'),
    stringList('includes', 'Ce qui est inclus', 'Élément'),
    { name: 'price', label: 'Prix (€)', widget: 'number', value_type: 'int', i18n: 'duplicate', hint: 'Pensez aussi à mettre à jour la FAQ et la description Google.' },
    str('priceLabel', 'Texte avant le prix'),
    str('pricePer', 'Texte après le prix'),
    txt('priceNote', 'Note sous le prix'),
    str('cta', 'Bouton'),
  ]),
  group('teacher', 'Votre professeure', [
    str('kicker', 'Surtitre'),
    str('title', 'Titre'),
    stringList('badges', 'Badges', 'Badge'),
    txt('p1', 'Paragraphe 1'),
    txt('p2', 'Paragraphe 2'),
    optional(txt('p3', 'Paragraphe 3')),
    str('photoAlt', 'Description de la photo'),
    optional(str('yogaTitle', 'Encadré yoga : titre')),
    optional(txt('yoga', 'Encadré yoga : texte', 'Laisser vide pour masquer l’encadré.')),
    optional(txt('yogaCredential', 'Encadré yoga : formation')),
  ]),
  group('house', 'La maison', [
    str('title', 'Titre'),
    txt('lead', 'Introduction'),
    group('photos', 'Photos', [
      photo('salon', 'Salon'),
      photo('chambre', 'Chambre'),
      photo('sde1', 'Salle d’eau'),
      photo('sde2', 'Salle d’eau attenante'),
      photo('jardin', 'Jardin'),
      photo('velos', 'Vélos'),
    ]),
  ]),
  group('region', 'La région', [str('title', 'Titre'), txt('p1', 'Paragraphe 1'), optional(txt('p2', 'Paragraphe 2')), str('photoAlt', 'Description de la photo')]),
  group('reviews', 'Avis', [
    str('title', 'Titre'),
    list('items', 'Avis', [txt('text', 'Texte'), str('name', 'Prénom'), optional(str('from', 'Pays ou ville'))], { summary: '{{name}}' }),
    optional(str('note', 'Note sous les avis')),
  ]),
  group('faq', 'Questions fréquentes', [
    str('title', 'Titre'),
    list('items', 'Questions', [str('question', 'Question'), txt('answer', 'Réponse')], { summary: '{{question}}' }),
  ]),
  group('cta', 'Appel à l’action (bas de page)', [str('title', 'Titre'), txt('text', 'Texte'), str('button', 'Bouton')]),
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
      name: 'pages',
      label: 'Pages',
      i18n: true,
      files: [
        {
          name: 'home',
          label: 'Page d’accueil',
          file: 'src/content/home/home.{{locale}}.json',
          format: 'json',
          i18n: true,
          fields: homeFields,
        },
      ],
    },
  ],
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(config, null, 2), { headers: { 'Content-Type': 'text/yaml; charset=utf-8' } });
