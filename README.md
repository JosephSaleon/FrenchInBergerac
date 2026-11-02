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
| `src/content/home/<section>.<langue>.json` | **Textes de la page d'accueil**, un fichier par section (en-tête, présentation, séjour et prix…) |
| `src/content/contact/contact.<langue>.json` | Titre et introduction de la page contact |
| `src/content/settings/coordonnees.json` | **Téléphone, e-mail, adresse** (pied de page, page contact, données pour Google) |
| `src/content/settings/seo.<langue>.json` | Titres et descriptions Google de chaque page |
| `src/content/blog/<article>/` | **Articles du blog** : `index.fr.md`, `index.en.md` (facultatif) et leurs photos |
| `src/site-content.ts` | Charge et valide les fichiers ci-dessus : une saisie invalide fait échouer le build (le site en ligne reste intact) |
| `src/content.config.ts` | Schéma des articles du blog |
| `src/pages/admin/config.yml.ts` | Configuration de l'admin (champs proposés à l'édition), à garder cohérente avec les schémas |
| `src/i18n.ts` | Textes fixes de l'interface (menu, formulaire, blog, pied de page) |
| `src/config.ts` | Nom du site, correspondance des URLs FR/EN |
| `src/components/Home.astro` | Structure de la page d'accueil et données structurées (JSON-LD) |
| `src/components/Blog*.astro`, `src/blog.ts` | Liste des articles et page d'article |
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
| `/blog/`, `/en/blog/` | Liste des articles | non indexée et hors sitemap tant qu'elle est vide |
| `/blog/<article>`, `/en/blog/<article>` | Article (la version anglaise est facultative) | nouveau |
| `/admin/` | Espace d'administration | non indexé |
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

## Espace d'administration (`/admin`)
[Sveltia CMS](https://sveltiacms.app), sans base de données : chaque enregistrement crée un commit sur GitHub, et Netlify republie le site en une à deux minutes. Si une saisie est invalide, le build échoue et le site en ligne reste tel quel (*Deploys* sur Netlify pour voir l'erreur).

- **Page d'accueil** : une fiche par section, dans l'ordre de la page (1. En-tête … 9. Appel à l'action), français et anglais côte à côte.
- **Page contact** : titre et introduction.
- **Coordonnées** : téléphone, e-mail, adresse, modifiés partout d'un coup.
- **Référencement Google** : titres et descriptions des pages dans Google, à modifier avec prudence.

> Dans `src/pages/admin/config.yml.ts`, une rubrique dont le fichier contient `{{locale}}` doit avoir `i18n: true` au niveau de la rubrique. Sinon l'admin ne trouve pas le fichier et affiche des champs vides. Une fiche non traduite (comme les coordonnées) doit être dans une rubrique sans `i18n`.
- **Blog** : *Blog* → *Nouvel article*. Un article est créé en français ; pour ajouter l'anglais, menu ⋮ de l'éditeur → activer *English*. Le lien « Blog » apparaît dans le menu dès le premier article publié. Case *Brouillon* : l'article est enregistré mais pas publié.
- Les photos ajoutées dans un article sont rangées avec lui et optimisées automatiquement (WebP, plusieurs tailles). L'image de partage (réseaux sociaux) est générée à partir de la photo de couverture.

**Mise en place, une seule fois**
1. **GitHub** → *Settings* → *Developer settings* → *OAuth Apps* → *New OAuth App* :
   - *Homepage URL* : l'adresse du site sur Netlify ;
   - *Authorization callback URL* : `https://api.netlify.com/auth/done`.
   Note le *Client ID* et génère un *Client secret*.
2. **Netlify** → *Project configuration* → *Access & security* → **OAuth** (pas *Identity*) → *Install provider* → *GitHub* : colle le *Client ID* et le *Client secret*.
3. **Accès de Clotilde** : elle crée un compte GitHub gratuit ; sur le dépôt → *Settings* → *Collaborators* → *Add people* (droit d'écriture). Elle accepte l'invitation reçue par e-mail.
4. Connexion : `https://<site>/admin/` → *Se connecter avec GitHub*.

Après la bascule du domaine, l'admin est à `https://frenchinbergerac.net/admin/`, sans autre réglage.

Sveltia est chargé depuis unpkg avec une version figée dans `public/admin/index.html` : la mettre à jour de temps en temps, après lecture du changelog.

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
- Les textes de la page d'accueil (modifiables depuis `/admin`), en particulier la mention « pour adultes », la FAQ et la version anglaise (idéalement relue par une personne anglophone).
- Les mentions légales : obligatoires pour un site professionnel en France (nom, statut, SIRET, hébergeur Netlify). Il faut une page dédiée.
- Des photos en haute définition si possible, surtout pour la grande photo d'accueil, aujourd'hui en 868 px de large.
