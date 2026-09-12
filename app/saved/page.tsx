"use client";

import React from "react";
import { Plus, Loader2, FolderOpen } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/shell/PageHeader";
import Feed from "@/components/feed/Feed";
import EmptyState from "@/components/ui/empty-state";
import { useLocalPostActions } from "@/components/feed/useLocalPostActions";
import { BookmarkIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { FeedPost } from "@/app/Providers/PostsProvider";

/**
 * Saved posts.
 *
 * A flat list by default, with optional named collections along the top. The
 * collection chips act as filters rather than separate pages, so switching
 * between them does not cost a navigation.
 */

type Collection = { id: number; name: string; count: number; cover: string | null };

export default function Page() {
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [active, setActive] = React.useState<number | null>(null);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const [creating, setCreating] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const { posts, setPosts, react, bookmark, vote, remove } = useLocalPostActions();
  const busy = React.useRef(false);

  const load = React.useCallback(
    async (p: number, collectionId: number | null) => {
      if (busy.current) return;
      busy.current = true;
      try {
        const qs = new URLSearchParams({ page: String(p) });
        if (collectionId) qs.set("collection", String(collectionId));
        const res = await fetch(`/api/v1/bookmarks?${qs}`, { cache: "no-store" });
        if (!res.ok) {
          setHasMore(false);
          return;
        }
        const data = await res.json();
        setPosts((prev: FeedPost[]) => {
          if (p === 0) return data.posts;
          const seen = new Set(prev.map((x) => x.id));
          return [...prev, ...data.posts.filter((x: FeedPost) => !seen.has(x.id))];
        });
        setHasMore(!!data.hasMore);
        setPage(p + 1);
      } catch {
        setHasMore(false);
      } finally {
        busy.current = false;
        setLoading(false);
      }
    },
    [setPosts]
  );

  React.useEffect(() => {
    setLoading(true);
    setPage(0);
    setHasMore(true);
    void load(0, active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  React.useEffect(() => {
    fetch("/api/v1/bookmarks/collections")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setCollections(d?.collections ?? []))
      .catch(() => setCollections([]));
  }, []);

  const createCollection = async () => {
    const name = newName.trim();
    if (!name) return;
    try {
      const res = await fetch("/api/v1/bookmarks/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCollections((c) => [{ id: data.collection.id, name, count: 0, cover: null }, ...c]);
      setNewName("");
      setCreating(false);
      toast.success(`Created “${name}”`);
    } catch (err: any) {
      toast.error(err?.message ?? "Could not create that collection");
    }
  };

  // Unsaving from this surface should remove the row, not just untint the icon.
  const unsave = (id: number, saved: boolean) => {
    bookmark(id, saved);
    if (!saved) setTimeout(() => setPosts((prev) => prev.filter((p) => p.id !== id)), 220);
  };

  return (
    <>
      <PageHeader
        title="Saved"
        subtitle="Only you can see this"
        actions={
          <button
            type="button"
            onClick={() => setCreating((v) => !v)}
            aria-label="New collection"
            className="press grid h-9 w-9 place-items-center rounded-full bg-tile-sunk text-ink-2 transition-colors hover:text-ink"
          >
            <Plus size={18} />
          </button>
        }
      >
        {creating && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void createCollection();
            }}
            className="mb-2 flex gap-2"
          >
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Collection name"
              maxLength={40}
              aria-label="Collection name"
              className="h-10 flex-1 rounded-full border border-line bg-tile px-4 text-[0.875rem] text-ink outline-none focus:border-glaze"
            />
            <button
              type="submit"
              className="press rounded-full bg-glaze px-4 text-[0.82rem] font-semibold text-glaze-on"
            >
              Create
            </button>
          </form>
        )}

        <div className="rail flex gap-1.5">
          <Chip active={active === null} onClick={() => setActive(null)} label="All saved" />
          {collections.map((c) => (
            <Chip
              key={c.id}
              active={active === c.id}
              onClick={() => setActive(c.id)}
              label={c.name}
              count={c.count}
            />
          ))}
        </div>
      </PageHeader>

      <div className="sm:pt-3">
        <Feed
          posts={posts}
          isLoading={loading}
          hasMore={hasMore}
          onLoadMore={() => load(page, active)}
          onReact={react}
          onBookmark={unsave}
          onDelete={remove}
          onVote={vote}
          empty={
            active === null ? (
              <EmptyState
                icon={<BookmarkIcon size={26} />}
                title="Nothing saved yet"
                body="Tap the bookmark on any post to keep it here. Only you can see what you save."
                action={{ label: "Find something to read", href: "/explore" }}
              />
            ) : (
              <EmptyState
                icon={<FolderOpen size={26} />}
                title="This collection is empty"
                body="Save a post into it from the post's menu."
                action={{ label: "Show all saved", onClick: () => setActive(null) }}
              />
            )
          }
        />
      </div>

      {loading && posts.length > 0 && (
        <div className="flex justify-center py-6 text-ink-3">
          <Loader2 size={18} className="animate-spin" />
        </div>
      )}
    </>
  );
}

function Chip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "press shrink-0 rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold transition-colors",
        active ? "bg-glaze text-glaze-on" : "bg-tile-sunk text-ink-2 hover:text-ink"
      )}
    >
      {label}
      {typeof count === "number" && (
        <span className={cn("ml-1.5 text-[0.72rem] tabular-nums", active ? "text-glaze-on/70" : "text-ink-4")}>
          {count}
        </span>
      )}
    </button>
  );
}
