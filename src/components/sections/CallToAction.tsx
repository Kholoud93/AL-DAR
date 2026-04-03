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
        "relative overflow-hidden bg-gradient-to-r from-aldar-navy via-[#152a8a] to-aldar-navy py-16 sm:py-20",
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
        <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/85">
          {cta.subtitle}
        </p>
        <Button
          asChild
          size="lg"
          className="mt-10 gap-2 bg-white px-8 text-aldar-navy hover:bg-white/90"
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
