"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Light and dark are both first-class here, so the switch is a real toggle with
 * a sliding thumb rather than an icon that swaps on click — you can see which
 * state you are in before you press it.
 */
export default function ThemeSwitch({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const dark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? dark : false}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn(
        "press relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-tile text-ink-2 transition-colors hover:text-ink",
        className
      )}
    >
      {/* Before hydration both glyphs are hidden so no wrong icon flashes. */}
      <Sun
        size={17}
        className={cn(
          "absolute transition-all duration-300",
          mounted && !dark ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}
      />
      <Moon
        size={17}
        className={cn(
          "absolute transition-all duration-300",
          mounted && dark ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}
      />
    </button>
  );
}
