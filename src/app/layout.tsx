import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../index.css";
import { AppProviders } from "@/components/providers";

export const metadata: Metadata = {
  title: "ALDAR",
  description: "ALDAR web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
