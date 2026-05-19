import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { getDictionary, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.about.title,
    description: dict.meta.aboutDescription,
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return (
    <div className="page-main">
      <div className="site-container">
        <BackLink href={localizedPath(typedLocale)}>
          {dict.post.backHome}
        </BackLink>

        <header className="page-header">
          <p className="eyebrow">{dict.about.eyebrow}</p>
          <h1 className="page-title font-serif">{dict.about.title}</h1>
          <p className="page-lead">{dict.about.lead}</p>
        </header>

        <div className="page-body">
          <p>
            {dict.about.body}{" "}
            <code className="inline-code">content/posts/{typedLocale}</code>
            {dict.about.bodySuffix}
          </p>

          <h2 className="font-serif">{dict.about.stackTitle}</h2>
          <ul className="stack-list">
            {dict.about.stack.map((item) => (
              <li key={item.name} className="stack-item">
                <span className="stack-item-name">{item.name}</span>
                <span className="stack-item-desc">{item.desc}</span>
              </li>
            ))}
          </ul>

          <p className="page-cta">
            <Link href={localizedPath(typedLocale)} className="link">
              {dict.about.cta}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
