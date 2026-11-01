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
  priceWeek: 1270,
};

export type Lang = 'fr' | 'en';

// Correspondance des pages entre les deux langues (pour hreflang et le sélecteur de langue)
export const ROUTES = {
  home: { fr: '/', en: '/en/' },
  contact: { fr: '/contact', en: '/en/contact' },
  thanks: { fr: '/merci', en: '/en/thank-you' },
} as const;

export type RouteKey = keyof typeof ROUTES;
