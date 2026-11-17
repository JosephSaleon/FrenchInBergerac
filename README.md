# French in Bergerac – site bilingue FR/EN

Site statique généré avec [Astro](https://astro.build) et hébergé sur **Cloudflare Pages** (offre gratuite : 500 publications par mois, trafic illimité). Il n'y a aucun framework côté client : HTML pur, images WebP responsives, polices auto-hébergées.
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
| `src/content/home/house-gallery.json` | Galerie de la maison : ordre, taille, cadrage, légendes FR/EN |
| `src/content/blog/<article>/` | **Articles du blog** : `index.fr.md`, `index.en.md` (facultatif) et leurs photos |
| `src/site-content.ts` | Charge et valide les fichiers ci-dessus : une saisie invalide fait échouer le build (le site en ligne reste intact) |
| `src/content.config.ts` | Schéma des articles du blog |
| `src/pages/admin/config.yml.ts` | Configuration de l'admin (champs proposés à l'édition), à garder cohérente avec les schémas |
| `src/i18n.ts` | Textes fixes de l'interface (menu, formulaire, blog, pied de page) |
| `src/config.ts` | Nom du site, correspondance des URLs FR/EN |
| `src/components/Home.astro` | Structure de la page d'accueil et données structurées (JSON-LD) |
| `src/components/Blog*.astro`, `src/blog.ts` | Liste des articles et page d'article |
| `src/components/Contact.astro` | Page contact et formulaire (Web3Forms, clé dans `src/config.ts`) |
| `src/styles/global.css` | Design (couleurs en variables en haut du fichier) |
| `src/assets/` | Photos sources (redimensionnées et converties automatiquement au build) |
| `astro.config.mjs` | Configuration, dont la **règle d'indexation automatique** (voir plus bas) |
| `public/_headers` | En-têtes Cloudflare : cache, sécurité, noindex de l'adresse `.pages.dev` |
| `public/_redirects` | Redirections 301 sur Cloudflare |
| `functions/oauth/` | Connexion GitHub de l'admin (fonction Cloudflare, reprise de *sveltia-cms-auth*) |
| `.node-version` | Version de Node utilisée par le build Cloudflare |
| `public/.htaccess` | Mêmes redirections pour Apache (inutile sur Cloudflare, gardé en solution de repli) |
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

| Adresse | Indexable ? |
|---|---|
| Cloudflare, adresse provisoire `xxx.pages.dev` | non (en-tête `X-Robots-Tag: noindex`, voir `public/_headers`) |
| Cloudflare, aperçus de branche | non (noindex ajouté par Cloudflare) |
| Cloudflare, frenchinbergerac.net | **oui** |
| `npm run build:preview` | non (noindex dans les pages) |

Le même build sert l'adresse provisoire et le vrai domaine : c'est l'en-tête, posé selon l'adresse, qui empêche l'indexation de `.pages.dev`. Rien à relancer le jour de la bascule.

## Mots-clés ciblés
Ils viennent de l'autocomplétion Google (UK et US pour l'anglais, France pour le français), c'est-à-dire de ce que les gens tapent réellement.

| Langue | Expressions visées | Où |
|---|---|---|
| EN (cible principale) | *french immersion homestay*, *french immersion for adults / in france for adults / older adults*, *live and learn at your teacher's home*, *french language holiday(s) for adults*, *one week french immersion*, *learn french in france*, *french lessons dordogne / bergerac* | title, description, H1, H2, FAQ |
| FR | *séjours linguistiques immersifs Bergerac* (existant, conservé), *cours de français pour étrangers*, *FLE*, *apprendre le français en immersion*, *cours de français Bergerac* | title, description, H1, H2, FAQ |

En français, « séjour linguistique adulte » est surtout tapé par des Français qui partent à l'étranger. C'est pour ça que la version FR vise aussi « cours de français (FLE) » et « pour étrangers ».

## Espace d'administration (`/admin`)
[Sveltia CMS](https://sveltiacms.app), sans base de données : chaque enregistrement crée un commit sur GitHub, et Cloudflare republie le site en une à deux minutes. Si une saisie est invalide, le build échoue et le site en ligne reste tel quel (Cloudflare → projet → *Deployments* pour voir l'erreur).

- **Page d'accueil** : une fiche par section, dans l'ordre de la page (1. En-tête … 9. Appel à l'action), français et anglais côte à côte.
- **Photos des sections** (en-tête, professeure, région) : dans la fiche de la section, *Remplacer* sous la photo → *Téléverser* (ou choisir une photo déjà en ligne). La photo est convertie en WebP et réduite à 2400 px côté navigateur, rangée dans `src/assets/`, puis déclinée en plusieurs tailles au build. Elle vaut pour les deux langues ; penser à mettre à jour la *Description de la photo* en français et en anglais. Les anciennes photos restent dans `src/assets/` (rubrique « Ressources » de l'admin) et peuvent y être supprimées.
- **La maison — galerie** : les photos de la grille de la maison, une seule fiche pour les deux langues (légendes et descriptions en français et en anglais côte à côte). Pour chaque photo : *Taille* (normale, large, haute, grande 2 × 2) et *Cadrage* (partie de la photo gardée visible quand elle est découpée pour remplir sa case). Glisser les photos pour changer l'ordre, *Ajouter photo* pour en ajouter. L'aperçu à droite montre l'agencement sur ordinateur et sur téléphone, cases vides en pointillés rouges ; il est dessiné par `public/admin/gallery-preview.js`, qui reprend la règle de placement de la grille du site (`.gallery`, `grid-auto-flow: dense`).
- **Page contact** : titre et introduction.
- **Coordonnées** : téléphone, e-mail, adresse, modifiés partout d'un coup.
- **Référencement Google** : titres et descriptions des pages dans Google, à modifier avec prudence.

> Dans `src/pages/admin/config.yml.ts`, une rubrique dont le fichier contient `{{locale}}` doit avoir `i18n: true` au niveau de la rubrique. Sinon l'admin ne trouve pas le fichier et affiche des champs vides. Une fiche non traduite (comme les coordonnées) doit être dans une rubrique sans `i18n`.
- **Blog** : *Blog* → *Nouvel article*. Un article est créé en français ; pour ajouter l'anglais, menu ⋮ de l'éditeur → activer *English*. Le lien « Blog » apparaît dans le menu dès le premier article publié. Case *Brouillon* : l'article est enregistré mais pas publié.
- Les photos ajoutées dans un article sont rangées avec lui et optimisées automatiquement (WebP, plusieurs tailles). L'image de partage (réseaux sociaux) est générée à partir de la photo de couverture.

**Connexion** : l'admin démarre manuellement (`public/admin/index.html`) et passe par la fonction `/oauth` du domaine qui le sert (`functions/oauth/`). Il faut une application OAuth GitHub dont l'URL de retour est `https://<domaine>/oauth/callback` (un seul domaine par application : à changer le jour de la bascule) et, dans Cloudflare, les variables `GITHUB_CLIENT_ID` et `GITHUB_CLIENT_SECRET`.

**Accès de Clotilde** : compte GitHub, ajoutée au dépôt (*Settings* → *Collaborators*, droit d'écriture). Le dépôt est public : sur un dépôt privé, l'ancien hébergeur (Netlify gratuit) refusait les commits d'un deuxième contributeur.

Sveltia est chargé depuis unpkg avec une version figée dans `public/admin/index.html` : la mettre à jour de temps en temps, après lecture du changelog.

---

# Phase 1 – Mise en ligne sur Cloudflare Pages (aucun impact sur l'ancien site)

1. **Cloudflare** (compte gratuit) → *Workers & Pages* → *Create* → onglet **Pages** → *Connect to Git* → GitHub → dépôt `FrenchInBergerac`.
   - *Project name* : `frenchinbergerac` (adresse `https://frenchinbergerac.pages.dev`) ;
   - *Framework preset* : Astro ; *Build command* : `npm run build` ; *Build output directory* : `dist` ; *Root directory* : vide.
2. **GitHub** → *Settings* → *Developer settings* → *OAuth Apps* → l'application de l'admin (ou *New OAuth App*) :
   - *Homepage URL* : `https://frenchinbergerac.pages.dev` ;
   - *Authorization callback URL* : `https://frenchinbergerac.pages.dev/oauth/callback` ;
   - *Generate a new client secret*.
3. **Cloudflare** → projet → *Settings* → *Variables and Secrets* (production) : `GITHUB_CLIENT_ID` (texte) et `GITHUB_CLIENT_SECRET` (*Secret*), puis *Deployments* → *Retry deployment*.
4. **Formulaire** : sur web3forms.com, saisir l'adresse de Clotilde → la clé reçue par e-mail va dans `CONTACT_FORM.accessKey` (`src/config.ts`).
5. Vérifie :
   ```bash
   bash tools/check-deploy.sh https://frenchinbergerac.pages.dev
   ```
   Tout doit être `OK`, dont « noindex (adresse d'aperçu) » et « Connexion de l'admin ». Teste aussi la connexion à `/admin/` et un envoi du formulaire.

# Phase 2 – Bascule du domaine (sans perte de référencement)

**Avant la bascule**
1. **Google Search Console** : vérifie que la propriété *Domaine* `frenchinbergerac.net` existe. Sinon, crée-la (enregistrement TXT dans la zone DNS chez Hostinger).
2. Dans *Performances*, **exporte les 16 derniers mois** (requêtes et pages). C'est la référence pour comparer.
3. Dans *Pages*, note les URLs indexées. S'il en existe d'autres que celles du tableau des URLs, ajoute-les en 301 dans `public/_redirects`.

**Le jour J** (environ 30 minutes, sans coupure)
1. **Cloudflare** → *Add a domain* → `frenchinbergerac.net` → offre *Free*. Cloudflare recopie la zone DNS actuelle : vérifie que les enregistrements `MX` (e-mails) et `TXT` sont bien là avant de continuer.
2. **Hostinger** → domaine → *Serveurs DNS* : remplace-les par les deux serveurs indiqués par Cloudflare. Attends que Cloudflare affiche le domaine *Active* (quelques minutes à quelques heures).
3. **Cloudflare** → projet Pages → *Custom domains* : ajoute `frenchinbergerac.net` puis `www.frenchinbergerac.net`. Puis *Rules* → *Redirect Rules* → modèle « Redirect from WWW to root » (301), pour que `www` renvoie vers le domaine sans `www`.
4. **GitHub** → application OAuth de l'admin : *Homepage URL* `https://frenchinbergerac.net` et *Authorization callback URL* `https://frenchinbergerac.net/oauth/callback`. L'admin passe alors sur `https://frenchinbergerac.net/admin/` (l'adresse `.pages.dev` ne peut plus s'y connecter).
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
- Les mentions légales : obligatoires pour un site professionnel en France (nom, statut, SIRET, hébergeur Cloudflare). Il faut une page dédiée.
- Des photos en haute définition si possible, surtout pour la grande photo d'accueil, aujourd'hui en 868 px de large.
