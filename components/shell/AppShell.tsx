"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import SideRail from "./SideRail";
import Aside from "./Aside";
import Dock from "./Dock";
import TopBar from "./TopBar";
import CommandPalette from "./CommandPalette";
import Composer from "@/components/composer/Composer";

/**
 * The shell.
 *
 * Phone: a frosted top bar, the page, and a floating dock within thumb reach.
 * Desktop: a labeled left rail, a 39rem reading column, and a right sidebar —
 * not the phone column stretched across a monitor.
 *
 * Three route families opt out: auth pages own the whole viewport, a live call
 * is full-bleed, and a message thread supplies its own header and composer.
 */

const BARE = [/^\/login/, /^\/signup/, /^\/call\//];
/** Reachable signed out: the marketing page and the two documents it links to. */
const PUBLIC = [/^\/$/, /^\/privacy-policy/, /^\/terms-of-service/];
const NO_DOCK = [/^\/chat(\?|$)/, /^\/story\//, /^\/reels/];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { status } = useSession();

  const bare = BARE.some((r) => r.test(pathname));
  const signedIn = status === "authenticated";
  const publicRoute = bare || PUBLIC.some((r) => r.test(pathname));

  /**
   * An interior route reached while signed out.
   *
   * Without this the page renders its chrome-less shell and every request it
   * makes comes back 401, which looks like an empty account rather than a
   * missing session. Sending them to sign-in with the route in `next` means
   * they land where they were going.
   */
  React.useEffect(() => {
    if (status !== "unauthenticated" || publicRoute) return;
    router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [status, publicRoute, pathname, router]);

  // A signed-out visitor gets the marketing page with no app chrome around it.
  const chrome = signedIn && !bare;

  if (!chrome) {
    return <div className="relative z-[1] min-h-svh">{children}</div>;
  }

  const hideDock = NO_DOCK.some((r) => r.test(pathname));

  return (
    <div className="relative z-[1] min-h-svh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-glaze focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-glaze-on"
      >
        Skip to content
      </a>

      <div className="mx-auto flex w-full max-w-[92rem] justify-center gap-0 lg:gap-6 lg:px-6 xl:gap-8">
        <SideRail />

        <main
          id="main"
          className="min-w-0 flex-1 lg:max-w-[39rem] lg:border-x lg:border-line lg:bg-transparent"
        >
          <TopBar />
          <div className={hideDock ? "" : "pb-28 lg:pb-10"}>{children}</div>
        </main>

        <Aside />
      </div>

      {!hideDock && <Dock />}
      <CommandPalette />
      <Composer />
    </div>
  );
}
