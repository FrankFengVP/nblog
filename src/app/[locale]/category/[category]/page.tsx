import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { PostCard } from "@/components/PostCard";
import {
  categories,
  getCategoryLabel,
  isValidCategory,
  type Category,
} from "@/lib/categories";
import { getDictionary, locales, localizedPath, type Locale } from "@/lib/i18n";
import { getPostsByCategory } from "@/lib/posts";

type Props = {
  params: Promise<{ locale: string; category: string }>;
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

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;
  if (!isValidCategory(category)) notFound();

  const typedLocale = locale as Locale;
  const typedCategory = category as Category;
  const dict = getDictionary(typedLocale);
  const posts = getPostsByCategory(typedCategory, typedLocale);
  const label = getCategoryLabel(dict, typedCategory);

  return (
    <div className="page-main">
      <div className="site-container pb-24">
        <BackLink href={localizedPath(typedLocale)}>{dict.post.backHome}</BackLink>

        <header className="page-header">
          <p className="eyebrow">{dict.categoryPage.allPosts}</p>
          <h1 className="page-title font-serif">{label}</h1>
        </header>

        {posts.length === 0 ? (
          <p className="empty-state">{dict.categoryPage.emptyState}</p>
        ) : (
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
        )}
      </div>
    </div>
  );
}
