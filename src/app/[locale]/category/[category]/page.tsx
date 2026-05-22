import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { Pagination } from "@/components/Pagination";
import { PostCard } from "@/components/PostCard";
import {
  categories,
  categoryPath,
  getCategoryLabel,
  isValidCategory,
  type Category,
} from "@/lib/categories";
import { getDictionary, locales, localizedPath, type Locale } from "@/lib/i18n";
import { paginate, parsePageParam } from "@/lib/pagination";
import { getPostsByCategory } from "@/lib/posts";

type Props = {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isValidCategory(category)) return { title: "Not Found" };
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const label = getCategoryLabel(dict, category);
  return {
    title: label,
    description: `${label} — NBlog`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { locale, category } = await params;
  const { page: pageParam } = await searchParams;
  if (!isValidCategory(category)) notFound();

  const typedLocale = locale as Locale;
  const typedCategory = category as Category;
  const dict = getDictionary(typedLocale);
  const allPosts = getPostsByCategory(typedCategory, typedLocale);
  const { items: posts, page, total, totalPages } = paginate(
    allPosts,
    parsePageParam(pageParam)
  );
  const label = getCategoryLabel(dict, typedCategory);
  const basePath = categoryPath(typedLocale, typedCategory);

  return (
    <div className="page-main">
      <div className="site-container pb-24">
        <BackLink href={localizedPath(typedLocale)}>{dict.post.backHome}</BackLink>

        <header className="page-header">
          <p className="eyebrow">{dict.categoryPage.allPosts}</p>
          <h1 className="page-title font-serif">{label}</h1>
        </header>

        {total === 0 ? (
          <p className="empty-state">{dict.categoryPage.emptyState}</p>
        ) : (
          <>
            <ul className="post-list">
              {posts.map((post) => (
                <PostCard
                  key={post.slug}
                  locale={typedLocale}
                  dict={dict}
                  post={post}
                />
              ))}
            </ul>
            <Pagination
              basePath={basePath}
              page={page}
              totalPages={totalPages}
              dict={dict}
            />
          </>
        )}
      </div>
    </div>
  );
}
