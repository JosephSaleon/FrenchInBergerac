import type { Lang } from './config';

// Tous les textes du site, en français et en anglais.
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
    contact: 'Contact',
  },
  meta: {
    homeTitle: 'Séjours linguistiques immersifs à Bergerac – Cours de français (FLE) | French in Bergerac',
    homeDescription:
      'Séjour linguistique en immersion chez votre professeure à Bergerac (Dordogne) : cours de français pour étrangers le matin, sorties culturelles l’après-midi, demi-pension. Une semaine dès 1 270 €.',
    contactTitle: 'Contact et devis – Séjour linguistique et cours de français à Bergerac | French in Bergerac',
    contactDescription:
      'Contactez Clotilde pour organiser votre séjour linguistique à Bergerac : dates, niveau, devis personnalisé. Réponse rapide par e-mail ou téléphone.',
    thanksTitle: 'Message envoyé | French in Bergerac',
    ogAlt: 'Le vieux pont de Bergerac sur la Dordogne au coucher du soleil',
  },
  hero: {
    kicker: 'Cours de français · Bergerac · Dordogne',
    title: 'Séjours linguistiques immersifs à Bergerac',
    lead: 'Pour pratiquer et vivre le français dans une ambiance chaleureuse et détendue, immergé dans la culture du Périgord.',
    cta: 'Demander un devis',
    ctaSecondary: 'Découvrir le séjour',
    photoAlt: 'Le vieux pont de Bergerac et les quais de la Dordogne au soleil couchant',
    facts: [
      ['15 h', 'de cours par semaine'],
      ['4 max', 'élèves de même niveau'],
      ['5 min', 'à pied du centre-ville'],
    ],
  },
  intro: {
    title: 'Apprendre le français en immersion, en le vivant',
    p1: 'Vous souhaitez pratiquer le français de façon intensive, avec à la fois des cours et une immersion dans la culture locale. Vous souhaitez être accompagné, mais appréciez aussi l’autonomie.',
    p2: 'Bienvenue chez moi, au centre de Bergerac : cours de français le matin, et l’après-midi, cette ville d’art et d’histoire au bord de la Dordogne s’offre à vous — ses musées, ses artisans d’art, ses cafés, ses terrasses, ses restaurants et la nature toute proche.',
  },
  day: {
    title: 'Une journée type',
    items: [
      ['Le matin', 'Cours de français, en individuel ou en très petit groupe, à partir de vos objectifs et de vos centres d’intérêt.'],
      ['L’après-midi', 'Sorties accompagnées ou découverte en autonomie : musées, artisans d’art, marchés, bords de Dordogne.'],
      ['Le soir', 'Trois soirées conviviales dans la semaine : le meilleur moment pour parler sans y penser.'],
    ],
  },
  stay: {
    title: 'Le séjour type d’une semaine',
    intro: 'Un programme complet, modifiable et adaptable selon vos préférences.',
    includes: [
      '15 heures de cours de français',
      '3 sorties accompagnées l’après-midi',
      '3 soirées',
      'Hébergement en demi-pension',
      'Chambre individuelle ou double',
      'Kitchenette à disposition pour les repas libres',
    ],
    priceLabel: 'à partir de',
    pricePer: 'la semaine, en individuel',
    priceNote: 'Durée, rythme et programme sont ajustables : contactez-moi pour un devis personnalisé.',
    cta: 'Demander mon devis',
  },
  teacher: {
    kicker: 'Votre professeure',
    title: 'Je m’appelle Clotilde',
    p1: 'J’enseigne depuis 13 ans, je suis titulaire d’un CELTA et j’ai effectué un parcours en FLE (Français Langue Étrangère).',
    p2: 'En cours individuel ou en très petit groupe (4 personnes de même niveau au maximum), nous partons souvent d’un document écrit choisi selon vos objectifs et vos centres d’intérêt. J’insiste sur l’oral et je veille à créer un climat de confiance pour vous amener à vous exprimer avec assurance.',
    p3: 'Mes centres d’intérêt ? La littérature, le cinéma, le théâtre : nous en profiterons selon la programmation locale pendant votre séjour. Le dimanche, le cours peut se faire en marchant le long de la Dordogne.',
    photoAlt: 'Clotilde, professeure de français, au bord de la Dordogne',
    badges: ['13 ans d’enseignement', 'CELTA', 'Formation FLE', 'Professeure de yoga'],
    yogaTitle: 'Yoga et apprentissage',
    yoga: 'Parfois, nous commençons certains cours de français par quelques mouvements simples de yoga, des exercices de respiration ou un court moment de relaxation. Quelques minutes pour relâcher les tensions, se recentrer et favoriser la concentration avant de commencer à parler français. Aucune expérience du yoga n’est nécessaire.',
    yogaCredential: 'Je suis diplômée de l’école de yoga Gayatri de Tenerife, où j’ai suivi en 2024 une formation de professeur de yoga de 200 heures.',
  },
  house: {
    title: 'Hébergé chez votre professeure, à Bergerac',
    lead: 'Une maison avec jardinet, à 5 minutes à pied de l’hyper-centre et à 5 minutes à vélo du parc de Pombonne. Les gares sont à 10 minutes à pied pour rayonner dans la région.',
    captions: { salon: 'Le salon', chambre: 'Une chambre', sde1: 'La salle d’eau', sde2: 'Salle d’eau attenante', jardin: 'Le jardin', velos: 'Les vélos' },
    photos: {
      salon: 'Le salon lumineux du rez-de-chaussée',
      chambre: 'Une chambre d’hôte avec lit double',
      sde1: 'La salle d’eau avec douche',
      sde2: 'La salle d’eau attenante à la chambre',
      jardin: 'Le jardin avec sa table et ses chaises en fer forgé',
      velos: 'Les vélos à disposition dans le jardin',
    },
  },
  region: {
    title: 'Bergerac, la Dordogne et le Périgord',
    p1: 'Ville d’art et d’histoire au bord de la Dordogne, Bergerac se découvre à pied et à vélo : vieille ville, quais, musées, cafés et restaurants.',
    p2: 'Vous pourrez bien sûr visiter les nombreuses richesses patrimoniales de la région en voiture ou en transports en commun.',
    photoAlt: 'Fresque murale colorée représentant Bergerac et ses monuments',
  },
  reviews: {
    title: 'Ils sont venus apprendre le français à Bergerac',
    items: [
      {
        text: 'Grand merci pour une semaine pleine de bonnes choses : ton accueil chaleureux, ta cuisine superbe, ton enseignement. Toute la préparation faite avec précision et gentillesse, toutes les expressions culturelles et sociales… Une semaine très riche, remplie d’idées, de discussions et même d’un peu de grammaire — et tout avec humour.',
        name: 'Ann',
        from: 'Écosse',
      },
      {
        text: 'Les cours étaient excellents et l’ambiance conviviale. Je recommande vivement cette expérience à tous ceux qui veulent améliorer leur français.',
        name: 'Christina',
        from: 'Londres',
      },
    ],
    note: '',
  },
  faq: {
    title: 'Questions fréquentes',
    items: [
      ['Combien coûte un séjour linguistique à Bergerac ?', 'Le séjour type d’une semaine coûte 1 270 € en individuel. Il comprend 15 heures de cours, 3 sorties accompagnées, 3 soirées et l’hébergement en demi-pension. Un devis personnalisé est établi selon vos souhaits.'],
      ['Les cours sont-ils individuels ou en groupe ?', 'Les deux sont possibles : cours individuels, ou très petit groupe de 4 personnes de même niveau au maximum.'],
      ['Peut-on adapter la durée ou le programme ?', 'Oui. Le séjour type est modifiable et adaptable selon vos préférences : contactez-moi pour en parler.'],
      ['À qui s’adresse ce séjour linguistique ?', 'Aux adultes qui souhaitent pratiquer le français de façon intensive, en associant cours et immersion dans la culture locale, avec un accompagnement personnalisé et une part d’autonomie.'],
      ['Comment venir à Bergerac ?', 'Les gares sont à 10 minutes à pied de la maison. Sur place, tout se fait à pied ou à vélo, et la région se visite en voiture ou en transports en commun.'],
    ],
  },
  cta: {
    title: 'Envie de venir progresser à Bergerac ?',
    text: 'Dites-moi vos dates, votre niveau et vos envies : je vous réponds avec un programme et un devis personnalisés.',
    button: 'Me contacter',
  },
  contact: {
    title: 'Contactez-moi',
    lead: 'Pour toute question sur les séjours linguistiques ou pour recevoir un devis, écrivez-moi ou appelez-moi.',
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
    contact: 'Contact',
  },
  meta: {
    homeTitle: 'French Immersion Homestay for Adults in Bergerac, France | French in Bergerac',
    homeDescription:
      'Live and learn French at your teacher’s home in Bergerac, Dordogne: a one-week French immersion for adults with 15 hours of lessons, cultural outings and half board. From €1,270.',
    contactTitle: 'Contact & Quote – French Immersion Homestay in Bergerac | French in Bergerac',
    contactDescription:
      'Get in touch with Clotilde to plan your French immersion stay in Bergerac: dates, level and a tailored quote. Quick reply by email or phone.',
    thanksTitle: 'Message sent | French in Bergerac',
    ogAlt: 'The old bridge of Bergerac over the Dordogne river at sunset',
  },
  hero: {
    kicker: 'Live & learn at your teacher’s home · Dordogne',
    title: 'French immersion homestay in Bergerac',
    lead: 'A French language holiday for adults: practise and live French in a warm, relaxed home, immersed in the culture of the Périgord in south-west France.',
    cta: 'Request a quote',
    ctaSecondary: 'Discover the stay',
    photoAlt: 'The old bridge of Bergerac and the Dordogne riverbanks at sunset',
    facts: [
      ['15 h', 'of lessons per week'],
      ['4 max', 'students of the same level'],
      ['5 min', 'walk to the town centre'],
    ],
  },
  intro: {
    title: 'Learn French in France by living it',
    p1: 'You want to practise French intensively, combining lessons with immersion in the local culture. You like being supported, but you also value your independence.',
    p2: 'Welcome to my home in the centre of Bergerac: French lessons in the morning, and in the afternoon this town of art and history on the banks of the Dordogne is yours to explore — its museums, craftspeople, cafés, terraces, restaurants and the countryside close by.',
  },
  day: {
    title: 'A typical day',
    items: [
      ['Morning', 'French lessons, one-to-one or in a very small group, built around your goals and interests.'],
      ['Afternoon', 'Guided outings or time to explore on your own: museums, craft workshops, markets, the Dordogne riverbanks.'],
      ['Evening', 'Three friendly evenings during the week: the best time to speak French without even thinking about it.'],
    ],
  },
  stay: {
    title: 'One-week French immersion: the typical stay',
    intro: 'A complete programme that can be adjusted to suit your preferences.',
    includes: [
      '15 hours of French lessons',
      '3 guided afternoon outings',
      '3 evenings together',
      'Half-board accommodation',
      'Single or double room',
      'Kitchenette available for other meals',
    ],
    priceLabel: 'from',
    pricePer: 'per week, one-to-one',
    priceNote: 'Length, pace and programme can all be adjusted: get in touch for a tailored quote.',
    cta: 'Request my quote',
  },
  teacher: {
    kicker: 'Your teacher',
    title: 'My name is Clotilde',
    p1: 'I have been teaching for 13 years. I hold a CELTA and trained in teaching French as a foreign language (FLE).',
    p2: 'In one-to-one lessons or very small groups (a maximum of 4 people of the same level), we often start from a written text chosen according to your goals and interests. I focus on speaking, and I make sure to create a climate of trust so you can express yourself with confidence.',
    p3: 'My interests? Literature, cinema and theatre — we will make the most of whatever is on locally during your stay. On Sundays, the lesson can take place while walking along the Dordogne.',
    photoAlt: 'Clotilde, French teacher, on the banks of the Dordogne',
    badges: ['13 years of teaching', 'CELTA', 'FLE training', 'Yoga teacher'],
    yogaTitle: 'Yoga and learning',
    yoga: 'Sometimes we begin a French lesson with a few simple yoga movements, some breathing exercises or a short moment of relaxation. A few minutes to release tension, refocus and help your concentration before you start speaking French. No yoga experience is needed.',
    yogaCredential: 'I trained at the Gayatri Yoga school in Tenerife, where I completed a 200-hour yoga teacher training in 2024.',
  },
  house: {
    title: 'Your homestay in Bergerac',
    lead: 'A house with a small garden, a 5-minute walk from the town centre and 5 minutes by bike from Pombonne park. The railway stations are a 10-minute walk away, perfect for exploring the region.',
    captions: { salon: 'Living room', chambre: 'Bedroom', sde1: 'Shower room', sde2: 'En-suite shower room', jardin: 'Garden', velos: 'Bicycles' },
    photos: {
      salon: 'The bright ground-floor living room',
      chambre: 'A guest bedroom with a double bed',
      sde1: 'The shower room',
      sde2: 'The en-suite shower room',
      jardin: 'The garden with its wrought-iron table and chairs',
      velos: 'Bicycles available in the garden',
    },
  },
  region: {
    title: 'Bergerac, the Dordogne and the Périgord',
    p1: 'A town of art and history on the Dordogne river, Bergerac is best discovered on foot and by bike: the old town, the riverside, museums, cafés and restaurants.',
    p2: 'You can also visit the many heritage treasures of the region by car or public transport.',
    photoAlt: 'Colourful wall mural depicting Bergerac and its landmarks',
  },
  reviews: {
    title: 'They came to Bergerac to learn French',
    items: [
      {
        text: 'Many thanks for a week full of good things: your warm welcome, your superb cooking, your teaching. Everything prepared with precision and kindness, all the cultural and social expressions… A very rich week, full of ideas, discussions and even a little grammar — and all with humour.',
        name: 'Ann',
        from: 'Scotland',
      },
      {
        text: 'The lessons were excellent and the atmosphere friendly. I highly recommend this experience to anyone who wants to improve their French.',
        name: 'Christina',
        from: 'London',
      },
    ],
    note: 'Translated from French.',
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      ['How much does a French immersion stay in Bergerac cost?', 'The typical one-week stay costs €1,270 one-to-one. It includes 15 hours of lessons, 3 guided outings, 3 evenings and half-board accommodation. A tailored quote is prepared according to your wishes.'],
      ['Are lessons one-to-one or in a group?', 'Both are possible: one-to-one lessons, or a very small group of no more than 4 people of the same level.'],
      ['Can the length or programme be adjusted?', 'Yes. The typical stay can be changed and adapted to your preferences — just get in touch.'],
      ['Who is this French immersion homestay for?', 'Adults who want to practise French intensively, combining lessons with immersion in the local culture, with personal support and some independence.'],
      ['How do I get to Bergerac?', 'The railway stations are a 10-minute walk from the house. In town everything is within walking or cycling distance, and the region can be explored by car or public transport.'],
    ],
  },
  cta: {
    title: 'Ready to improve your French in Bergerac?',
    text: 'Tell me your dates, your level and what you would like to do: I will reply with a tailored programme and quote.',
    button: 'Get in touch',
  },
  contact: {
    title: 'Get in touch',
    lead: 'For any question about the immersion stays, or to receive a quote, write to me or give me a call.',
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
