"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

type CallToActionProps = {
  className?: string;
};

export default function CallToAction({ className }: CallToActionProps) {
  const { translations, dir, isRTL } = useLanguage();
  const { cta } = translations.home;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      dir={dir}
      className={cn(
        "relative overflow-hidden bg-gradient-to-r from-aldar-navy via-[#23246f] to-aldar-navy py-20 sm:py-24 lg:py-28",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, rgba(45,91,255,0.35), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-screen-xl px-6 text-center">
        <h2 className="mx-auto max-w-4xl font-sans text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          {cta.title}
        </h2>
        <p className="mx-auto mt-7 max-w-2xl font-inter text-base text-white/45 sm:text-lg">
          {cta.subtitle}
        </p>
        <Button
          asChild
          size="lg"
          className="mt-11 h-14 rounded-none bg-white px-10 font-inter text-sm font-semibold uppercase tracking-[0.16em] text-aldar-navy hover:bg-white/90"
        >
          <Link href="/contact">
            {cta.button}
            <Arrow className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  );
}
