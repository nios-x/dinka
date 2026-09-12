"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import PostCard from "./PostCard";
import PostSkeleton, { FeedSkeleton } from "./PostSkeleton";
import type { FeedPost } from "@/app/Providers/PostsProvider";
import type { ReactionKey } from "@/lib/reactions";
import EmptyState from "@/components/ui/empty-state";
import { openComposer } from "@/components/composer/composer-bus";
import { ComposeIcon } from "@/components/icons";

/**
 * The post list.
 *
 * Loading the next page is triggered by a sentinel a screen ahead of the
 * bottom, so the next posts are usually already there by the time you reach
 * them. Each card fades up once — an entrance, not a per-scroll effect.
 */
export default function Feed({
  posts,
  isLoading,
  hasMore,
  onLoadMore,
  onReact,
  onBookmark,
  onDelete,
  onVote,
  empty,
}: {
  posts: FeedPost[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onReact: (id: number, r: ReactionKey | null) => void;
  onBookmark: (id: number, saved: boolean) => void;
  onDelete?: (id: number) => void;
  onVote?: (postId: number, optionId: number) => void;
  empty?: React.ReactNode;
}) {
  const { ref, inView } = useInView({ rootMargin: "800px 0px" });

  React.useEffect(() => {
    if (inView && hasMore && !isLoading) onLoadMore();
  }, [inView, hasMore, isLoading, onLoadMore]);

  if (isLoading && posts.length === 0) return <FeedSkeleton count={3} />;

  if (!isLoading && posts.length === 0) {
    return (
      <>
        {empty ?? (
          <EmptyState
            icon={<ComposeIcon size={26} />}
            title="Nothing here yet"
            body="Follow a few people, or write the first post yourself."
            action={{ label: "Write a post", onClick: () => openComposer() }}
          />
        )}
      </>
    );
  }

  return (
    // Cards are rounded panels now, so they need a gutter at every width —
    // not just from `sm` up, where they used to run edge to edge.
    <div className="px-3 pt-3">
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.42,
            // Only the first screenful staggers; later pages appear at once.
            delay: i < 4 ? i * 0.05 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <PostCard
            post={post}
            onReact={onReact}
            onBookmark={onBookmark}
            onDelete={onDelete}
            onVote={onVote}
          />
        </motion.div>
      ))}

      <div ref={ref} aria-hidden className="h-px" />

      {hasMore ? (
        isLoading ? (
          <PostSkeleton />
        ) : (
          <div className="flex justify-center py-8 text-ink-3">
            <Loader2 size={20} className="animate-spin" />
            <span className="sr-only">Loading more posts</span>
          </div>
        )
      ) : (
        posts.length > 0 && (
          <p className="meta py-10 text-center">You’re all caught up</p>
        )
      )}
    </div>
  );
}
