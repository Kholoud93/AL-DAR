"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import logoSrc from "@/assets/landing-imgs/ALDAR-Logo.png";

type FooterProps = {
  className?: string;
};

const RESOURCE_LINKS = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Sitemap" },
  { href: "#", label: "Global Offices" },
] as const;

export default function Footer({ className }: FooterProps) {
  const { translations, dir } = useLanguage();
  const { nav, footer } = translations.home;

  const navigationLinks = [
    { href: "/about", label: nav.aboutUs },
    { href: "/services", label: nav.services },
    { href: "/projects", label: nav.projects },
    { href: "/clients", label: nav.clients },
  ];

  return (
    <footer
      dir={dir}
      className={cn(
        "border-t border-border/80 bg-[color:var(--color-surface-subtle)]",
        className,
      )}
    >
      <div className="mx-auto max-w-screen-xl px-6 py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="max-w-xs">
            <Image
              src={logoSrc}
              alt="ALDAR"
              width={168}
              height={67}
              className="h-12 w-auto object-contain object-left"
            />
            <p className="mt-5 font-inter text-sm leading-relaxed text-[color:var(--color-text-muted)]">
              Leading engineering consultancy delivering sustainable
              infrastructure solutions for the future.
            </p>
          </div>

          <div>
            <h3 className="font-inter text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--color-text-title)]">
              {footer.sections.company}
            </h3>
            <ul className="mt-5 space-y-3">
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-inter text-sm text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text-title)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-inter text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--color-text-title)]">
              {footer.sections.resources}
            </h3>
            <ul className="mt-5 space-y-3">
              {RESOURCE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-inter text-sm text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text-title)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-inter text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--color-text-title)]">
              Global HQ
            </h3>
            <p className="mt-5 font-inter text-sm leading-relaxed text-[color:var(--color-text-muted)]">
              Nile City Towers, South Tower
              <br />
              Corniche El Nil, Cairo
              <br />
              Egypt
            </p>
            <div className="mt-5 flex items-center gap-4 text-[color:var(--color-text-muted)]">
              <Globe className="h-4 w-4" />
              <Mail className="h-4 w-4" />
              <Phone className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70 py-5">
        <p className="text-center font-inter text-xs text-[color:var(--color-text-muted)]">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
