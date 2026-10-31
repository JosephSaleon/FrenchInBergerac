#!/usr/bin/env bash
# Vérifie, après mise en ligne, que les URLs et redirections répondent comme prévu.
# Usage : bash tools/check-deploy.sh [https://frenchinbergerac.net]
BASE="${1:-https://frenchinbergerac.net}"
HOST="${BASE#https://}"
fail=0

check() { # url  code_attendu  [destination_attendue]
  local res code loc
  res=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$1")
  code=${res%% *}; loc=${res#* }
  if [[ "$code" == "$2" && ( -z "$3" || "$loc" == "$3" ) ]]; then
    echo "OK    $code  $1 ${loc:+-> $loc}"
  else
    echo "ERREUR $code  $1 ${loc:+-> $loc}   (attendu : $2 ${3:+-> $3})"; fail=1
  fi
}

echo "== Pages (200 attendu)"
for p in / /contact /en /en/contact /sitemap-index.xml /robots.txt /og-image.jpg; do check "$BASE$p" 200; done

echo "== Redirections 301"
check "$BASE/sjours-linguistiques-immersifs--bergerac-pour-apprendre-le-franais-efficacement" 301 "$BASE/"
check "$BASE/sjours-linguistiques--bergerac--immersion-dans-la-culture-franaise" 301 "$BASE/"
check "$BASE/contact.html" 301 "$BASE/contact"
check "$BASE/contact/" 301 "$BASE/contact"
check "$BASE/en/" 301 "$BASE/en"
check "$BASE/index.html" 301 "$BASE/"
check "$BASE/sitemap.xml" 301 "$BASE/sitemap-index.xml"
check "http://$HOST/contact" 301 "$BASE/contact"
check "https://www.$HOST/contact" 301 "$BASE/contact"

echo "== Page inexistante (404 attendu)"
check "$BASE/page-qui-n-existe-pas" 404

exit $fail
