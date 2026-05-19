import type { Locale } from "@/lib/i18n";

const localeMap: Record<Locale, string> = {
  en: "en-US",
  zh: "zh-CN",
};

export function formatDate(
  dateStr: string,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
) {
  return new Date(dateStr).toLocaleDateString(localeMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

export function formatMonth(dateStr: string, locale: Locale) {
  return new Date(dateStr).toLocaleDateString(localeMap[locale], {
    year: "numeric",
    month: "long",
  });
}

export function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function formatMessage(
  template: string,
  values: Record<string, string | number>
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, String(value)),
    template
  );
}
