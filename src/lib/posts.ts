import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { type Category, isValidCategory } from "@/lib/categories";
import { type Locale, defaultLocale, isValidLocale } from "@/lib/i18n";

const postsRoot = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: Category;
  tags: string[];
};

export type Post = PostMeta & {
  content: string;
};

function getPostsDirectory(locale: Locale) {
  return path.join(postsRoot, locale);
}

function parseCategory(data: matter.GrayMatterFile<string>["data"]): Category {
  const raw = data.category as string | undefined;
  return raw && isValidCategory(raw) ? raw : "tech";
}

function parseMeta(slug: string, data: matter.GrayMatterFile<string>["data"]): PostMeta {
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: (data.excerpt as string) ?? "",
    category: parseCategory(data),
    tags: (data.tags as string[]) ?? [],
  };
}

export function getPostSlugs(locale: Locale = defaultLocale): string[] {
  const postsDirectory = getPostsDirectory(locale);
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(locale: Locale = defaultLocale): PostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => {
      const fullPath = path.join(getPostsDirectory(locale), `${slug}.md`);
      const { data } = matter(fs.readFileSync(fullPath, "utf8"));
      return parseMeta(slug, data);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
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
  const fullPath = path.join(getPostsDirectory(locale), `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  const html = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  return {
    ...parseMeta(slug, data),
    content: html.toString(),
  };
}

export function resolveLocale(locale: string): Locale {
  return isValidLocale(locale) ? locale : defaultLocale;
}
