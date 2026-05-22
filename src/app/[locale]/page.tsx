import { Hero } from "@/components/Hero";
import { Pagination } from "@/components/Pagination";
import { PostCard } from "@/components/PostCard";
import { formatMessage } from "@/lib/format";
import { getDictionary, localizedPath, type Locale } from "@/lib/i18n";
import { paginate, parsePageParam } from "@/lib/pagination";
import { getAllPosts, splitPinnedPosts } from "@/lib/posts";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function HomePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const allPosts = getAllPosts(typedLocale);
  const { pinned, regular } = splitPinnedPosts(allPosts);
  const { items: posts, page, total, totalPages } = paginate(
    regular,
    parsePageParam(pageParam)
  );
  const latestDate = allPosts[0]?.date;
  const basePath = localizedPath(typedLocale);

  return (
    <>
      <Hero
        locale={typedLocale}
        dict={dict}
        postCount={allPosts.length}
        latestDate={latestDate}
      />

      <div className="site-container pb-24">
        {pinned.length > 0 && (
          <section className="pinned-section">
            <div className="section-header">
              <h2 className="section-title font-serif">{dict.home.pinnedTitle}</h2>
              <span className="eyebrow">{pinned.length}</span>
            </div>
            <ul className="post-list post-list--pinned">
              {pinned.map((post) => (
                <PostCard
                  key={post.slug}
                  locale={typedLocale}
                  dict={dict}
                  post={post}
                  pinned
                />
              ))}
            </ul>
          </section>
        )}

        <section className={pinned.length > 0 ? "posts-section" : undefined}>
          <div className="section-header">
            <h2 className="section-title font-serif">{dict.home.sectionTitle}</h2>
            <span className="eyebrow">{total}</span>
          </div>

          {total === 0 && pinned.length === 0 ? (
            <p className="empty-state">
              {formatMessage(dict.home.emptyState, { locale: typedLocale })}
            </p>
          ) : total === 0 ? null : (
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
        </section>
      </div>
    </>
  );
}
