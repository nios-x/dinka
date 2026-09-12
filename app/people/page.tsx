"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import PageHeader from "@/components/shell/PageHeader";
import EmptyState from "@/components/ui/empty-state";
import PersonRow, { type Person } from "@/components/people/PersonRow";
import { cn } from "@/lib/utils";

/**
 * Your people.
 *
 * Three views of the same graph: accounts you and they both follow, accounts
 * that follow you and you haven't followed back, and accounts you follow that
 * haven't followed back. The middle tab is where a new follower becomes a
 * two-way connection, so it leads with a Follow back action.
 */

const TABS = [
  { key: "mutual", label: "Mutuals", endpoint: "/api/v1/friends" },
  { key: "followers", label: "Followers", endpoint: "/api/v1/friends/requestscame" },
  { key: "following", label: "Following", endpoint: "/api/v1/friends/requested" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const isTabKey = (v: string | null): v is TabKey => TABS.some((t) => t.key === v);

export default function Page() {
  return (
    <React.Suspense fallback={<PeopleSkeleton />}>
      <People />
    </React.Suspense>
  );
}

function People() {
  // `/people?tab=followers` is where a profile's follower count links to.
  const params = useSearchParams();
  const requested = params?.get("tab") ?? null;
  const [tab, setTab] = React.useState<TabKey>(isTabKey(requested) ? requested : "mutual");
  const [lists, setLists] = React.useState<Partial<Record<TabKey, Person[]>>>({});
  const [loading, setLoading] = React.useState(true);
  const [pending, setPending] = React.useState<Record<string, boolean>>({});

  const active = TABS.find((t) => t.key === tab)!;
  const people = lists[tab];

  React.useEffect(() => {
    if (lists[tab]) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(active.endpoint, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setLists((l) => ({ ...l, [tab]: d?.people ?? [] })))
      .catch(() => setLists((l) => ({ ...l, [tab]: [] })))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const act = async (person: Person, follow: boolean) => {
    setPending((p) => ({ ...p, [person.id]: true }));
    try {
      const res = await fetch(follow ? "/api/v1/friends/follow" : "/api/v1/friends/unfollow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendId: person.id }),
      });
      if (!res.ok) throw new Error();

      // Any follow change invalidates every list, so drop the cache.
      setLists((l) => ({ [tab]: (l[tab] ?? []).filter((p) => p.id !== person.id) }));
      toast.success(
        follow ? `Following ${person.name ?? "them"}` : `Unfollowed ${person.name ?? "them"}`
      );
    } catch {
      toast.error("That didn’t work — try again");
    } finally {
      setPending((p) => ({ ...p, [person.id]: false }));
    }
  };

  return (
    <>
      <PageHeader
        title="People"
        actions={
          <Link
            href="/people/find"
            className="press flex h-9 items-center gap-1.5 rounded-full bg-glaze px-3.5 text-[0.8rem] font-semibold text-glaze-on"
          >
            <UserPlus size={15} />
            Find people
          </Link>
        }
      >
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-pressed={tab === t.key}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-[0.85rem] font-semibold transition-colors",
                tab === t.key ? "text-ink" : "text-ink-3 hover:text-ink-2"
              )}
            >
              {tab === t.key && (
                <motion.span
                  layoutId="people-tab"
                  className="absolute inset-0 rounded-full bg-tile-sunk"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{t.label}</span>
              {people && tab === t.key && (
                <span className="relative ml-1.5 text-[0.72rem] tabular-nums text-ink-3">
                  {people.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </PageHeader>

      {loading && !people ? (
        <PeopleSkeleton />
      ) : !people || people.length === 0 ? (
        <EmptyState
          icon={<UserPlus size={26} />}
          title={
            tab === "mutual"
              ? "No mutual follows yet"
              : tab === "followers"
                ? "Nobody new is following you"
                : "You’re not following anyone yet"
          }
          body={
            tab === "mutual"
              ? "When you and someone follow each other, they show up here."
              : tab === "followers"
                ? "New followers you haven’t followed back appear here."
                : "Follow a few accounts and your feed fills up."
          }
          action={{ label: "Find people to follow", href: "/people/find" }}
        />
      ) : (
        <ul className="divide-y divide-line">
          {people.map((person, i) => (
            <motion.li
              key={person.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.03, ease: [0.16, 1, 0.3, 1] }}
            >
              <PersonRow
                person={person}
                pending={pending[person.id]}
                primary={
                  tab === "followers"
                    ? { label: "Follow back", onClick: () => act(person, true) }
                    : { label: "Following", done: true, onClick: () => act(person, false) }
                }
              />
            </motion.li>
          ))}
        </ul>
      )}
    </>
  );
}

/** Mirrors PersonRow's geometry so the list does not jump when it lands. */
function PeopleSkeleton() {
  return (
    <div className="divide-y divide-line" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading people…</span>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-4">
          <div className="skeleton h-14 w-14 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-3.5 w-1/3 rounded-full" />
            <div className="skeleton h-3 w-1/2 rounded-full" />
          </div>
          <div className="skeleton h-9 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}
