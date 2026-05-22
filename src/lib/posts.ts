import { type Category } from "@/lib/categories";
import { type Locale, defaultLocale, isValidLocale } from "@/lib/i18n";
import { postsData, type GeneratedPost } from "@/generated/posts-data";

export const MAX_PINNED_POSTS = 3;

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: Category;
  tags: string[];
  /** Lower number = higher on homepage; only top {@link MAX_PINNED_POSTS} are shown. */
  pinned?: number;
};

export type Post = PostMeta & {
  content: string;
};

function toMeta(post: GeneratedPost): PostMeta {
  const { content: _content, ...meta } = post;
  return meta;
}

function comparePinned(a: PostMeta, b: PostMeta): number {
  const orderA = a.pinned ?? 999;
  const orderB = b.pinned ?? 999;
  if (orderA !== orderB) return orderA - orderB;
  return a.date < b.date ? 1 : -1;
}

export function splitPinnedPosts(posts: PostMeta[]): {
  pinned: PostMeta[];
  regular: PostMeta[];
} {
  const pinned = posts.filter((p) => p.pinned !== undefined).sort(comparePinned).slice(0, MAX_PINNED_POSTS);
  const pinnedSlugs = new Set(pinned.map((p) => p.slug));
  const regular = posts.filter((p) => !pinnedSlugs.has(p.slug));
  return { pinned, regular };
}

export function getPostSlugs(locale: Locale = defaultLocale): string[] {
  return postsData[locale].map((p) => p.slug);
}

export function getAllPosts(locale: Locale = defaultLocale): PostMeta[] {
  return postsData[locale].map(toMeta);
}

export function getPostsByCategory(
  category: Category,
  locale: Locale = defaultLocale
): PostMeta[] {
  return getAllPosts(locale).filter((post) => post.category === category);
}

export async function getPostBySlug(
  slug: string,
  locale: Locale = defaultLocale
): Promise<Post> {
  const post = postsData[locale].find((p) => p.slug === slug);
  if (!post) {
    throw new Error(`Post not found: ${slug}`);
  }
  return post;
}

export function resolveLocale(locale: string): Locale {
  return isValidLocale(locale) ? locale : defaultLocale;
}
