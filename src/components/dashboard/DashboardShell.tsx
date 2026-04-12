"use client";

import type { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="ml-64 animate-fade-in p-8">{children}</main>
    </div>
  );
}
