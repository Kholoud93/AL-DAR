import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/SitePageShell";

export const metadata: Metadata = {
  title: "About Us | ALDAR",
  description: "About ALDAR Engineering Consultants",
};

export default function AboutPage() {
  return <SitePageShell title="About Us" />;
}
