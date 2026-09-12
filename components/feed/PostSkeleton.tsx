import React from "react";

/**
 * Feed placeholder. It mirrors the real card's geometry — same avatar size,
 * same padding, same media ratio — so content does not jump when it lands.
 */
export default function PostSkeleton({ media = true }: { media?: boolean }) {
  return (
    <div className="border-b border-line bg-tile p-4 sm:mb-3 sm:rounded-[var(--r-tile)] sm:border">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3.5 w-32 rounded-full" />
          <div className="skeleton h-2.5 w-20 rounded-full" />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="skeleton h-3 w-full rounded-full" />
        <div className="skeleton h-3 w-[88%] rounded-full" />
        <div className="skeleton h-3 w-[56%] rounded-full" />
      </div>

      {media && <div className="skeleton mt-4 w-full rounded-[var(--r-tile)]" style={{ aspectRatio: "4 / 5" }} />}

      <div className="mt-4 flex gap-4">
        <div className="skeleton h-8 w-16 rounded-full" />
        <div className="skeleton h-8 w-16 rounded-full" />
        <div className="skeleton h-8 w-10 rounded-full" />
      </div>
    </div>
  );
}

export function FeedSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading posts…</span>
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} media={i % 2 === 0} />
      ))}
    </div>
  );
}
