"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import {
  DASHBOARD_BASE,
  dashboardNavItems,
} from "@/config/dashboard-nav";
import { mockMessages } from "@/data/dashboard-mock";
import {
  PROFILE_UPDATED_EVENT,
  defaultDashboardProfile,
  initialsFromName,
  readStoredDashboardProfile,
} from "@/lib/dashboard-profile-storage";
import { cn } from "@/lib/utils";
import useTheme from "@/hooks/useTheme";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const initialInboxUnread = mockMessages.filter((m) => !m.isRead).length;

function sidebarNavRowClass(active: boolean) {
  return cn(
    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200 md:gap-2.5 md:px-2.5 md:py-2 md:text-[13px]",
    active
      ? "bg-[#312e81] text-white"
      : "text-dash-sidebar-fg/70 hover:bg-[#1b1464] hover:text-white",
  );
}

type DashboardSidebarPanelProps = {
  onNavigate?: () => void;
};

function SidebarThemeRow() {
  const { ToggleIcon, toggleTheme, mounted } = useTheme();
  if (!mounted) return null;
  return (
    <button
      type="button"
      className={sidebarNavRowClass(false)}
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <ToggleIcon className="h-4 w-4 shrink-0 md:h-3.5 md:w-3.5" />
      <span>Theme</span>
    </button>
  );
}

export function DashboardSidebarPanel({ onNavigate }: DashboardSidebarPanelProps) {
  const pathname = usePathname();
  const [fullName, setFullName] = useState(defaultDashboardProfile.fullName);
  const [role, setRole] = useState(defaultDashboardProfile.role);
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const apply = () => {
      const p = readStoredDashboardProfile();
      if (!p) return;
      setFullName(p.fullName);
      setRole(p.role);
      setAvatarDataUrl(p.avatarDataUrl);
    };
    apply();
    window.addEventListener(PROFILE_UPDATED_EVENT, apply);
    window.addEventListener("storage", apply);
    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, apply);
      window.removeEventListener("storage", apply);
    };
  }, []);

  const handleNav = () => {
    onNavigate?.();
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-dash-sidebar-border p-6 md:p-4">
        <Link
          href={DASHBOARD_BASE}
          onClick={handleNav}
          className="inline-flex rounded-md outline-none ring-offset-2 ring-offset-[#6366f1] transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white"
          title="Overview"
        >
          <img
            src="/aldar-logo.png"
            alt="ALDAR — go to Overview"
            className="h-12 w-auto md:h-10"
          />
        </Link>
      </div>

      <div className="shrink-0 border-b border-dash-sidebar-border p-4 md:p-3">
        <div className="flex items-center gap-3 md:gap-2.5">
          <Link
            href="/dashboard/profile"
            onClick={handleNav}
            className="shrink-0 rounded-full ring-offset-2 ring-offset-transparent transition-all hover:ring-2 hover:ring-primary"
          >
            <Avatar className="h-10 w-10 border border-white/20 md:h-9 md:w-9">
              {avatarDataUrl ? (
                <AvatarImage src={avatarDataUrl} alt="" />
              ) : null}
              <AvatarFallback className="bg-dash-sidebar-hover font-heading text-xs font-bold text-dash-sidebar-fg">
                {initialsFromName(fullName)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-dash-sidebar-fg md:text-[13px]">
              {fullName}
            </p>
            <p className="truncate text-xs text-dash-sidebar-fg/50 md:text-[11px]">
              {role}
            </p>
          </div>
        </div>
      </div>

      <nav
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden p-3 md:p-2 md:pt-2"
        aria-label="Dashboard"
      >
        {dashboardNavItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNav}
              className={sidebarNavRowClass(isActive)}
            >
              <item.icon className="h-4 w-4 shrink-0 md:h-3.5 md:w-3.5" />
              <span className="truncate">{item.label}</span>
              {item.inboxBadge && initialInboxUnread > 0 && (
                <span className="ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                  {initialInboxUnread}
                </span>
              )}
            </Link>
          );
        })}

        <button
          type="button"
          className={sidebarNavRowClass(false)}
          onClick={() => {
            handleNav();
            if (typeof window !== "undefined") {
              window.location.href = "/auth/login";
            }
          }}
        >
          <LogOut className="h-4 w-4 shrink-0 md:h-3.5 md:w-3.5" />
          <span>Logout</span>
        </button>

        <SidebarThemeRow />
      </nav>

      <div className="shrink-0 border-t border-dash-sidebar-border px-3 py-2.5 text-center text-[10px] text-dash-sidebar-fg/30 md:py-2 md:text-[9px]">
        ALDAR Dashboard v1.0
      </div>
    </div>
  );
}

export default function DashboardSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 overflow-hidden bg-gradient-to-b from-[#6366f1] to-[#2e2b6b] md:flex md:w-56 md:flex-col">
      <DashboardSidebarPanel />
    </aside>
  );
}
