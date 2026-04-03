import type { ReactNode } from "react";

type SitePageShellProps = {
  title: string;
  children?: ReactNode;
};

export function SitePageShell({ title, children }: SitePageShellProps) {
  return (
    <main className="container mx-auto max-w-[1280px] px-6 py-24">
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      {children}
    </main>
  );
}
