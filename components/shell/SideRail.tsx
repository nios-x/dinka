"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { RAIL_ITEMS, isActive } from "./nav-items";
import { useCounts } from "@/app/Providers/CountsProvider";
import { Avatar } from "@/components/ui/avatar";
import { handleOf } from "@/lib/format";
import { openComposer } from "@/components/composer/composer-bus";
import ThemeSwitch from "./ThemeSwitch";
import { DinkaMark } from "@/components/icons";

/** The desktop left rail: labeled navigation, the primary Post action, you. */
export default function SideRail() {
  const pathname = usePathname() ?? "/";
  const { data: session } = useSession();
  const counts = useCounts();
  const user = session?.user as { id?: string; name?: string | null; image?: string | null } | undefined;

  return (
    <aside className="sticky top-0 hidden h-svh w-[15rem] shrink-0 flex-col py-5 lg:flex">
      <Link
        href="/"
        className="press mb-6 flex items-center gap-2.5 rounded-full px-3 py-1 text-ink"
        aria-label="Dinka home"
      >
        <DinkaMark size={26} className="text-glaze" />
        <span className="wordmark text-[1.9rem] leading-none">dinka</span>
      </Link>

      <nav className="flex flex-col gap-0.5" aria-label="Primary">
        {RAIL_ITEMS.map((item) => {
          const active = isActive(item, pathname);
          const badge =
            item.badge === "notifications"
              ? counts.notifications
              : item.badge === "messages"
                ? counts.messages
                : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3.5 rounded-full py-2.5 pl-3.5 pr-4 text-[0.95rem] transition-colors duration-200",
                active
                  ? "bg-glaze-soft font-semibold text-glaze"
                  : "font-medium text-ink-2 hover:bg-tile hover:text-ink"
              )}
            >
              <span className="relative grid place-items-center">
                <item.Icon filled={active} size={23} />
                {badge > 0 && (
                  <span
                    className="absolute -right-1.5 -top-1 grid h-[17px] min-w-[17px] place-items-center rounded-full px-1 text-[10px] font-bold tabular-nums text-white"
                    style={{ background: "var(--ember)" }}
                  >
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => openComposer()}
        className="press mt-5 w-full rounded-full bg-glaze py-3 text-[0.95rem] font-semibold text-glaze-on shadow-[var(--shadow-glaze)] transition-colors hover:bg-glaze-hover"
      >
        Post
      </button>

      <div className="mt-auto flex items-center gap-2 pt-6">
        <Link
          href={`/profile?id=${user?.id ?? ""}`}
          className="press flex min-w-0 flex-1 items-center gap-2.5 rounded-full p-1.5 transition-colors hover:bg-tile"
        >
          <Avatar src={user?.image} name={user?.name} userId={user?.id} size="md" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[0.875rem] font-semibold text-ink">
              {user?.name ?? "Your profile"}
            </span>
            <span className="meta block truncate">@{handleOf(user as never)}</span>
          </span>
        </Link>
        <ThemeSwitch />
      </div>
    </aside>
  );
}
