// Coordonnées et réglages partagés par les deux langues.
export const SITE = {
  name: 'French in Bergerac',
  url: 'https://frenchinbergerac.net',
  teacher: 'Clotilde',
  phoneDisplay: '06 74 60 78 19',
  phoneIntl: '+33674607819',
  email: 'clotilde.marion24@gmail.com',
  street: '72 boulevard Beausoleil',
  postalCode: '24100',
  city: 'Bergerac',
  region: 'Nouvelle-Aquitaine',
};

export type Lang = 'fr' | 'en';

// Correspondance des pages entre les deux langues (pour hreflang et le sélecteur de langue)
export const ROUTES = {
  home: { fr: '/', en: '/en/' },
  contact: { fr: '/contact', en: '/en/contact' },
  thanks: { fr: '/merci', en: '/en/thank-you' },
  // dossier blog/ : comme /en/, l'index est servi avec un slash final
  blog: { fr: '/blog/', en: '/en/blog/' },
} as const;

export type RouteKey = keyof typeof ROUTES;

// Adresse d'une page dans chaque langue où elle existe (un article peut n'exister qu'en français)
export type Paths = Partial<Record<Lang, string>>;
