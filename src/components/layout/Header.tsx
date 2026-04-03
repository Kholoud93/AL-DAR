"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/hooks/useLanguage";
import type { HomeTranslations } from "@/lang/types";
import { cn } from "@/lib/utils";
import logoSrc from "@/assets/landing-imgs/ALDAR-Logo.png";

const NAV_ITEMS = [
  { href: "/", labelKey: "home" as const },
  { href: "/about", labelKey: "aboutUs" as const },
  { href: "/services", labelKey: "services" as const },
  { href: "/projects", labelKey: "projects" as const },
  { href: "/clients", labelKey: "clients" as const },
  { href: "/certificates", labelKey: "certificates" as const },
];

function NavLinks({
  nav,
  pathname,
  className,
  onNavigate,
  variant = "desktop",
}: {
  nav: HomeTranslations["nav"];
  pathname: string | null;
  className?: string;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
}) {
  return (
    <nav
      className={cn(
        variant === "desktop" &&
          "hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm lg:flex lg:gap-x-8",
        variant === "mobile" && "flex flex-col gap-1",
        className,
      )}
    >
      {NAV_ITEMS.map(({ href, labelKey }) => {
        const label = nav[labelKey];
        const isActive =
          href === "/"
            ? pathname === "/"
            : pathname === href || pathname?.startsWith(`${href}/`);

        return (
          <Link
            key={href + labelKey}
            href={href}
            onClick={onNavigate}
            className={cn(
              "transition-colors",
              variant === "desktop" &&
                "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-title)]",
              variant === "mobile" &&
                "rounded-md px-3 py-3 text-base text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-title)]",
              isActive &&
                variant === "desktop" &&
                "font-semibold text-[color:var(--color-brand-primary)] underline decoration-[color:var(--color-brand-primary)]/70 underline-offset-4 hover:text-[color:var(--color-brand-primary)]",
              isActive &&
                variant === "mobile" &&
                "font-semibold text-[color:var(--color-brand-primary)] underline decoration-[color:var(--color-brand-primary)]/70 underline-offset-4",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { language, toggleLanguage, dir, translations } = useLanguage();
  const { ToggleIcon, toggleTheme, mounted } = useTheme();

  const handleThemeToggle = () => {
    if (!mounted) return;
    toggleTheme();
  };

  const nav = translations.home.nav;
  const meta = translations.home.meta;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const menuTitle = language === "ar" ? "القائمة" : "Menu";

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 w-full border-b border-border/80 bg-background/95 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] backdrop-blur-md transition-colors dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
        dir={dir}
      >
        <div className="mx-auto flex min-h-16 w-full max-w-screen-xl items-center justify-between gap-3 px-6 py-3 sm:min-h-20 sm:gap-4 sm:py-4">
          <Link href="/" className="relative flex h-10 shrink-0 items-center">
            {!logoFailed ? (
              <Image
                src={logoSrc}
                alt="ALDAR"
                width={168}
                height={67}
                priority
                className="h-9 w-auto max-w-[min(168px,45vw)] object-contain object-left"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <span className="text-lg font-bold text-[color:var(--color-text-title)]">
                ALDAR
              </span>
            )}
          </Link>

          <NavLinks variant="desktop" nav={nav} pathname={pathname} />

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <button
              type="button"
              className="text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text-title)] [&_svg]:pointer-events-auto"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              className="text-sm text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text-title)]"
              aria-label={`Language: ${meta.languageName}`}
            >
              {language === "en" ? "AR" : "EN"}
            </button>

            <button
              type="button"
              onClick={handleThemeToggle}
              className="text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text-title)] [&_svg]:pointer-events-auto"
              aria-label="Theme"
            >
              <ToggleIcon className="h-5 w-5" />
            </button>

            <Button
              asChild
              size="sm"
              variant="secondary"
              className="hidden h-9 min-w-32 rounded-none bg-[color:var(--color-brand-primary-hover)] px-6 text-[color:var(--color-brand-on-primary)] hover:bg-[color:var(--color-brand-primary)] sm:inline-flex lg:min-w-36"
            >
              <Link href="/contact">{nav.contactUs}</Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-surface-elevated)] hover:text-[color:var(--color-text-title)] lg:hidden [&_svg]:pointer-events-auto"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={dir === "rtl" ? "left" : "right"}
                className="flex w-full flex-col gap-6 border-border bg-background text-foreground sm:max-w-sm"
              >
                <SheetHeader className="flex flex-row items-center gap-2 text-start">
                  <SheetTitle>{menuTitle}</SheetTitle>
                  <div className="ms-auto flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 rounded-full"
                      aria-label="Search"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={toggleLanguage}
                      className="h-9 w-9 rounded-full text-[11px] font-semibold"
                      aria-label={`Language: ${meta.languageName}`}
                    >
                      {language === "en" ? "AR" : "EN"}
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={handleThemeToggle}
                      className="h-9 w-9 rounded-full"
                      aria-label="Theme"
                    >
                      <ToggleIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </SheetHeader>
                <NavLinks
                  variant="mobile"
                  nav={nav}
                  pathname={pathname}
                  onNavigate={() => setMobileOpen(false)}
                />
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    {nav.contactUs}
                  </Link>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      {/* Reserve space so page content is not hidden under the fixed bar */}
      <div className="h-16 shrink-0 sm:h-20" aria-hidden />
    </>
  );
}
