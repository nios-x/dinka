"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { usePostContext } from "./Providers/PostsProvider";
import Feed from "@/components/feed/Feed";
import { FeedSkeleton } from "@/components/feed/PostSkeleton";
import StoryRail from "@/components/stories/StoryRail";
import Landing from "@/components/marketing/Landing";
import EmptyState from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { openComposer } from "@/components/composer/composer-bus";
import { HomeIcon } from "@/components/icons";

/**
 * Home.
 *
 * Signed in: stories, a two-way feed switch, and the posts. "Following" is the
 * default because the product's position is that the people you chose come
 * first; "Latest" is the opt-in wider view.
 */
export default function Page() {
  const { status } = useSession();
  const {
    posts,
    isLoading,
    hasMore,
    tab,
    setTab,
    fetchPost,
    handleReact,
    handleBookmark,
    handleDelete,
    handleVote,
  } = usePostContext();

  // One AI-authored post per session keeps a new, quiet feed from being empty.
  React.useEffect(() => {
    if (status !== "authenticated") return;
    if (sessionStorage.getItem("dinka:seeded")) return;
    sessionStorage.setItem("dinka:seeded", "1");
    if (Math.random() < 0.3) {
      fetch("/api/v1/gemini/auto-post", { method: "POST" }).catch(() => {});
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="sm:px-3 sm:pt-4">
        <FeedSkeleton count={3} />
      </div>
    );
  }

  if (status !== "authenticated") return <Landing />;

  return (
    <>
      <StoryRail />

      {/* Solid, not translucent: this bar sits over scrolling cards. */}
      <div className="sticky top-14 z-30 flex items-center gap-1 border-b border-line bg-ground px-3 py-2 lg:top-0">
        {(["following", "latest"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-[0.875rem] font-semibold transition-colors",
              tab === t ? "text-ink" : "text-ink-3 hover:text-ink-2"
            )}
          >
            {tab === t && (
              <motion.span
                layoutId="feed-tab"
                className="absolute inset-0 rounded-full bg-tile-sunk"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{t === "following" ? "Following" : "Latest"}</span>
          </button>
        ))}
      </div>

      <div className="sm:pt-3">
        <Feed
          posts={posts}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={fetchPost}
          onReact={handleReact}
          onBookmark={handleBookmark}
          onDelete={handleDelete}
          onVote={handleVote}
          empty={
            tab === "following" ? (
              <EmptyState
                icon={<HomeIcon size={26} />}
                title="Your feed is quiet"
                body="You only see posts from people you follow here. Find a few, or switch to Latest to see what everyone is posting."
                action={{ label: "Find people", href: "/people/find" }}
                secondary={{ label: "Browse Latest instead", href: "/explore" }}
              />
            ) : (
              <EmptyState
                icon={<HomeIcon size={26} />}
                title="Nothing posted yet"
                body="Be the first — write something and it will show up right here."
                action={{ label: "Write a post", onClick: () => openComposer() }}
              />
            )
          }
        />
      </div>
    </>
  );
}
