"use client";

// TEMPORARY visual-check route. Delete before committing.
import React from "react";
import PostCard from "@/components/feed/PostCard";
import { FeedSkeleton } from "@/components/feed/PostSkeleton";
import EmptyState from "@/components/ui/empty-state";
import { HomeIcon } from "@/components/icons";
import type { FeedPost } from "@/app/Providers/PostsProvider";

const base = {
  authorId: "u1",
  author: { name: "Nadia Rey", username: "nadiarey", pic: null, image: null, isVerified: true },
  createdAt: new Date(Date.now() - 7200_000).toISOString(),
  visiblity: "Public",
  isMedia: false,
  mediaurl: null,
  mediaType: null,
  mediaWidth: null,
  mediaHeight: null,
  likes: 0,
  myReaction: null,
  reactionCounts: { Like: 34, Love: 12 },
  commentCount: 8,
  repostCount: 2,
  viewCount: 1204,
  isBookmarked: false,
  isSynthetic: false,
  tags: [],
  poll: null,
  repostOf: null,
  kind: "Post",
  location: null,
} as unknown as FeedPost;

const posts: FeedPost[] = [
  { ...base, id: 1, title: "Test roll from the darkroom this morning. The grain on this stock is doing something I did not expect." } as FeedPost,
  {
    ...base,
    id: 2,
    title: "Second one, with the AI label and a location.",
    isSynthetic: true,
    location: "Lisbon",
    tags: ["filmphotography", "darkroom"],
    myReaction: "Love",
  } as unknown as FeedPost,
];

export default function Preview() {
  const noop = () => {};
  return (
    <div className="mx-auto max-w-[39rem] pb-24">
      <h2 className="px-4 pt-6 text-sm font-bold uppercase tracking-wide text-ink-3">Cards</h2>
      <div className="px-3 pt-3">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} onReact={noop} onBookmark={noop} onVote={noop} />
        ))}
      </div>

      <h2 className="px-4 pt-6 text-sm font-bold uppercase tracking-wide text-ink-3">Skeleton</h2>
      <FeedSkeleton count={2} />

      <h2 className="px-4 pt-6 text-sm font-bold uppercase tracking-wide text-ink-3">Empty</h2>
      <EmptyState
        icon={<HomeIcon size={26} />}
        title="Your feed is quiet"
        body="You only see posts from people you follow here. Find a few, or switch to Latest."
        action={{ label: "Find people", href: "/people/find" }}
        secondary={{ label: "Browse Latest instead", href: "/explore" }}
      />
    </div>
  );
}
