import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "../index.css";
import { AppProviders } from "@/components/providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const siteDescription =
  "ALDAR Engineering Consultants — sustainable infrastructure and integrated design solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ALDAR",
    template: "%s | ALDAR",
  },
  description: siteDescription,
  icons: {
    icon: [{ url: "/aldar-logo.png", type: "image/png" }],
    apple: "/aldar-logo.png",
  },
  openGraph: {
    title: "ALDAR",
    description: siteDescription,
    url: "/",
    siteName: "ALDAR",
    images: [
      {
        url: "/aldar-logo.png",
        width: 168,
        height: 67,
        alt: "ALDAR",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ALDAR",
    description: siteDescription,
    images: ["/aldar-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${inter.variable} font-sans antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
