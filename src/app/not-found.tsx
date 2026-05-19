import Link from "next/link";
import { defaultLocale } from "@/lib/i18n";

export default function NotFound() {
  return (
    <div className="not-found-page site-container">
      <p className="eyebrow">404</p>
      <h1 className="not-found-code font-serif">Page not found</h1>
      <p className="not-found-message">
        The address may be invalid or the page may have been removed.
      </p>
      <Link href={`/${defaultLocale}`} className="link not-found-action">
        Back to home
      </Link>
    </div>
  );
}
