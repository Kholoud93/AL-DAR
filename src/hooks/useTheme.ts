"use client";

import type { LucideIcon } from "lucide-react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

/** Lucide icons for building theme controls (Sun = light, Moon = dark, Monitor = system). */
export const themeIcons = { Sun, Moon, Monitor } as const;

export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  /** Icon for a light/dark toggle: Moon in light mode, Sun in dark (common UX). */
  const ToggleIcon: LucideIcon = useMemo(() => {
    if (!mounted) return Sun;
    return isDark ? Sun : Moon;
  }, [mounted, isDark]);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme,
    isDark,
    mounted,
    toggleTheme,
    /** Use for `<ToggleIcon className="h-4 w-4" aria-hidden />` on a theme button. */
    ToggleIcon,
    icons: themeIcons,
  };
}

export default useTheme;
