"use client";

import React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Search, UserPlus } from "lucide-react";
import PageHeader from "@/components/shell/PageHeader";
import EmptyState from "@/components/ui/empty-state";
import PersonRow, { type Person } from "@/components/people/PersonRow";

/**
 * Discovery.
 *
 * Accounts you do not already follow, busiest first, with a local filter so a
 * long list stays usable without another round trip.
 */
export default function Page() {
  const [people, setPeople] = React.useState<Person[] | null>(null);
  const [query, setQuery] = React.useState("");
  const [pending, setPending] = React.useState<Record<string, boolean>>({});
  const [followed, setFollowed] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    fetch("/api/v1/friends/find?limit=50", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setPeople(d?.people ?? []))
      .catch(() => setPeople([]));
  }, []);

  const follow = async (person: Person) => {
    const next = !followed[person.id];
    setPending((p) => ({ ...p, [person.id]: true }));
    setFollowed((f) => ({ ...f, [person.id]: next }));
    try {
      const res = await fetch(next ? "/api/v1/friends/follow" : "/api/v1/friends/unfollow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendId: person.id }),
      });
      if (!res.ok) throw new Error();
      toast.success(next ? `Following ${person.name ?? "them"}` : `Unfollowed ${person.name ?? "them"}`);
    } catch {
      setFollowed((f) => ({ ...f, [person.id]: !next }));
      toast.error("That didn’t work — try again");
    } finally {
      setPending((p) => ({ ...p, [person.id]: false }));
    }
  };

  const filtered = (people ?? []).filter((p) =>
    query.trim()
      ? `${p.name ?? ""} ${p.username ?? ""}`.toLowerCase().includes(query.trim().toLowerCase())
      : true
  );

  return (
    <>
      <PageHeader back title="Find people" subtitle="Accounts you don’t follow yet">
        <div className="flex items-center gap-2 rounded-full border border-line bg-tile px-4">
          <Search size={16} className="shrink-0 text-ink-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name or handle"
            aria-label="Filter people"
            className="h-10 flex-1 bg-transparent text-[0.875rem] text-ink outline-none"
          />
        </div>
      </PageHeader>

      {people === null ? (
        <div className="divide-y divide-line">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4">
              <div className="skeleton h-14 w-14 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-3.5 w-1/3 rounded-full" />
                <div className="skeleton h-3 w-2/3 rounded-full" />
              </div>
              <div className="skeleton h-9 w-20 rounded-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<UserPlus size={26} />}
          title={query ? "Nobody matches that" : "You’re following everyone"}
          body={
            query
              ? "Try part of a name or handle."
              : "There’s nobody new on Dinka right now. Check back later."
          }
          action={query ? undefined : { label: "Back to your feed", href: "/" }}
        />
      ) : (
        <ul className="divide-y divide-line">
          {filtered.map((person, i) => (
            <motion.li
              key={person.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i, 10) * 0.025, ease: [0.16, 1, 0.3, 1] }}
            >
              <PersonRow
                person={person}
                pending={pending[person.id]}
                primary={{
                  label: followed[person.id] ? "Following" : "Follow",
                  done: !!followed[person.id],
                  onClick: () => follow(person),
                }}
              />
            </motion.li>
          ))}
        </ul>
      )}
    </>
  );
}
