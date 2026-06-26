"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/** Keeps <html lang> in sync when switching locale client-side. */
export function SetHtmlLang() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
