"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, categoryPath, type Category } from "@/lib/categories";
import type { Dictionary } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n";

type NavProps = {
  locale: Locale;
  dict: Dictionary;
};

function isCategoryActive(pathname: string, locale: Locale, category: Category) {
  const prefix = categoryPath(locale, category);
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function Nav({ locale, dict }: NavProps) {
  const pathname = usePathname();
  const homePath = localizedPath(locale);
  const aboutPath = localizedPath(locale, "/about");

  const navItems = [
    { href: homePath, label: dict.nav.home, active: pathname === homePath },
    ...categories.map((category) => ({
      href: categoryPath(locale, category),
      label: dict.categories[category],
      active: isCategoryActive(pathname, locale, category),
    })),
    {
      href: aboutPath,
      label: dict.nav.about,
      active: pathname.startsWith(aboutPath),
    },
  ];

  return (
    <nav className="site-nav" aria-label={dict.nav.mainLabel}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-link ${item.active ? "nav-link-active" : ""}`}
          aria-current={item.active ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
