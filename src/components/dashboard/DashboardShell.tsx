"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { DASHBOARD_BASE } from "@/config/dashboard-nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DashboardSidebar, {
  DashboardSidebarPanel,
} from "./DashboardSidebar";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-on-primary), var(--color-text-label), var(--color-text-title))",
      }}
      data-theme="dashboard"
    >
      {/* Mobile top bar — hidden at md+ where fixed sidebar is shown */}
      <header className="fixed left-0 right-0 top-0 z-[100] flex h-14 items-center gap-3 border-b border-white/10 bg-[#312e81]/95 px-3 backdrop-blur-md md:hidden">
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 text-white hover:bg-white/10"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[min(100vw-2rem,16rem)] border-0 bg-gradient-to-b from-[#6366f1] to-[#2e2b6b] p-0 text-white [&>button]:text-white [&>button]:hover:bg-white/10"
          >
            <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
            <div className="flex h-full max-h-[100dvh] flex-col overflow-hidden">
              <DashboardSidebarPanel
                onNavigate={() => setMobileNavOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
        <Link
          href={DASHBOARD_BASE}
          className="flex min-w-0 items-center"
          onClick={() => setMobileNavOpen(false)}
        >
          <img
            src="/aldar-logo.png"
            alt="ALDAR — Overview"
            className="h-8 w-auto max-w-[min(100%,180px)]"
          />
        </Link>
      </header>

      <DashboardSidebar />
      <main className="min-w-0 max-w-[100vw] animate-fade-in px-4 pb-8 pt-[calc(3.5rem+1.5rem)] md:ml-64 md:max-w-none md:px-8 md:pb-8 md:pt-8">
        {children}
      </main>
    </div>
  );
}
