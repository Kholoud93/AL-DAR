import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-6 md:flex-row md:items-center md:justify-between md:gap-0">
      <div className="min-w-0">
        <h1 className="font-heading text-2xl font-bold text-foreground md:text-xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground md:text-xs">
            {description}
          </p>
        )}
      </div>
      {action ? (
        <div className="flex w-full shrink-0 justify-stretch md:w-auto md:justify-end [&_button]:w-full md:[&_button]:w-auto">
          {action}
        </div>
      ) : null}
    </div>
  );
}
