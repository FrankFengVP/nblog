"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n";

type NavProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Nav({ locale, dict }: NavProps) {
  const pathname = usePathname();
  const homePath = localizedPath(locale);
  const aboutPath = localizedPath(locale, "/about");

  const navItems = [
    { href: homePath, label: dict.nav.home, active: pathname === homePath },
    {
      href: aboutPath,
      label: dict.nav.about,
      active: pathname.startsWith(aboutPath),
    },
  ];

  return (
    <nav className="site-nav">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-link ${item.active ? "nav-link-active" : ""}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
