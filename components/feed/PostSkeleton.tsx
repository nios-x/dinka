import React from "react";

/**
 * Feed placeholder. It mirrors the real card's geometry — edge to edge, same
 * avatar size, same padding, same full-bleed media ratio — so nothing shifts
 * when the posts land.
 */
export default function PostSkeleton({ media = true }: { media?: boolean }) {
  return (
    <div className="card rounded-none border-x-0 border-t-0 p-4 shadow-none">
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

      {/* Full-bleed, like the real card's media: the negative margin cancels
          the card padding rather than the media being inset inside it. */}
      {media && <div className="skeleton -mx-4 mt-4" style={{ aspectRatio: "4 / 5" }} />}

      <div className="mt-4 flex gap-4">
        <div className="skeleton h-8 w-16 rounded-full" />
        <div className="skeleton h-8 w-16 rounded-full" />
        <div className="skeleton h-8 w-10 rounded-full" />
      </div>
    </div>
  );
}

/** Edge to edge, like Feed, so the switch from placeholder to posts is still. */
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
