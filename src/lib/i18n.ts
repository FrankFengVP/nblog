import { en } from "@/messages/en";
import { zh } from "@/messages/zh";

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookieName = "nblog_locale";

const dictionaries = { en, zh } as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function localizedPath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function getLocaleLabel(locale: Locale): string {
  return locale === "en" ? "English" : "中文";
}

/** Parse Accept-Language; prefer zh if listed, otherwise en, else default. */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;

  const preferences = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, qPart] = part.trim().split(";");
      const q = qPart?.trim().startsWith("q=")
        ? Number.parseFloat(qPart.trim().slice(2))
        : 1;
      return {
        lang: lang.trim().toLowerCase(),
        q: Number.isFinite(q) ? q : 0,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferences) {
    if (lang === "zh" || lang.startsWith("zh-")) return "zh";
    if (lang === "en" || lang.startsWith("en-")) return "en";
  }

  return defaultLocale;
}

export function resolvePreferredLocale(
  cookieLocale: string | undefined,
  acceptLanguage: string | null | undefined
): Locale {
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }
  return negotiateLocale(acceptLanguage);
}
