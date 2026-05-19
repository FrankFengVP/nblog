"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleLabel, locales, type Locale } from "@/lib/i18n";

function switchLocalePath(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="lang-switcher" role="navigation" aria-label="Language">
      {locales.map((item) => (
        <Link
          key={item}
          href={switchLocalePath(pathname, item)}
          className={`lang-switcher-link ${item === locale ? "lang-switcher-link-active" : ""}`}
          aria-current={item === locale ? "page" : undefined}
        >
          {getLocaleLabel(item)}
        </Link>
      ))}
    </div>
  );
}
