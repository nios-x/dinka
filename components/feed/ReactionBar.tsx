"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { compact } from "@/lib/format";
import { REACTIONS, REACTION_MAP, totalReactions, type ReactionKey } from "@/lib/reactions";
import ReactionGlyph from "./ReactionGlyph";
import { BookmarkIcon, CommentIcon, HeartIcon, RepostIcon, ShareIcon } from "@/components/icons";

/**
 * The action row under a post.
 *
 * Tapping the reaction control toggles Like. Pressing and holding it — or
 * hovering on a pointer device — blooms the full set in an arc, which is how
 * you reach the other five without a second screen. Counts are tabular so the
 * row does not reflow as numbers change.
 */
export default function ReactionBar({
  postId,
  myReaction,
  counts,
  commentCount,
  repostCount,
  bookmarked,
  onReact,
  onBookmark,
  onShare,
  onRepost,
}: {
  postId: number;
  myReaction: ReactionKey | null;
  counts: Partial<Record<ReactionKey, number>>;
  commentCount: number;
  repostCount: number;
  bookmarked: boolean;
  onReact: (r: ReactionKey | null) => void;
  onBookmark: (saved: boolean) => void;
  onShare: () => void;
  onRepost: () => void;
}) {
  const [bloom, setBloom] = React.useState(false);
  const holdTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const held = React.useRef(false);

  const total = totalReactions(counts);
  const active = myReaction ? REACTION_MAP[myReaction] : null;

  const clearTimers = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    holdTimer.current = null;
    closeTimer.current = null;
  };

  React.useEffect(() => clearTimers, []);

  const startHold = () => {
    held.current = false;
    holdTimer.current = setTimeout(() => {
      held.current = true;
      setBloom(true);
      // A long-press that opens a menu should feel like something.
      if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(8);
    }, 320);
  };

  const endHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = null;
  };

  const choose = (key: ReactionKey) => {
    setBloom(false);
    onReact(myReaction === key ? null : key);
  };

  return (
    <div className="relative flex items-center justify-between gap-1 px-1">
      <div className="flex items-center gap-0.5">
        {/* Reaction control */}
        <div
          className="relative"
          onPointerEnter={() => {
            if (window.matchMedia("(hover: hover)").matches) {
              clearTimers();
              closeTimer.current = setTimeout(() => setBloom(true), 260);
            }
          }}
          onPointerLeave={() => {
            clearTimers();
            closeTimer.current = setTimeout(() => setBloom(false), 220);
          }}
        >
          <button
            type="button"
            onPointerDown={startHold}
            onPointerUp={endHold}
            onPointerCancel={endHold}
            onContextMenu={(e) => e.preventDefault()}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (held.current) {
                held.current = false;
                return;
              }
              onReact(myReaction ? null : "Like");
            }}
            aria-label={
              active ? `Remove your ${active.label.toLowerCase()} reaction` : "Like this post"
            }
            aria-expanded={bloom}
            className={cn(
              "press flex h-9 items-center gap-1.5 rounded-full px-2.5 transition-colors",
              active ? "bg-transparent" : "hover:bg-tile-sunk"
            )}
          >
            {active ? (
              <ReactionGlyph reaction={active.key} size={21} />
            ) : (
              <HeartIcon size={21} className="text-ink-2" />
            )}
            <span
              className="text-[0.8rem] font-semibold tabular-nums"
              style={{ color: active ? active.tint : "var(--ink-2)" }}
            >
              {total > 0 ? compact(total) : "Like"}
            </span>
          </button>

          <AnimatePresence>
            {bloom && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.94 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onPointerEnter={clearTimers}
                className="absolute bottom-[calc(100%+8px)] left-0 z-30 flex items-end gap-0.5 rounded-full border border-line bg-tile-raised p-1.5 shadow-[var(--shadow-lg)]"
                role="menu"
                aria-label="Pick a reaction"
              >
                {REACTIONS.map((r, i) => (
                  <motion.button
                    key={r.key}
                    type="button"
                    role="menuitemradio"
                    aria-checked={myReaction === r.key}
                    aria-label={r.label}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      choose(r.key);
                    }}
                    initial={{ opacity: 0, y: 12, scale: 0.6 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: i * 0.028,
                      type: "spring",
                      stiffness: 520,
                      damping: 26,
                    }}
                    whileHover={{ scale: 1.28, y: -6 }}
                    whileTap={{ scale: 1.05 }}
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-full transition-colors",
                      myReaction === r.key && "bg-tile-sunk"
                    )}
                  >
                    <ReactionGlyph reaction={r.key} size={26} />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href={`/postid/${postId}`}
          onClick={(e) => e.stopPropagation()}
          aria-label={`${commentCount} comments`}
          className="press flex h-9 items-center gap-1.5 rounded-full px-2.5 text-ink-2 transition-colors hover:bg-tile-sunk"
        >
          <CommentIcon size={20} />
          <span className="text-[0.8rem] font-semibold tabular-nums">
            {commentCount > 0 ? compact(commentCount) : "Reply"}
          </span>
        </Link>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRepost();
          }}
          aria-label="Repost or quote"
          className="press flex h-9 items-center gap-1.5 rounded-full px-2.5 text-ink-2 transition-colors hover:bg-tile-sunk hover:text-teal"
        >
          <RepostIcon size={20} />
          {repostCount > 0 && (
            <span className="text-[0.8rem] font-semibold tabular-nums">{compact(repostCount)}</span>
          )}
        </button>
      </div>

      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onShare();
          }}
          aria-label="Share this post"
          className="press grid h-9 w-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-tile-sunk"
        >
          <ShareIcon size={20} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBookmark(!bookmarked);
          }}
          aria-pressed={bookmarked}
          aria-label={bookmarked ? "Remove from saved" : "Save this post"}
          className={cn(
            "press grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-tile-sunk",
            bookmarked ? "text-glaze dark:text-teal" : "text-ink-2"
          )}
        >
          <BookmarkIcon filled={bookmarked} size={20} />
        </button>
      </div>

    </div>
  );
}
