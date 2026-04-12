import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/SitePageShell";

export const metadata: Metadata = {
  title: "Certificates | ALDAR",
  description: "ALDAR accreditations and certificates",
};

export default function CertificatesPage() {
  return <SitePageShell title="Certificates" />;
}
