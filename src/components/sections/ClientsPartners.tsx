"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

type ClientsPartnersProps = {
  className?: string;
};

const PLACEHOLDERS = [1, 2, 3, 4, 5, 6];

export default function ClientsPartners({ className }: ClientsPartnersProps) {
  const { translations, dir } = useLanguage();
  const { clients } = translations.home;

  return (
    <section
      dir={dir}
      className={cn(
        "bg-aldar-light py-16 transition-colors sm:py-20 dark:bg-muted/40",
        className,
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          {clients.sectionLabel}
        </p>
        <h2 className="mt-2 max-w-3xl font-heading text-xl font-semibold leading-snug text-foreground sm:text-2xl md:text-3xl">
          {clients.title}
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:justify-between">
          {PLACEHOLDERS.map((n) => (
            <div
              key={n}
              className="flex h-11 min-w-[6.5rem] items-center justify-center rounded-md bg-card px-4 text-xs font-medium text-muted-foreground shadow-sm ring-1 ring-border/60"
            >
              Partner {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
