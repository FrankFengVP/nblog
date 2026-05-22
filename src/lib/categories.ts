import type { Dictionary, Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

export const categories = ["tech", "life", "emotion", "news"] as const;
export type Category = (typeof categories)[number];

export function isValidCategory(value: string): value is Category {
  return categories.includes(value as Category);
}

export function getCategoryLabel(dict: Dictionary, category: Category): string {
  return dict.categories[category];
}

export function categoryPath(locale: Locale, category: Category): string {
  return localizedPath(locale, `/category/${category}`);
}
