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
 *
 * It measures itself into `--page-header-h`, which is what lets a second
 * sticky row on the same surface — the profile's tab bar — park directly
 * beneath it instead of at the same offset, hidden behind it.
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
  const ref = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const publish = () => root.style.setProperty("--page-header-h", `${el.offsetHeight}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    // The value is deliberately left in place on unmount. During a route
    // change both headers can be mounted at once, and clearing it here would
    // wipe the incoming header's measurement and drop the offset to zero.
    return () => ro.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className={cn(
        "glass-bar sticky top-14 z-30 border-b border-line lg:top-0",
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
