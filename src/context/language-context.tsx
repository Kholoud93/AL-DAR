"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Language } from "@/types";
import { getLanguagePack } from "@/lang";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  isRTL: boolean;
  dir: "ltr" | "rtl";
  toggleLanguage: () => void;
  translations: ReturnType<typeof getLanguagePack>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const isRTL = language === "ar";
  const dir: "ltr" | "rtl" = isRTL ? "rtl" : "ltr";
  const translations = useMemo(() => getLanguagePack(language), [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = translations.home.meta.dir;
  }, [language, translations.home.meta.dir]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      isRTL,
      dir,
      toggleLanguage,
      translations,
    }),
    [language, isRTL, dir, toggleLanguage, translations],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
