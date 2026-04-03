"use client";

import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import arabContractorsLogo from "@/assets/icons/Arab Contractors.svg";
import orascomLogo from "@/assets/icons/Orascom Construction.svg";
import worldBankLogo from "@/assets/icons/World Bank Group.svg";

type ClientsPartnersProps = {
  className?: string;
};

const PARTNER_LOGOS = [
  {
    key: "arab-contractors",
    src: arabContractorsLogo,
    alt: "Arab Contractors",
  },
  {
    key: "orascom-construction",
    src: orascomLogo,
    alt: "Orascom Construction",
  },
  {
    key: "world-bank-group",
    src: worldBankLogo,
    alt: "World Bank Group",
  },
] as const;

export default function ClientsPartners({ className }: ClientsPartnersProps) {
  const { translations, dir } = useLanguage();
  const { clients } = translations.home;

  return (
    <section
      dir={dir}
      className={cn(
        "bg-[color:var(--color-surface-subtle)] py-16 transition-colors sm:py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span className="h-px w-10 bg-border/80 sm:w-14" aria-hidden />
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--color-text-label)]">
              {clients.sectionLabel}
            </p>
            <span className="h-px w-10 bg-border/80 sm:w-14" aria-hidden />
          </div>

          <h2 className="mt-5 font-sans text-3xl font-bold leading-tight text-[color:var(--color-text-title)] sm:text-4xl lg:text-5xl">
            {clients.title}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:mt-20 lg:gap-x-12">
          {PARTNER_LOGOS.map((partner) => (
            <article
              key={partner.key}
              className="flex h-24 w-24 items-center justify-center border border-dashed border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-card)] p-3 sm:h-28 sm:w-28"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={96}
                height={96}
                className="h-auto max-h-16 w-auto max-w-16 object-contain sm:max-w-20"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
