import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Globe2,
  Handshake,
  Mail,
  Tags,
  Users,
  Wrench,
} from "lucide-react";

export const DASHBOARD_BASE = "/dashboard";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** When true, show unread badge if count > 0 (Inbox) */
  inboxBadge?: boolean;
};

export const dashboardNavItems: DashboardNavItem[] = [
  { href: `${DASHBOARD_BASE}/projects`, label: "Projects", icon: Building2 },
  { href: `${DASHBOARD_BASE}/countries`, label: "Countries", icon: Globe2 },
  { href: `${DASHBOARD_BASE}/team`, label: "Team", icon: Users },
  { href: `${DASHBOARD_BASE}/clients`, label: "Clients", icon: Handshake },
  {
    href: `${DASHBOARD_BASE}/service-fields`,
    label: "Service Fields",
    icon: Wrench,
  },
  { href: `${DASHBOARD_BASE}/service-types`, label: "Service Types", icon: Tags },
  {
    href: `${DASHBOARD_BASE}/inbox`,
    label: "Inbox",
    icon: Mail,
    inboxBadge: true,
  },
];
