"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Users, Handshake, Tags, Wrench, Mail } from "lucide-react";
import { mockMessages } from "@/data/dashboard-mock";
import { cn } from "@/lib/utils";

const base = "/dashboard";

const navItems = [
  { href: `${base}/projects`, label: "Projects", icon: Building2 },
  { href: `${base}/clients`, label: "Clients", icon: Handshake },
  { href: `${base}/team`, label: "Team", icon: Users },
  { href: `${base}/service-types`, label: "Service Types", icon: Tags },
  { href: `${base}/service-fields`, label: "Service Fields", icon: Wrench },
  { href: `${base}/inbox`, label: "Inbox", icon: Mail },
];

const initialInboxUnread = mockMessages.filter((m) => !m.isRead).length;

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-dash-sidebar-bg">
      <div className="border-b border-dash-sidebar-border p-6">
        <h1 className="font-heading text-2xl font-bold tracking-wide text-dash-sidebar-active">
          ALDAR
        </h1>
        <p className="mt-0.5 text-xs text-dash-sidebar-fg/60">الـــدار</p>
      </div>

      <div className="flex items-center gap-3 border-b border-dash-sidebar-border p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dash-sidebar-hover font-heading text-sm font-bold text-dash-sidebar-fg">
          MA
        </div>
        <div>
          <p className="text-sm font-medium text-dash-sidebar-fg">
            Prof. Mahmoud
          </p>
          <p className="text-xs text-dash-sidebar-fg/50">Administrator</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-dash-sidebar-active/15 text-dash-sidebar-active"
                  : "text-dash-sidebar-fg/70 hover:bg-dash-sidebar-hover hover:text-dash-sidebar-fg",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.href.endsWith("/inbox") && initialInboxUnread > 0 && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {initialInboxUnread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-dash-sidebar-border p-4">
        <p className="text-[10px] text-dash-sidebar-fg/30">
          ALDAR Dashboard v1.0
        </p>
      </div>
    </aside>
  );
}
