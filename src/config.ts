// Coordonnées et réglages partagés par les deux langues.
export const SITE = {
  name: 'French in Bergerac',
  url: 'https://frenchinbergerac.net',
  teacher: 'Clotilde',
  region: 'Nouvelle-Aquitaine',
  // téléphone, e-mail et adresse : src/content/settings/coordonnees.json (modifiable depuis /admin)
};

// Formulaire de contact : service Web3Forms (gratuit jusqu'à 250 messages par mois), qui envoie
// chaque demande par e-mail. La clé vient du compte web3forms.com ; l'adresse qui reçoit les
// messages se choisit dans les réglages du formulaire (Settings > Recipient Emails). La clé est
// publique par nature (elle ne permet que d'envoyer un message à cette adresse).
export const CONTACT_FORM = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '075d5ea9-3981-401d-82b9-58b71ed2170b',
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
