# French in Bergerac – site bilingue FR/EN

Site statique généré avec [Astro](https://astro.build) et hébergé sur **Netlify**. Il n'y a aucun framework côté client : HTML pur, images WebP responsives, polices auto-hébergées.
Lighthouse mobile : Performance 99–100, SEO 100, Accessibilité 100, Bonnes pratiques 100.

## Commandes

```bash
npm install
npm run dev             # développement : http://localhost:4321
npm run build           # site final dans dist/
npm run preview         # sert dist/ en local (ne jamais ouvrir les .html par double-clic : le CSS ne charge pas)
npm run build:preview   # version non indexable dans dist-preview/
```

## Organisation

| Fichier | Rôle |
|---|---|
| `src/i18n.ts` | **Tous les textes FR et EN.** C'est ici qu'on modifie un texte ou un prix affiché. |
| `src/config.ts` | Coordonnées, prix (données structurées), correspondance des URLs FR/EN |
| `src/components/Home.astro` | Structure de la page d'accueil et données structurées (JSON-LD) |
| `src/components/Contact.astro` | Page contact et formulaire (Netlify Forms) |
| `src/styles/global.css` | Design (couleurs en variables en haut du fichier) |
| `src/assets/` | Photos sources (redimensionnées et converties automatiquement au build) |
| `astro.config.mjs` | Configuration, dont la **règle d'indexation automatique** (voir plus bas) |
| `netlify.toml` | Build Netlify et en-têtes de cache |
| `public/_redirects` | Redirections 301 sur Netlify |
| `public/.htaccess` | Mêmes redirections pour Apache (inutile sur Netlify, gardé en solution de repli) |
| `tools/check-deploy.sh` | Vérifie les URLs, les redirections et l'indexation une fois en ligne |
| `tools/make-icons.mjs` | Régénère l'image de partage `og-image.jpg` et les icônes |

## URLs

| URL | Contenu | Statut |
|---|---|---|
| `/` | Accueil FR | **identique à l'ancien site** |
| `/contact` | Contact FR | **identique à l'ancien site** |
| `/en/` | Accueil EN (`/en` redirige vers `/en/`) | nouveau |
| `/en/contact` | Contact EN | nouveau |
| `/merci`, `/en/thank-you` | Confirmation du formulaire | non indexées |
| 2 anciennes pages « blog » Hostinger | – | redirection 301 vers `/` |

## Indexation automatique (garde-fou SEO)
Le site n'est indexable **que lorsqu'il est servi sur frenchinbergerac.net**. Concrètement :

| Build | Indexable ? |
|---|---|
| Netlify, adresse `xxx.netlify.app` | non (noindex sur toutes les pages) |
| Netlify, aperçu de branche ou de PR | non |
| Netlify, domaine principal = frenchinbergerac.net | **oui** |
| `npm run build` en local | oui |
| `npm run build:preview` | non |

Ainsi, l'adresse `.netlify.app` montrée à la cliente ne fait pas de concurrence à l'ancien site dans Google. Le jour où le domaine est branché, il suffit de **relancer un déploiement** pour que le site devienne indexable.

> ⚠️ Ne pas glisser un `dist/` construit en local sur Netlify Drop : il serait indexable sur l'adresse `.netlify.app`. Utilise Git (recommandé) ou `dist-preview/`.

## Mots-clés ciblés
Ils viennent de l'autocomplétion Google (UK et US pour l'anglais, France pour le français), c'est-à-dire de ce que les gens tapent réellement.

| Langue | Expressions visées | Où |
|---|---|---|
| EN (cible principale) | *french immersion homestay*, *french immersion for adults / in france for adults / older adults*, *live and learn at your teacher's home*, *french language holiday(s) for adults*, *one week french immersion*, *learn french in france*, *french lessons dordogne / bergerac* | title, description, H1, H2, FAQ |
| FR | *séjours linguistiques immersifs Bergerac* (existant, conservé), *cours de français pour étrangers*, *FLE*, *apprendre le français en immersion*, *cours de français Bergerac* | title, description, H1, H2, FAQ |

En français, « séjour linguistique adulte » est surtout tapé par des Français qui partent à l'étranger. C'est pour ça que la version FR vise aussi « cours de français (FLE) » et « pour étrangers ».

---

# Phase 1 – Mise en ligne sur Netlify pour validation (aucun impact sur l'ancien site)

1. **Dépôt GitHub privé** : crée un dépôt vide (sans README), puis dans `site/` :
   ```bash
   git remote add origin https://github.com/JosephSaleon/FrenchInBergerac.git
   git push -u origin main
   ```
2. **Netlify** → *Add new project* → *Import an existing project* → GitHub → choisis le dépôt. Les réglages sont lus depuis `netlify.toml` : build `npm run build`, dossier `dist`.
3. *Project configuration* → *Change project name* : par exemple `french-in-bergerac`, ce qui donne l'adresse `https://french-in-bergerac.netlify.app`.
4. **Formulaire** : *Forms* → *Enable form detection*, puis relance un déploiement (*Deploys* → *Trigger deploy*). Dans *Forms* → *Form notifications* → *Email notification*, mets l'adresse de Clotilde.
5. Vérifie :
   ```bash
   bash tools/check-deploy.sh https://french-in-bergerac.netlify.app
   ```
   Tout doit être `OK`, dont la ligne « noindex (adresse d'aperçu) ».
6. Envoie le lien à la cliente.

**Retouches** : chaque `git push` redéploie automatiquement en une à deux minutes. Pour lui montrer une variante sans toucher à la version validée, pousse une branche : Netlify crée une adresse d'aperçu dédiée (*branch deploy*), elle aussi non indexable.

# Phase 2 – Bascule du domaine (sans perte de référencement)

**Avant la bascule**
1. **Google Search Console** : vérifie que la propriété *Domaine* `frenchinbergerac.net` existe. Sinon, crée-la (enregistrement TXT dans la zone DNS chez Hostinger).
2. Dans *Performances*, **exporte les 16 derniers mois** (requêtes et pages). C'est la référence pour comparer.
3. Dans *Pages*, note les URLs indexées. S'il en existe d'autres que celles du tableau des URLs, ajoute-les en 301 dans `public/_redirects`.

**Le jour J** (environ 30 minutes, sans coupure)
1. Netlify → *Domain management* → *Add a domain* → `frenchinbergerac.net`. Mets-le en **domaine principal** et ajoute `www` en alias.
2. Chez Hostinger → *DNS* du domaine : remplace les enregistrements `A` de `@` par celui qu'indique Netlify (son load balancer), et fais pointer le `CNAME` de `www` vers `french-in-bergerac.netlify.app`. Ne touche à rien d'autre.
3. Attends que Netlify affiche le certificat HTTPS comme actif (quelques minutes à quelques heures).
4. **Netlify → *Deploys* → *Trigger deploy* → *Clear cache and deploy site*.** ⚠️ Cette étape est indispensable : c'est elle qui retire le noindex.
5. Vérifie :
   ```bash
   bash tools/check-deploy.sh
   ```
   La dernière ligne doit dire « indexable (vrai domaine) ».
6. **Search Console** : soumets `https://frenchinbergerac.net/sitemap-index.xml`, puis *Inspection de l'URL* → *Demander une indexation* pour `/`, `/en/`, `/contact` et `/en/contact`.
7. Teste le [Test des résultats enrichis](https://search.google.com/test/rich-results) sur `/` et `/en/`, l'aperçu de partage sur WhatsApp et l'envoi du formulaire.

**Après**
- Résilie l'**hébergement** Hostinger, mais **pas le nom de domaine**. Vérifie sa date de renouvellement : si le domaine était « offert » avec le forfait, il faudra le payer à part, ou le transférer vers Cloudflare Registrar ou OVH (environ 10 à 15 € par an).
- Une fois par semaine pendant 6 à 8 semaines : compare *Performances* et *Pages* avec l'export. Une petite oscillation les premières semaines est normale.
- **Google Business Profile** : crée ou vérifie la fiche « French in Bergerac » (mêmes nom, adresse et téléphone que le site), avec un lien vers le site. C'est le levier le plus fort en local. Demande aux anciens élèves des avis Google.
- **Annuaires du secteur** (liens entrants) : FLE.fr, languagecourse.net (catégorie *live with teacher*), GoOverseas, AngloInfo Dordogne.

## À valider avec la cliente
- Les textes de `src/i18n.ts`, en particulier la mention « pour adultes », la FAQ et la version anglaise (idéalement relue par une personne anglophone).
- Les mentions légales : obligatoires pour un site professionnel en France (nom, statut, SIRET, hébergeur Netlify). Il faut une page dédiée.
- Des photos en haute définition si possible, surtout pour la grande photo d'accueil, aujourd'hui en 868 px de large.
