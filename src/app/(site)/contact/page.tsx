import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/SitePageShell";

export const metadata: Metadata = {
  title: "Contact Us | ALDAR",
  description: "Contact ALDAR Engineering Consultants",
};

export default function ContactPage() {
  return <SitePageShell title="Contact Us" />;
}
