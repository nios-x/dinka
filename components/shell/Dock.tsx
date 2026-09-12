"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DOCK_ITEMS, isActive } from "./nav-items";
import { useCounts } from "@/app/Providers/CountsProvider";
import { Avatar } from "@/components/ui/avatar";
import { ComposeIcon } from "@/components/icons";
import { openComposer } from "@/components/composer/composer-bus";

/**
 * The phone dock.
 *
 * A floating glazed pill inside thumb reach, not a full-width bar welded to the
 * bottom edge. The active tab is marked by a glaze pebble that travels between
 * slots — one shared layout animation, so the indicator slides rather than
 * five separate fades. Compose is the raised center slot.
 */
export default function Dock() {
  const pathname = usePathname() ?? "/";
  const { data: session } = useSession();
  const counts = useCounts();
  const user = session?.user as { id?: string; name?: string | null; image?: string | null } | undefined;

  const profileActive = pathname.startsWith("/profile");
  const left = DOCK_ITEMS.slice(0, 2);
  const right = DOCK_ITEMS.slice(2);

  return (
    // The gap under the dock is the home-indicator inset plus a fixed lift, in
    // one declaration. `safe-b` alongside `pb-5` would have overridden it to
    // the bare inset — nothing at all on a phone without a notch.
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[calc(env(safe-area-inset-bottom,0px)+1.75rem)] lg:hidden">
      <nav
        aria-label="Primary"
        className="frost-tile pointer-events-auto flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 shadow-[var(--shadow-lg)]"
      >
        {left.map((item) => (
          <DockLink
            key={item.href}
            href={item.href}
            label={item.label}
            active={isActive(item, pathname)}
            badge={item.badge === "messages" ? counts.messages : 0}
            Icon={item.Icon}
          />
        ))}

        <button
          type="button"
          onClick={() => openComposer()}
          aria-label="Create a post"
          className="press mx-1 grid h-[52px] w-[52px] place-items-center rounded-full bg-glaze text-glaze-on shadow-[var(--shadow-glaze)] transition-colors active:bg-glaze-press"
        >
          <ComposeIcon size={25} />
        </button>

        {right.map((item) => (
          <DockLink
            key={item.href}
            href={item.href}
            label={item.label}
            active={isActive(item, pathname)}
            badge={item.badge === "messages" ? counts.messages : 0}
            Icon={item.Icon}
          />
        ))}

        <Link
          href={`/profile?id=${user?.id ?? ""}`}
          aria-label="Your profile"
          aria-current={profileActive ? "page" : undefined}
          className="press relative grid h-[46px] w-[46px] place-items-center rounded-full"
        >
          {profileActive && (
            <motion.span
              layoutId="dock-pebble"
              className="absolute inset-0 rounded-full bg-glaze-soft"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />
          )}
          <span className="relative">
            <Avatar
              src={user?.image}
              name={user?.name}
              userId={user?.id}
              size="sm"
              className={cn(
                "ring-2 transition-all",
                profileActive ? "ring-glaze" : "ring-transparent"
              )}
            />
          </span>
        </Link>
      </nav>
    </div>
  );
}

function DockLink({
  href,
  label,
  active,
  badge,
  Icon,
}: {
  href: string;
  label: string;
  active: boolean;
  badge: number;
  Icon: React.ComponentType<{ filled?: boolean; size?: number }>;
}) {
  return (
    <Link
      href={href}
      aria-label={badge > 0 ? `${label}, ${badge} unread` : label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative grid h-[46px] w-[46px] place-items-center rounded-full transition-colors duration-200",
        active ? "text-glaze" : "text-ink-3"
      )}
    >
      {active && (
        <motion.span
          layoutId="dock-pebble"
          className="absolute inset-0 rounded-full bg-glaze-soft"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="relative">
        <Icon filled={active} size={23} />
      </span>
      {badge > 0 && (
        <span
          className="absolute right-1 top-1.5 h-2.5 w-2.5 rounded-full ring-2"
          style={{ background: "var(--ember)", ["--tw-ring-color" as never]: "var(--tile)" }}
        />
      )}
    </Link>
  );
}
