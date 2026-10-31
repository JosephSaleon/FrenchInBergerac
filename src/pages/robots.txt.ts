import type { APIRoute } from 'astro';

// En aperçu, chaque page porte un noindex : on laisse explorer pour que Google le voie,
// et on ne déclare pas de sitemap.
const preview = __NOINDEX__;

export const GET: APIRoute = () =>
  new Response(
    preview
      ? 'User-agent: *\nAllow: /\n'
      : 'User-agent: *\nAllow: /\n\nSitemap: https://frenchinbergerac.net/sitemap-index.xml\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
