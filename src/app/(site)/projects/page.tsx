import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/SitePageShell";

export const metadata: Metadata = {
  title: "Projects | ALDAR",
  description: "ALDAR projects portfolio",
};

export default function ProjectsPage() {
  return <SitePageShell title="Projects" />;
}
