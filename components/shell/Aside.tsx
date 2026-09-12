"use client";

import React from "react";
import Link from "next/link";
import { Search, TrendingUp } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { openPalette } from "@/components/composer/composer-bus";
import { compact, handleOf } from "@/lib/format";
import { toast } from "sonner";

/**
 * The desktop right sidebar: the two things worth the extra column — what is
 * being talked about, and who to follow next. Both fail quiet: a sidebar that
 * cannot load its data renders nothing rather than a broken panel.
 */

type Tag = { tag: string; useCount: number; recent?: number };
type Person = { id: string; name: string | null; username?: string | null; pic?: string | null; bio?: string | null };

export default function Aside() {
  const [tags, setTags] = React.useState<Tag[] | null>(null);
  const [people, setPeople] = React.useState<Person[] | null>(null);
  const [pending, setPending] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [t, p] = await Promise.all([
          fetch("/api/v1/trending?limit=5").then((r) => (r.ok ? r.json() : null)),
          fetch("/api/v1/friends/find?limit=4").then((r) => (r.ok ? r.json() : null)),
        ]);
        if (!alive) return;
        setTags(t?.tags ?? []);
        setPeople((p?.people ?? []).slice(0, 4));
      } catch {
        if (alive) {
          setTags([]);
          setPeople([]);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const follow = async (person: Person) => {
    setPending((s) => ({ ...s, [person.id]: true }));
    try {
      const res = await fetch("/api/v1/friends/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendId: person.id }),
      });
      if (!res.ok) throw new Error();
      setPeople((list) => (list ?? []).filter((p) => p.id !== person.id));
      toast.success(`Following ${person.name ?? "them"}`);
    } catch {
      toast.error("Could not follow — try again");
    } finally {
      setPending((s) => ({ ...s, [person.id]: false }));
    }
  };

  return (
    <aside className="sticky top-0 hidden h-svh w-[20rem] shrink-0 flex-col gap-4 overflow-y-auto py-5 pb-10 xl:flex">
      <button
        type="button"
        onClick={() => openPalette()}
        className="press flex w-full items-center gap-2.5 rounded-full border border-line bg-tile px-4 py-2.5 text-left text-sm text-ink-3 transition-colors hover:border-line-strong"
      >
        <Search size={17} strokeWidth={2} />
        <span className="flex-1">Search Dinka</span>
        <kbd className="meta rounded border border-line bg-tile-sunk px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </button>

      {tags && tags.length > 0 && (
        <section className="tile p-1.5">
          <h2 className="flex items-center gap-2 px-3 pb-1 pt-2.5 text-[0.95rem] font-semibold text-ink">
            <TrendingUp size={16} strokeWidth={2.2} className="text-saffron" />
            Trending
          </h2>
          <ul>
            {tags.map((t, i) => (
              <li key={t.tag}>
                <Link
                  href={`/tag/${encodeURIComponent(t.tag)}`}
                  className="flex items-baseline justify-between gap-3 rounded-[var(--r-field)] px-3 py-2.5 transition-colors hover:bg-tile-sunk"
                >
                  <span className="min-w-0">
                    <span className="meta block">#{i + 1} trending</span>
                    <span className="block truncate text-[0.9rem] font-semibold text-ink">#{t.tag}</span>
                  </span>
                  <span className="meta shrink-0">{compact(t.useCount)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {people && people.length > 0 && (
        <section className="tile p-1.5">
          <h2 className="px-3 pb-1 pt-2.5 text-[0.95rem] font-semibold text-ink">Who to follow</h2>
          <ul>
            {people.map((p) => (
              <li key={p.id} className="flex items-center gap-2.5 px-3 py-2.5">
                <Avatar src={p.pic} name={p.name} userId={p.id} size="md" href={`/profile?id=${p.id}`} />
                <Link href={`/profile?id=${p.id}`} className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[0.875rem] font-semibold text-ink">
                    {p.name ?? "Someone"}
                  </span>
                  <span className="meta block truncate">@{handleOf(p)}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => follow(p)}
                  disabled={pending[p.id]}
                  className="press shrink-0 rounded-full bg-glaze px-3.5 py-1.5 text-xs font-semibold text-glaze-on transition-colors hover:bg-glaze-hover disabled:opacity-50"
                >
                  {pending[p.id] ? "…" : "Follow"}
                </button>
              </li>
            ))}
          </ul>
          <Link
            href="/people/find"
            className="block rounded-[var(--r-field)] px-3 py-2.5 text-[0.85rem] font-medium text-glaze transition-colors hover:bg-glaze-softer"
          >
            Show more
          </Link>
        </section>
      )}

      <nav className="meta flex flex-wrap gap-x-3 gap-y-1.5 px-3 leading-relaxed">
        <Link href="/settings" className="hover:text-ink-2">Settings</Link>
        <Link href="/explore" className="hover:text-ink-2">Explore</Link>
        <Link href="/insights" className="hover:text-ink-2">Insights</Link>
        <span className="text-ink-4">© {new Date().getFullYear()} Dinka</span>
      </nav>
    </aside>
  );
}
