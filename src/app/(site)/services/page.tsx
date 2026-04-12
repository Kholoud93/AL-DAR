import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/SitePageShell";

export const metadata: Metadata = {
  title: "Services | ALDAR",
  description: "ALDAR engineering and project services",
};

export default function ServicesPage() {
  return <SitePageShell title="Services" />;
}
