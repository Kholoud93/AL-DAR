// TODO: Language context hook for AR/EN switching with RTL support
import { useState } from "react";
import type { Language } from "@/types";
import { getLanguagePack } from "@/lang";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en");
  const isRTL = language === "ar";
  const dir = isRTL ? "rtl" : "ltr";
  const translations = getLanguagePack(language);

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));

  return { language, setLanguage, isRTL, dir, toggleLanguage, translations };
}
