"use client";

import React from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Search, Loader2, TrendingUp, Play } from "lucide-react";
import PageHeader from "@/components/shell/PageHeader";
import EmptyState from "@/components/ui/empty-state";
import { openPalette } from "@/components/composer/composer-bus";
import { compact } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ExploreIcon, PollIcon } from "@/components/icons";
import type { FeedPost } from "@/app/Providers/PostsProvider";

/**
 * Explore.
 *
 * A dense grid rather than the feed's cards — this surface is for scanning many
 * posts quickly. Media posts show their image, text posts show their words, so
 * a text-heavy community does not produce a grid of gray rectangles.
 */

const FILTERS = [
  { key: "all", label: "Top" },
  { key: "fresh", label: "Fresh" },
  { key: "media", label: "Photos" },
  { key: "reels", label: "Reels" },
  { key: "polls", label: "Polls" },
] as const;

type Filter = (typeof FILTERS)[number]["key"];

export default function Page() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [posts, setPosts] = React.useState<FeedPost[]>([]);
  const [tags, setTags] = React.useState<{ tag: string; useCount: number }[]>([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const { ref, inView } = useInView({ rootMargin: "700px 0px" });
  const busy = React.useRef(false);

  const load = React.useCallback(async (p: number, f: Filter) => {
    if (busy.current) return;
    busy.current = true;
    try {
      const res = await fetch(`/api/v1/explore?page=${p}&filter=${f}`, { cache: "no-store" });
      if (!res.ok) {
        setHasMore(false);
        return;
      }
      const data = await res.json();
      setPosts((prev) => {
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
  }, []);

  React.useEffect(() => {
    setLoading(true);
    setPosts([]);
    setPage(0);
    setHasMore(true);
    void load(0, filter);
  }, [filter, load]);

  React.useEffect(() => {
    fetch("/api/v1/trending?limit=12")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setTags(d?.tags ?? []))
      .catch(() => setTags([]));
  }, []);

  React.useEffect(() => {
    if (inView && hasMore && !loading) void load(page, filter);
  }, [inView, hasMore, loading, page, filter, load]);

  return (
    <>
      <PageHeader title="Explore" subtitle="Public posts from across Dinka">
        <button
          type="button"
          onClick={() => openPalette()}
          className="press flex w-full items-center gap-2.5 rounded-full border border-line bg-tile px-4 py-2.5 text-left text-[0.875rem] text-ink-3 transition-colors hover:border-line-strong"
        >
          <Search size={16} strokeWidth={2} />
          Search people, posts and tags
        </button>
      </PageHeader>

      {tags.length > 0 && (
        <div className="rail flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-saffron-soft px-2.5 py-1.5 text-[0.75rem] font-bold text-saffron">
            <TrendingUp size={13} strokeWidth={2.5} />
            Trending
          </span>
          {tags.map((t) => (
            <Link
              key={t.tag}
              href={`/tag/${encodeURIComponent(t.tag)}`}
              className="press shrink-0 rounded-full bg-tile-sunk px-3 py-1.5 text-[0.8rem] font-semibold text-ink-2 transition-colors hover:text-ink"
            >
              #{t.tag}
              <span className="ml-1.5 text-[0.7rem] font-medium tabular-nums text-ink-4">
                {compact(t.useCount)}
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="rail flex gap-1.5 border-b border-line px-4 py-2.5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn(
              "press shrink-0 rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold transition-colors",
              filter === f.key
                ? "bg-glaze text-glaze-on"
                : "bg-tile-sunk text-ink-2 hover:text-ink"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && posts.length === 0 ? (
        <div className="grid grid-cols-2 gap-1.5 p-1.5 sm:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="skeleton aspect-square rounded-[var(--r-chip)]" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <EmptyState
          icon={<ExploreIcon size={26} />}
          title="Nothing to explore yet"
          body="Once people start posting publicly, their posts land here."
          action={{ label: "Back to your feed", href: "/" }}
        />
      ) : (
        <div className="grid grid-cols-2 gap-1.5 p-1.5 sm:grid-cols-3">
          {posts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: Math.min(i, 9) * 0.025, ease: [0.16, 1, 0.3, 1] }}
              // Every third tile runs tall, which breaks the grid's monotony.
              className={cn(i % 7 === 3 && "row-span-2")}
            >
              <Tile post={p} tall={i % 7 === 3} />
            </motion.div>
          ))}
        </div>
      )}

      <div ref={ref} aria-hidden className="h-px" />
      {hasMore && posts.length > 0 && (
        <div className="flex justify-center py-8 text-ink-3">
          <Loader2 size={20} className="animate-spin" />
        </div>
      )}
    </>
  );
}

function Tile({ post, tall }: { post: FeedPost; tall: boolean }) {
  const isVideo =
    (post.mediaType ?? "").startsWith("video") || /\.(mp4|webm|mov)(\?|$)/i.test(post.mediaurl ?? "");

  return (
    <Link
      href={`/postid/${post.id}`}
      className={cn(
        "group relative block h-full w-full overflow-hidden rounded-[var(--r-chip)] bg-tile-sunk",
        !tall && "aspect-square"
      )}
    >
      {post.isMedia && post.mediaurl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.mediaurl}
            alt={post.title?.slice(0, 80) || "Post"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {isVideo && (
            <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm">
              <Play size={12} fill="currentColor" />
            </span>
          )}
        </>
      ) : (
        <div className="flex h-full w-full flex-col justify-between bg-tile p-3">
          {post.poll && <PollIcon size={16} className="text-glaze dark:text-teal" />}
          <p className="line-clamp-5 text-[0.82rem] font-medium leading-snug text-ink">
            {post.title}
          </p>
          <p className="meta truncate">{post.author?.name ?? "Someone"}</p>
        </div>
      )}

      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/65 to-transparent p-2 pt-6 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="text-[0.72rem] font-bold tabular-nums text-white">
          {compact(Object.values(post.reactionCounts).reduce((a, b) => a + (b ?? 0), 0) + post.likes)}
        </span>
        <span className="text-[0.72rem] font-bold tabular-nums text-white/85">
          {compact(post.commentCount)} replies
        </span>
      </span>
    </Link>
  );
}
