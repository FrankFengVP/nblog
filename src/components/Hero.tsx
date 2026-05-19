import type { Dictionary } from "@/lib/i18n";
import { formatMessage, formatMonth } from "@/lib/format";
import type { Locale } from "@/lib/i18n";

type HeroProps = {
  locale: Locale;
  dict: Dictionary;
  postCount: number;
  latestDate?: string;
};

export function Hero({ locale, dict, postCount, latestDate }: HeroProps) {
  return (
    <header className="site-container site-intro">
      <div className="site-intro-card">
        <p className="eyebrow">NBlog</p>
        <h1 className="site-intro-title font-serif">{dict.hero.title}</h1>
        <p className="site-intro-desc">{dict.hero.description}</p>
        <div className="site-intro-meta">
          <span>
            {formatMessage(dict.hero.postCount, { count: postCount })}
          </span>
          {latestDate && (
            <span>
              {formatMessage(dict.hero.updatedAt, {
                date: formatMonth(latestDate, locale),
              })}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
