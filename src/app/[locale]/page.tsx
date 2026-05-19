import { Hero } from "@/components/Hero";
import { PostCard } from "@/components/PostCard";
import { formatMessage } from "@/lib/format";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/posts";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const posts = getAllPosts(typedLocale);
  const latestDate = posts[0]?.date;

  return (
    <>
      <Hero
        locale={typedLocale}
        dict={dict}
        postCount={posts.length}
        latestDate={latestDate}
      />

      <div className="site-container pb-24">
        <section>
          <div className="section-header">
            <h2 className="section-title font-serif">{dict.home.sectionTitle}</h2>
            <span className="eyebrow">{posts.length}</span>
          </div>

          {posts.length === 0 ? (
            <p className="empty-state">
              {formatMessage(dict.home.emptyState, { locale: typedLocale })}
            </p>
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
        </section>
      </div>
    </>
  );
}
