# French in Bergerac – site bilingue FR/EN

Site statique généré avec [Astro](https://astro.build) : zéro framework côté client, HTML pur, images WebP responsives, polices auto-hébergées. Lighthouse mobile : Performance 99–100, SEO 100, Accessibilité 100, Bonnes pratiques 100.

## Commandes

```bash
npm install
npm run dev       # développement : http://localhost:4321
npm run build     # génère le site final dans dist/
npm run preview   # prévisualise dist/
npm run build:preview   # version d'APERÇU pour la cliente, dans dist-preview/ (noindex partout)
```

> ⚠️ `dist-preview/` ne doit **jamais** être déposé sur frenchinbergerac.net : toutes ses pages sont en `noindex`. Pour Hostinger, c'est toujours `dist/` (ou `french-in-bergerac-dist.zip`).

## Faire valider la cliente
1. `npm run build:preview`
2. Va sur [app.netlify.com/drop](https://app.netlify.com/drop) (compte gratuit) et glisse le dossier `dist-preview/`. Netlify donne une adresse du type `https://xxx.netlify.app`. On peut la renommer, par exemple `french-in-bergerac-apercu.netlify.app`.
3. Envoie le lien à la cliente : elle navigue sur tout le site, en FR et en EN. Le formulaire ne fonctionnera qu'une fois la clé Web3Forms ajoutée.
4. Une fois le site validé, supprime le site Netlify.

## Mots-clés ciblés
Ils viennent de l'autocomplétion Google (UK et US pour l'anglais, France pour le français), c'est-à-dire de ce que les gens tapent réellement.

| Langue | Expressions visées | Où |
|---|---|---|
| EN (cible principale) | *french immersion homestay*, *french immersion for adults / in france for adults / older adults*, *live and learn at your teacher's home*, *french language holiday(s) for adults*, *one week french immersion*, *learn french in france*, *french lessons dordogne / bergerac* | title, description, H1, H2, FAQ |
| FR | *séjours linguistiques immersifs Bergerac* (existant, conservé), *cours de français pour étrangers*, *FLE*, *apprendre le français en immersion*, *cours de français Bergerac* | title, description, H1, H2, FAQ |

En français, « séjour linguistique adulte » est surtout tapé par des Français qui partent à l'étranger. C'est pour ça que la version FR vise aussi « cours de français (FLE) » et « pour étrangers ».

## Organisation

| Fichier | Rôle |
|---|---|
| `src/i18n.ts` | **Tous les textes FR et EN.** C'est ici qu'on modifie un texte ou un prix affiché. |
| `src/config.ts` | Coordonnées, prix (données structurées), clé du formulaire, correspondance des URLs FR/EN |
| `src/components/Home.astro` | Structure de la page d'accueil et données structurées (JSON-LD) |
| `src/components/Contact.astro` | Page contact et formulaire |
| `src/styles/global.css` | Design (couleurs en variables en haut du fichier) |
| `src/assets/` | Photos sources (redimensionnées et converties automatiquement au build) |
| `public/.htaccess` | Redirections 301 et URLs propres pour Hostinger (Apache/LiteSpeed) |
| `public/_redirects` | Mêmes redirections, si un jour le site part sur Cloudflare Pages ou Netlify |
| `tools/check-deploy.sh` | Vérifie les URLs et redirections une fois en ligne |
| `tools/make-icons.mjs` | Régénère l'image de partage `og-image.jpg` et les icônes |

## URLs

| URL | Contenu | Statut |
|---|---|---|
| `/` | Accueil FR | **identique à l'ancien site** |
| `/contact` | Contact FR | **identique à l'ancien site** |
| `/en` | Accueil EN | nouveau |
| `/en/contact` | Contact EN | nouveau |
| `/merci`, `/en/thank-you` | Confirmation du formulaire | non indexées |
| 2 anciennes pages « blog » Hostinger | – | redirection 301 vers `/` |

---

# Mise en ligne sur Hostinger sans perdre le référencement

## Pourquoi on perd du référencement lors d'une refonte
Presque toujours pour l'une de ces raisons : des URLs qui changent sans redirection 301, un nom de domaine qui change, un `noindex` oublié de la préproduction, des titres ou du contenu supprimés, une coupure du site, ou un site en `www` qui devient `sans www` sans redirection.
Ce projet traite chacun de ces points :
- mêmes URLs ;
- même domaine ;
- titre de l'accueil FR repris mot pour mot ;
- tout le contenu d'origine conservé ;
- 301 sur les anciennes pages ;
- canonical sur chaque page ;
- redirection http et www vers `https://frenchinbergerac.net`.

## Étape 0 – Avant de toucher au site (à faire maintenant)
1. **Google Search Console** : vérifie que la propriété *Domaine* `frenchinbergerac.net` existe. Sinon, crée-la (enregistrement TXT à ajouter dans la zone DNS chez Hostinger).
2. Dans *Performances*, **exporte les 16 derniers mois** (requêtes et pages). C'est la référence pour comparer après la migration.
3. Dans *Pages*, note les URLs indexées. S'il en existe d'autres que celles du tableau ci-dessus, ajoute-les en 301 dans `public/.htaccess`.
4. Fais des captures d'écran de l'ancien site (on en a déjà une copie des textes et photos).

## Étape 1 – Vérifier le type d'offre Hostinger
Le site actuel est fait avec le **Website Builder**. Pour mettre nos propres fichiers, il faut un **hébergement web** (Premium / Business), avec un *Gestionnaire de fichiers* et un dossier `public_html`.
- **Hébergement web** (souvent le cas si l'offre « tout compris » est d'environ 100 €/an) : dans hPanel, on remplace le site Builder par un site « vide » ou personnalisé sur le même domaine, puis on dépose les fichiers dans `public_html`.
- **Offre Website Builder seule** : elle ne permet pas de déposer des fichiers. Il faudrait changer d'offre chez Hostinger ou, mieux, passer sur Cloudflare Pages (gratuit).

> ⚠️ Ne supprime pas le site Builder avant d'avoir le nouveau prêt à déposer : on bascule les deux dans la même demi-heure.

## Étape 2 – Préparer
1. **Formulaire** : crée une clé gratuite sur [web3forms.com](https://web3forms.com) avec l'adresse e-mail de Clotilde. Colle-la dans `src/config.ts` → `web3formsKey`. Sans clé, le bouton ouvre la messagerie du visiteur.
2. Fais relire par la cliente les textes de `src/i18n.ts`, surtout la FAQ et la version anglaise.
3. `npm run build`

## Étape 3 – Déployer
1. Dans hPanel → *Gestionnaire de fichiers* → `public_html` : supprime les anciens fichiers (s'il y en a).
2. Dépose le **contenu** de `dist/` (pas le dossier lui-même), **fichier `.htaccess` compris** : il est caché par défaut sous Windows. Le plus simple est d'envoyer le zip `french-in-bergerac-dist.zip` et de l'extraire sur place.
3. Vérifie que le SSL (HTTPS) est actif sur le domaine dans hPanel.
4. Si le site Hostinger utilisait un CDN ou un cache, purge-le.

## Étape 4 – Vérifier (dans l'heure)
```bash
bash tools/check-deploy.sh
```
Chaque ligne doit afficher `OK`. Si `/contact` ou `/en` renvoie 404 : le `.htaccess` n'a pas été envoyé, ou le dossier racine n'est pas `public_html`.

Puis teste à la main :
- [Test des résultats enrichis Google](https://search.google.com/test/rich-results) sur `/` et `/en` (LocalBusiness et FAQ détectés) ;
- l'aperçu de partage (envoie le lien sur WhatsApp : l'image du pont doit apparaître) ;
- l'envoi du formulaire FR et EN, puis la réception dans la boîte de Clotilde.

## Étape 5 – Search Console (le jour même)
1. *Sitemaps* : soumets `https://frenchinbergerac.net/sitemap-index.xml`. L'ancien `sitemap.xml` redirige déjà vers le nouveau.
2. *Inspection de l'URL* → *Demander une indexation* pour `/`, `/en`, `/contact` et `/en/contact`.

## Étape 6 – Suivi
- Une fois par semaine pendant 6 à 8 semaines : comparer *Performances* et *Pages* avec l'export de l'étape 0. Une petite oscillation les 2 à 3 premières semaines est normale.
- **Google Business Profile** : créer ou vérifier la fiche « French in Bergerac » (même nom, adresse et téléphone que le site), avec un lien vers le site. C'est le levier le plus fort pour les recherches locales.
- Ensuite : demander aux anciens élèves de laisser un avis Google.

## Plus tard : quitter Hostinger (≈ 12 €/an au lieu de ≈ 100 €)
Le site fonctionne tel quel sur Cloudflare Pages (gratuit) : `public/_redirects` y remplace `.htaccess`, et les URLs sans `.html` sont gérées nativement. Pour la migration, il suffit de connecter le dépôt Git, de régler la commande de build `npm run build` et le dossier `dist`, puis de pointer le domaine. Le transfert du domaine `.net` vers Cloudflare Registrar (prix coûtant) peut se faire ensuite, ou au prochain renouvellement.

## À valider avec la cliente
- Mentions légales : obligatoires pour un site professionnel en France (nom, statut, SIRET, hébergeur). Il faut une page dédiée et les informations correspondantes.
- Nouvelles photos en haute définition, si possible (surtout pour la grande photo d'accueil, aujourd'hui en 868 px de large).
- Textes en anglais : relecture par une personne anglophone, idéalement.
