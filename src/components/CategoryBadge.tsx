import Link from "next/link";
import { categoryPath, getCategoryLabel, type Category } from "@/lib/categories";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

type CategoryBadgeProps = {
  locale: Locale;
  dict: Dictionary;
  category: Category;
  linked?: boolean;
};

export function CategoryBadge({
  locale,
  dict,
  category,
  linked = true,
}: CategoryBadgeProps) {
  const label = getCategoryLabel(dict, category);
  const className = "category-badge";

  if (!linked) {
    return <span className={className}>{label}</span>;
  }

  return (
    <Link href={categoryPath(locale, category)} className={className}>
      {label}
    </Link>
  );
}
