import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import { formatMessage } from "@/lib/format";
import { localizedPath, type Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-brand">NBlog</p>
        <nav className="site-footer-links" aria-label={dict.nav.footerLabel}>
          <Link href={localizedPath(locale)} className="link-muted">
            {dict.nav.home}
          </Link>
          <Link href={localizedPath(locale, "/about")} className="link-muted">
            {dict.nav.about}
          </Link>
        </nav>
        <p className="site-footer-text">
          {formatMessage(dict.footer.copyright, {
            year: new Date().getFullYear(),
          })}
        </p>
      </div>
    </footer>
  );
}
