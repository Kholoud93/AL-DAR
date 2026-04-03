"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import logoSrc from "@/assets/landingimgs/ALDAR-Logo.png";

const NAV_ITEMS = [
  { href: "/", labelKey: "home" as const },
  { href: "/about", labelKey: "aboutUs" as const },
  { href: "/services", labelKey: "services" as const },
  { href: "/projects", labelKey: "projects" as const },
  { href: "/clients", labelKey: "clients" as const },
  { href: "/certificates", labelKey: "certificates" as const },
//   { href: "/contact", labelKey: "contactUs" as const },
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
        variant === "desktop" && "hidden items-center gap-8 text-sm lg:flex",
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
                "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
              variant === "mobile" &&
                "rounded-md px-3 py-3 text-base text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
              isActive &&
                variant === "desktop" &&
                "font-semibold text-primary underline decoration-primary/70 underline-offset-[5px] hover:text-primary dark:text-primary dark:decoration-primary/80 dark:hover:text-primary",
              isActive &&
                variant === "mobile" &&
                "font-semibold text-primary underline decoration-primary/70 underline-offset-[5px] dark:text-primary dark:decoration-primary/80",
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

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = meta.dir;
  }, [language, meta.dir]);

  const menuTitle = language === "ar" ? "القائمة" : "Menu";

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-background/95 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] backdrop-blur-md transition-colors dark:border-white/10 dark:bg-card/95 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
      dir={dir}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
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
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              ALDAR
            </span>
          )}
        </Link>

        <NavLinks variant="desktop" nav={nav} pathname={pathname} />

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white [&_svg]:pointer-events-auto"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            aria-label={`Language: ${meta.languageName}`}
          >
            {language === "en" ? "AR" : "EN"}
          </button>

          <button
            type="button"
            onClick={handleThemeToggle}
            className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white [&_svg]:pointer-events-auto"
            aria-label="Theme"
          >
            <ToggleIcon className="h-5 w-5" />
          </button>

          <Button
            asChild
            size="sm"
            variant="secondary"
            className="hidden bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex"
          >
            <Link href="/contact">{nav.contactUs}</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white lg:hidden [&_svg]:pointer-events-auto"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={dir === "rtl" ? "left" : "right"}
              className="flex w-full flex-col gap-6 border-border bg-background text-foreground sm:max-w-sm"
            >
              <SheetHeader className="text-start">
                <SheetTitle>{menuTitle}</SheetTitle>
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
  );
}
