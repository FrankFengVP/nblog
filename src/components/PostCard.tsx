import Link from "next/link";
import { CategoryBadge } from "@/components/CategoryBadge";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { Tag } from "@/components/Tag";
import type { Dictionary } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n";

type PostCardProps = {
  locale: Locale;
  dict: Dictionary;
  post: PostMeta;
  pinned?: boolean;
};

export function PostCard({ locale, dict, post, pinned = false }: PostCardProps) {
  return (
    <li className={pinned ? "post-item post-item--pinned" : "post-item"}>
      <div className="post-item-inner">
        <div className="post-item-meta">
          {pinned && (
            <span className="post-item-pin">{dict.home.pinnedBadge}</span>
          )}
          <time dateTime={post.date} className="post-item-date">
            {formatDate(post.date, locale)}
          </time>
          <CategoryBadge locale={locale} dict={dict} category={post.category} />
        </div>
        <Link
          href={localizedPath(locale, `/blog/${post.slug}`)}
          className="post-item-link"
        >
          <h2 className="post-item-title font-serif">{post.title}</h2>
          {post.excerpt && <p className="post-item-excerpt">{post.excerpt}</p>}
          <div className="post-item-footer">
            {post.tags.length > 0 && (
              <div className="post-item-tags">
                {post.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            )}
            <span className="post-item-more" aria-hidden>
              {dict.post.readMore}
            </span>
          </div>
        </Link>
      </div>
    </li>
  );
}
