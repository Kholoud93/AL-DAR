import type { Country } from "@/types/dashboard";
import { mockCountries } from "@/data/dashboard-mock";

export const COUNTRIES_STORAGE_KEY = "aldar-dashboard-countries";

export const COUNTRIES_UPDATED_EVENT = "aldar-dashboard-countries-updated";

export function loadCountries(): Country[] {
  if (typeof window === "undefined") return mockCountries;
  try {
    const raw = localStorage.getItem(COUNTRIES_STORAGE_KEY);
    if (!raw) return mockCountries;
    const parsed = JSON.parse(raw) as Country[];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    /* ignore */
  }
  return mockCountries;
}

export function saveCountries(countries: Country[]) {
  localStorage.setItem(COUNTRIES_STORAGE_KEY, JSON.stringify(countries));
  window.dispatchEvent(new Event(COUNTRIES_UPDATED_EVENT));
}
