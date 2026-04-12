import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/SitePageShell";

export const metadata: Metadata = {
  title: "Clients | ALDAR",
  description: "ALDAR clients and partners",
};

export default function ClientsPage() {
  return <SitePageShell title="Clients" />;
}
