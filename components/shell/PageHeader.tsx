"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The header every interior surface uses.
 *
 * Sticky below the phone top bar and at the top of the column on desktop, with
 * an optional back control and a slot for surface-specific actions.
 */
export default function PageHeader({
  title,
  subtitle,
  back = false,
  actions,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  actions?: React.ReactNode;
  /** A row rendered under the title — filters, tabs, a search field. */
  children?: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-14 z-30 border-b border-line bg-tile/85 backdrop-blur-xl lg:top-0",
        className
      )}
    >
      <div className="flex items-center gap-2 px-3 py-2.5 sm:px-4">
        {back && (
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="press -ml-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-2 transition-colors hover:bg-tile-sunk hover:text-ink"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[1.15rem] font-bold tracking-[-0.02em] text-ink">{title}</h1>
          {subtitle && <p className="meta truncate">{subtitle}</p>}
        </div>

        {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
      </div>

      {children && <div className="px-3 pb-2.5 sm:px-4">{children}</div>}
    </header>
  );
}
