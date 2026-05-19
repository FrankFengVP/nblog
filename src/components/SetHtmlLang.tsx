"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

const htmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
};

export function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
  }, [locale]);

  return null;
}
