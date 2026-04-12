"use client";

import type { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-on-primary), var(--color-text-label), var(--color-text-title))",
      }}
      data-theme="dashboard"
    >
      <DashboardSidebar />
      <main className="ml-64 animate-fade-in p-8">{children}</main>
    </div>
  );
}
