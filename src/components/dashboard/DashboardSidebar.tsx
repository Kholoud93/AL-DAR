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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ThemeSwitch } from "../ui/theme-switch";

const initialInboxUnread = mockMessages.filter((m) => !m.isRead).length;

export default function DashboardSidebar() {
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

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-gradient-to-b from-[#6366f1] to-[#2e2b6b]">


      <div className="flex items-center border-b border-dash-sidebar-border p-6">
        <Link
          href={DASHBOARD_BASE}
          className="inline-flex rounded-md outline-none ring-offset-2 ring-offset-[#6366f1] transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white"
          title="Overview"
        >
          <img
            src="/aldar-logo.png"
            alt="ALDAR — go to Overview"
            className="h-12 w-auto"
          />
        </Link>
      </div>

      <div className="flex items-center gap-3 border-b border-dash-sidebar-border p-4">
        <Link
          href="/dashboard/profile"
          className="shrink-0 ring-offset-2 ring-offset-transparent hover:ring-2 hover:ring-primary transition-all rounded-full"
        >
          <Avatar className="h-10 w-10 border border-white/20">
            {avatarDataUrl ? (
              <AvatarImage src={avatarDataUrl} alt="" />
            ) : null}
            <AvatarFallback className="bg-dash-sidebar-hover font-heading text-xs font-bold text-dash-sidebar-fg">
              {initialsFromName(fullName)}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-dash-sidebar-fg">
            {fullName}
          </p>
          <p className="truncate text-xs text-dash-sidebar-fg/50">{role}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {dashboardNavItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#312e81] text-white"
                  : "text-dash-sidebar-fg/70 hover:bg-[#1b1464] hover:text-white",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.inboxBadge && initialInboxUnread > 0 && (
                <span className="ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                  {initialInboxUnread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-dash-sidebar-border p-4 flex flex-col gap-3 mt-auto">
        <div className="flex items-center gap-3 ml-0" style={{marginLeft: '0.75rem'}}>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-dash-sidebar-fg hover:bg-transparent hover:text-white"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/auth/login';
              }
            }}
          >
            <LogOut className="mr-2" /> Logout
          </Button>
          <ThemeSwitch />
        </div>
        <p className="text-[10px] text-dash-sidebar-fg/30 mt-2 text-center">
          ALDAR Dashboard v1.0
        </p>
      </div>
    
    </aside>
  );
}
