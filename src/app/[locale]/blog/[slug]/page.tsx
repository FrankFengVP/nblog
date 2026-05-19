import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { Tag } from "@/components/Tag";
import { formatDate } from "@/lib/format";
import { getDictionary, locales, localizedPath, type Locale } from "@/lib/i18n";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const post = await getPostBySlug(slug, locale as Locale);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  let post;
  try {
    post = await getPostBySlug(slug, typedLocale);
  } catch {
    notFound();
  }

  return (
    <article className="page-main">
      <div className="site-container">
        <BackLink href={localizedPath(typedLocale)}>
          {dict.post.backHome}
        </BackLink>

        <header className="article-header">
          <time dateTime={post.date} className="eyebrow tabular-nums">
            {formatDate(post.date, typedLocale)}
          </time>
          <h1 className="article-title font-serif">{post.title}</h1>
          {post.tags.length > 0 && (
            <div className="article-meta">
              {post.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          )}
        </header>

        <div
          className="prose article-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="article-footer">
          <BackLink href={localizedPath(typedLocale)}>
            {dict.post.backToPosts}
          </BackLink>
        </footer>
      </div>
    </article>
  );
}
