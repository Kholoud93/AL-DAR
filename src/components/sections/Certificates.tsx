"use client";

import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

import qualityIcon from "@/assets/icons/certificate-quality.svg";
import environmentIcon from "@/assets/icons/certificate-environment.svg";
import safetyIcon from "@/assets/icons/certificate-safety.svg";
import excellenceIcon from "@/assets/icons/certificate-excellence.svg";

type CertificatesProps = {
  className?: string;
};

const CERTIFICATE_META = [
  {
    key: "iso9001" as const,
    subtitleLines: ["Quality Management", "System"] as const,
    icon: qualityIcon,
  },
  {
    key: "iso14001" as const,
    subtitleLines: ["Environmental", "Management"] as const,
    icon: environmentIcon,
  },
  {
    key: "iso45001" as const,
    subtitleLines: ["Occupational Health &", "Safety"] as const,
    icon: safetyIcon,
  },
  {
    key: "engineeringExcellence" as const,
    subtitleLines: ["National Consulting", "Award"] as const,
    icon: excellenceIcon,
  },
] as const;

export default function Certificates({ className }: CertificatesProps) {
  const { translations, dir } = useLanguage();
  const { certificates } = translations.home;

  return (
    <section
      dir={dir}
      className={cn(
        "border-b border-border/70 bg-[color:var(--color-surface-subtle)] py-16 sm:py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="text-center">
          <p className="font-inter text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-label)] sm:text-sm">
            {certificates.sectionLabel}
          </p>
          <h2 className="mt-3 font-sans text-3xl font-bold leading-tight text-[color:var(--color-text-title)] sm:text-4xl lg:text-5xl">
            {certificates.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:gap-7 lg:[grid-template-columns:repeat(4,minmax(0,1fr))]">
          {CERTIFICATE_META.map(({ key, subtitleLines, icon }) => (
            <article
              key={key}
              className="flex min-h-56 flex-col items-center justify-center rounded-sm border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-card)] px-6 py-8 text-center shadow-[0_2px_10px_rgba(46,43,107,0.03)] sm:px-8 sm:py-9"
            >
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--color-surface-elevated)]">
                <Image
                  src={icon}
                  alt={certificates.items[key]}
                  width={30}
                  height={30}
                  className="h-8 w-8"
                />
              </div>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.02em] text-[color:var(--color-text-title)] sm:text-base lg:text-base">
                {certificates.items[key]}
              </h3>
              <p className="mt-2 max-w-[18ch] font-inter text-xs font-semibold uppercase leading-relaxed tracking-[0.15em] text-[color:var(--color-text-muted)] sm:text-xs lg:text-xs">
                <span className="block">{subtitleLines[0]}</span>
                <span className="block">{subtitleLines[1]}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
