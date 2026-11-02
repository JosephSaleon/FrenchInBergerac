import { getCollection, type CollectionEntry } from 'astro:content';
import { ROUTES, type Lang, type Paths } from './config';

export type Post = CollectionEntry<'blog'>;

const slugOf = (post: Post) => post.id.split('/')[1];
const langOf = (post: Post) => post.id.split('/')[0] as Lang;

export const postPath = (lang: Lang, slug: string) => `${ROUTES.blog[lang]}${slug}`;

/** Articles publiés (hors brouillons) d'une langue, du plus récent au plus ancien */
export async function getPosts(lang: Lang) {
  const posts = await getCollection('blog', (p) => langOf(p) === lang && !p.data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).map((post) => ({ post, slug: slugOf(post) }));
}

/** Adresses d'un article dans chaque langue où il est publié */
export async function getPostPaths(slug: string): Promise<Paths> {
  const versions = await getCollection('blog', (p) => slugOf(p) === slug && !p.data.draft);
  return Object.fromEntries(versions.map((p) => [langOf(p), postPath(langOf(p), slug)]));
}

/** getStaticPaths commun aux pages /blog/[slug] et /en/blog/[slug] */
export async function blogStaticPaths(lang: Lang) {
  return (await getPosts(lang)).map(({ post, slug }) => ({ params: { slug }, props: { post, slug } }));
}

export const formatDate = (date: Date, lang: Lang) =>
  date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
