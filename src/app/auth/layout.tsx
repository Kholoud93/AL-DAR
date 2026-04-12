import type { ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function AuthLayout({ children }: { children: ReactNode }) {
  // Use theme-aware background
  return (
    <div className="min-h-screen flex items-center justify-center bg-background transition-colors">
      {children}
    </div>
  );
}
