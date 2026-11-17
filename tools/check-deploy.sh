#!/usr/bin/env bash
# Vérifie, après mise en ligne, que les URLs, redirections et l'indexation sont comme prévu.
# Usage : bash tools/check-deploy.sh [https://frenchinbergerac.net | https://xxx.pages.dev]
BASE="${1:-https://frenchinbergerac.net}"
HOST="${BASE#https://}"
LIVE=0; [[ "$HOST" == "frenchinbergerac.net" ]] && LIVE=1
fail=0

check() { # url  code(s)_attendu(s) (ex. 301|308)  [destination_attendue]
  local res code loc
  res=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$1")
  code=${res%% *}; loc=${res#* }
  if [[ "|$2|" == *"|$code|"* && ( -z "$3" || "$loc" == "$3" ) ]]; then
    echo "OK     $code  $1 ${loc:+-> $loc}"
  else
    echo "ERREUR $code  $1 ${loc:+-> $loc}   (attendu : $2 ${3:+-> $3})"; fail=1
  fi
}

echo "== Pages (200 attendu)"
for p in / /contact /en/ /en/contact /merci /en/thank-you /blog/ /en/blog/ /admin/ /admin/config.yml /sitemap-index.xml /robots.txt /og-image.jpg; do check "$BASE$p" 200; done

echo "== Redirections (301, ou 308 pour le slash final géré par Cloudflare)"
check "$BASE/sjours-linguistiques-immersifs--bergerac-pour-apprendre-le-franais-efficacement" 301 "$BASE/"
check "$BASE/sjours-linguistiques--bergerac--immersion-dans-la-culture-franaise" 301 "$BASE/"
check "$BASE/en" "301|308" "$BASE/en/"
check "$BASE/blog" "301|308" "$BASE/blog/"
check "$BASE/sitemap.xml" 301 "$BASE/sitemap-index.xml"
check "$BASE/accueil/" 301 "$BASE/"
check "$BASE/contact/" "301|308" "$BASE/contact"
check "http://$HOST/contact" "301|308" "$BASE/contact"
[[ $LIVE == 1 ]] && check "https://www.$HOST/contact" "301|308" "$BASE/contact"

echo "== Page inexistante (404 attendu)"
check "$BASE/page-qui-n-existe-pas" 404

echo "== Indexation"
# noindex : balise dans la page (build d'aperçu) ou en-tête X-Robots-Tag (adresse .pages.dev)
noindex=$(( $(curl -s "$BASE/" | grep -c 'name="robots" content="noindex') + $(curl -s -I "$BASE/" | grep -ci '^x-robots-tag:.*noindex') ))
if [[ $LIVE == 1 && $noindex != 0 ]]; then
  echo "ERREUR  le site est sur son vrai domaine mais porte un noindex"; fail=1
elif [[ $LIVE == 0 && $noindex == 0 ]]; then
  echo "ERREUR  adresse d'aperçu indexable : elle doit porter un noindex"; fail=1
else
  [[ $LIVE == 1 ]] && echo "OK     indexable (vrai domaine)" || echo "OK     noindex (adresse d'aperçu)"
fi

echo "== Connexion de l'admin"
check "$BASE/oauth/auth?provider=github&site_id=$HOST" 302

exit $fail
