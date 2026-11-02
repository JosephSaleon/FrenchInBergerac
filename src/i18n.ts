import type { Lang } from './config';

// Textes fixes de l'interface, en français et en anglais.
// Les textes des pages, les coordonnées et le référencement sont dans src/content/ (modifiables depuis /admin).
// Les clés sont identiques dans les deux langues : TypeScript signale toute traduction manquante.
const fr = {
  langName: 'Français',
  otherLangLabel: 'English',
  skip: 'Aller au contenu',
  nav: {
    stay: 'Le séjour',
    house: 'La maison',
    teacher: 'Votre professeure',
    reviews: 'Avis',
    blog: 'Blog',
    contact: 'Contact',
  },
  meta: {
    thanksTitle: 'Message envoyé | French in Bergerac',
    ogAlt: 'Le vieux pont de Bergerac sur la Dordogne au coucher du soleil',
  },
  blog: {
    title: 'Le blog',
    lead: 'Apprendre le français, vivre à Bergerac, découvrir le Périgord : mes articles.',
    empty: 'Les premiers articles arrivent bientôt.',
    readMore: 'Lire l’article',
    back: 'Tous les articles',
    ctaTitle: 'Envie de venir apprendre le français à Bergerac ?',
    ctaButton: 'Me contacter',
  },
  contact: {
    direct: 'Coordonnées',
    phone: 'Téléphone',
    email: 'E-mail',
    address: 'Adresse',
    form: {
      name: 'Votre prénom',
      email: 'Votre adresse e-mail',
      dates: 'Dates souhaitées (facultatif)',
      datesPlaceholder: 'ex. : une semaine en mai',
      level: 'Votre niveau de français',
      levels: ['Je ne sais pas', 'Débutant', 'Intermédiaire', 'Avancé'],
      message: 'Votre message ou question',
      submit: 'Envoyer ma demande',
      subject: 'Nouvelle demande depuis frenchinbergerac.net',
      required: 'obligatoire',
    },
  },
  thanks: {
    title: 'Merci, votre message est bien parti !',
    text: 'Je vous réponds au plus vite.',
    back: 'Retour à l’accueil',
  },
  notFound: {
    title: 'Page introuvable',
    text: 'Cette page n’existe pas ou a été déplacée.',
    back: 'Retour à l’accueil',
  },
  langBanner: {
    text: 'This page is in French.',
    link: 'Read it in English',
    close: 'Fermer',
  },
  footer: {
    tagline: 'Séjours linguistiques en immersion chez l’habitant, au cœur de Bergerac.',
  },
};

type Dict = typeof fr;

const en: Dict = {
  langName: 'English',
  otherLangLabel: 'Français',
  skip: 'Skip to content',
  nav: {
    stay: 'The stay',
    house: 'The house',
    teacher: 'Your teacher',
    reviews: 'Reviews',
    blog: 'Blog',
    contact: 'Contact',
  },
  meta: {
    thanksTitle: 'Message sent | French in Bergerac',
    ogAlt: 'The old bridge of Bergerac over the Dordogne river at sunset',
  },
  blog: {
    title: 'The blog',
    lead: 'Learning French, life in Bergerac, discovering the Périgord: my articles.',
    empty: 'The first articles are coming soon.',
    readMore: 'Read the article',
    back: 'All articles',
    ctaTitle: 'Ready to learn French in Bergerac?',
    ctaButton: 'Get in touch',
  },
  contact: {
    direct: 'Contact details',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    form: {
      name: 'Your first name',
      email: 'Your email address',
      dates: 'Preferred dates (optional)',
      datesPlaceholder: 'e.g. one week in May',
      level: 'Your level of French',
      levels: ['Not sure', 'Beginner', 'Intermediate', 'Advanced'],
      message: 'Your message or question',
      submit: 'Send my request',
      subject: 'New enquiry from frenchinbergerac.net (EN)',
      required: 'required',
    },
  },
  thanks: {
    title: 'Thank you, your message has been sent!',
    text: 'I will get back to you as soon as possible.',
    back: 'Back to home page',
  },
  notFound: {
    title: 'Page not found',
    text: 'This page does not exist or has been moved.',
    back: 'Back to home page',
  },
  langBanner: {
    text: 'Cette page est en anglais.',
    link: 'La lire en français',
    close: 'Close',
  },
  footer: {
    tagline: 'French immersion homestays in the heart of Bergerac, Dordogne.',
  },
};

export const t = (lang: Lang): Dict => (lang === 'fr' ? fr : en);
