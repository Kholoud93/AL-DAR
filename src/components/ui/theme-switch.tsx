"use client";
import { Button } from "./button";
import useTheme from "@/hooks/useTheme";

export function ThemeSwitch({ className = "" }: { className?: string }) {
  const { ToggleIcon, toggleTheme, isDark, mounted } = useTheme();
  if (!mounted) return null;
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      className={className}
      onClick={toggleTheme}
    >
      <ToggleIcon className="h-5 w-5" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
