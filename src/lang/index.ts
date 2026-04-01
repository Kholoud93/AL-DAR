import { homeAr } from "./ar/home";
import { homeEn } from "./en/home";
import type { Language } from "@/types";
import type { LanguagePack } from "./types";

export const languages: Record<Language, LanguagePack> = {
  en: {
    home: homeEn,
  },
  ar: {
    home: homeAr,
  },
};

export const getLanguagePack = (language: Language): LanguagePack =>
  languages[language];
