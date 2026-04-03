import type { ReactNode } from "react";

type SitePageShellProps = {
  title: string;
  children?: ReactNode;
};

export function SitePageShell({ title, children }: SitePageShellProps) {
  return (
    <main className="container mx-auto max-w-screen-xl px-6 py-16 sm:py-20 lg:py-24">
      <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
        {title}
      </h1>
      {children}
    </main>
  );
}
