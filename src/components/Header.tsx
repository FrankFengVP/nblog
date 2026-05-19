import Link from "next/link";
import { Nav } from "@/components/Nav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href={localizedPath(locale)} className="site-logo">
          <span>NBlog</span>
          <small>Journal</small>
        </Link>
        <div className="site-header-actions">
          <Nav locale={locale} dict={dict} />
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
