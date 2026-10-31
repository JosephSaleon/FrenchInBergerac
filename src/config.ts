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
  // Clé gratuite à créer sur https://web3forms.com avec l'adresse e-mail de Clotilde.
  // Tant qu'elle n'est pas renseignée, le formulaire renvoie vers l'e-mail direct.
  web3formsKey: '',
};

export type Lang = 'fr' | 'en';

// Correspondance des pages entre les deux langues (pour hreflang et le sélecteur de langue)
export const ROUTES = {
  home: { fr: '/', en: '/en' },
  contact: { fr: '/contact', en: '/en/contact' },
  thanks: { fr: '/merci', en: '/en/thank-you' },
} as const;

export type RouteKey = keyof typeof ROUTES;
