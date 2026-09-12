"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/shell/PageHeader";
import PostCard from "./PostCard";
import CommentThread from "@/components/Comment";
import { useLocalPostActions } from "./useLocalPostActions";
import type { FeedPost } from "@/app/Providers/PostsProvider";

/**
 * The post page.
 *
 * The post is server-rendered and handed here as the initial state; everything
 * after that (reacting, saving, voting, commenting) behaves exactly as it does
 * in the feed, because it runs through the same handlers.
 */
export default function PostDetail({ post: initial }: { post: FeedPost }) {
  const router = useRouter();
  const { posts, setPosts, react, bookmark, vote } = useLocalPostActions([initial]);
  const post = posts[0] ?? initial;

  React.useEffect(() => {
    setPosts([initial]);
  }, [initial, setPosts]);

  // Opening a post is a view; the API counts each person once.
  React.useEffect(() => {
    void fetch("/api/v1/posts/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: initial.id }),
    }).catch(() => {});
  }, [initial.id]);

  const remove = async (id: number) => {
    try {
      const res = await fetch("/api/v1/deletepost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postid: id }),
      });
      if (!res.ok) throw new Error();
      router.push("/");
    } catch {
      // PostCard surfaces its own failure toast for the feed case; here the
      // page simply stays put.
    }
  };

  const commentCountChanged = (delta: number) =>
    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id ? { ...p, commentCount: Math.max(0, p.commentCount + delta) } : p
      )
    );

  return (
    <>
      <PageHeader back title="Post" subtitle={post.author?.name ?? undefined} />

      <PostCard
        post={post}
        detail
        onReact={react}
        onBookmark={bookmark}
        onVote={vote}
        onDelete={remove}
      />

      <CommentThread
        postId={post.id}
        postAuthorId={post.authorId}
        onCountChange={commentCountChanged}
      />
    </>
  );
}
