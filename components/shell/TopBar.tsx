"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { BellIcon, DinkaMark } from "@/components/icons";
import { useCounts } from "@/app/Providers/CountsProvider";
import { openPalette } from "@/components/composer/composer-bus";
import { cn } from "@/lib/utils";

/**
 * The phone top bar.
 *
 * It hides on scroll-down and returns on scroll-up: on a 6-inch screen the
 * 56px of chrome is worth more as content while you are reading, and worth more
 * as navigation the moment you reverse.
 */
export default function TopBar() {
  const pathname = usePathname() ?? "/";
  const counts = useCounts();
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - last;
        // Ignore jitter and rubber-banding at the very top.
        if (Math.abs(delta) > 6) {
          setHidden(delta > 0 && y > 72);
          last = y;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // The rail already carries all of this on desktop.
  return (
    <header
      className={cn(
        "frost sticky top-0 z-40 border-b border-line transition-transform duration-300 lg:hidden",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
      style={{ transitionTimingFunction: "var(--ease-out)" }}
    >
      <div className="flex h-14 items-center justify-between gap-2 px-4">
        <Link href="/" className="press flex items-center gap-2 text-ink" aria-label="Dinka home">
          <DinkaMark size={23} className="text-glaze" />
          <span className="wordmark text-[1.7rem] leading-none">dinka</span>
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => openPalette()}
            aria-label="Search Dinka"
            className="press grid h-10 w-10 place-items-center rounded-full text-ink-2 transition-colors active:bg-tile-sunk"
          >
            <Search size={21} strokeWidth={1.9} />
          </button>

          <Link
            href="/notifications"
            aria-label={
              counts.notifications > 0
                ? `Notifications, ${counts.notifications} unread`
                : "Notifications"
            }
            className={cn(
              "press relative grid h-10 w-10 place-items-center rounded-full transition-colors active:bg-tile-sunk",
              pathname.startsWith("/notifications") ? "text-glaze" : "text-ink-2"
            )}
          >
            <BellIcon filled={pathname.startsWith("/notifications")} size={22} />
            {counts.notifications > 0 && (
              <span
                className="absolute right-1.5 top-1.5 grid h-[16px] min-w-[16px] place-items-center rounded-full px-[3px] text-[9.5px] font-bold tabular-nums text-white ring-2"
                style={{ background: "var(--ember)", ["--tw-ring-color" as never]: "var(--ground)" }}
              >
                {counts.notifications > 9 ? "9+" : counts.notifications}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
