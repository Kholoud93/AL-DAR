import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../index.css";
import { AppProviders } from "@/components/providers";
import Header from "@/components/layout/Header";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          <Header />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
