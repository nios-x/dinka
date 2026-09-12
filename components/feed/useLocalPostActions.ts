"use client";

import React from "react";
import { toast } from "sonner";
import type { FeedPost } from "@/app/Providers/PostsProvider";
import type { ReactionKey } from "@/lib/reactions";

/**
 * Post interactions for surfaces that own their own list.
 *
 * The home feed's state lives in PostsProvider; a tag page, the saved list, a
 * profile and search results each hold their own array but must behave
 * identically. This hook supplies the same optimistic-with-rollback handlers
 * over local state so a like feels the same everywhere.
 */
export function useLocalPostActions(initial: FeedPost[] = []) {
  const [posts, setPosts] = React.useState<FeedPost[]>(initial);
  const timers = React.useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  React.useEffect(() => {
    const pending = timers.current;
    return () => Object.values(pending).forEach(clearTimeout);
  }, []);

  const debounce = (key: string, delay: number, write: () => Promise<void>) => {
    if (timers.current[key]) clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(() => {
      delete timers.current[key];
      void write();
    }, delay);
  };

  const react = React.useCallback((id: number, reaction: ReactionKey | null) => {
    let previous: ReactionKey | null = null;
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        previous = p.myReaction;
        const counts = { ...p.reactionCounts };
        if (previous) counts[previous] = Math.max(0, (counts[previous] ?? 1) - 1);
        if (reaction) counts[reaction] = (counts[reaction] ?? 0) + 1;
        return { ...p, myReaction: reaction, reactionCounts: counts };
      })
    );

    debounce(`react:${id}`, 400, async () => {
      try {
        const res = await fetch("/api/v1/reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId: id, type: reaction }),
        });
        if (!res.ok) throw new Error();
      } catch {
        setPosts((prev) =>
          prev.map((p) => {
            if (p.id !== id) return p;
            const counts = { ...p.reactionCounts };
            if (reaction) counts[reaction] = Math.max(0, (counts[reaction] ?? 1) - 1);
            if (previous) counts[previous] = (counts[previous] ?? 0) + 1;
            return { ...p, myReaction: previous, reactionCounts: counts };
          })
        );
        toast.error("Could not save that reaction");
      }
    });
  }, []);

  const bookmark = React.useCallback((id: number, saved: boolean) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, isBookmarked: saved } : p)));
    debounce(`save:${id}`, 300, async () => {
      try {
        const res = await fetch("/api/v1/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId: id, saved }),
        });
        if (!res.ok) throw new Error();
      } catch {
        setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, isBookmarked: !saved } : p)));
        toast.error("Could not update your saved posts");
      }
    });
  }, []);

  const vote = React.useCallback(async (postId: number, optionId: number) => {
    let snapshot: FeedPost["poll"] = null;
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId || !p.poll) return p;
        snapshot = p.poll;
        const already = p.poll.myVote;
        if (already === optionId) return p;
        const options = p.poll.options.map((o) => {
          let votes = o.votes;
          if (o.id === optionId) votes += 1;
          if (already && o.id === already) votes = Math.max(0, votes - 1);
          return { ...o, votes };
        });
        return {
          ...p,
          poll: { ...p.poll, options, myVote: optionId, totalVotes: p.poll.totalVotes + (already ? 0 : 1) },
        };
      })
    );

    try {
      const res = await fetch("/api/v1/polls/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId }),
      });
      if (!res.ok) throw new Error();
    } catch {
      if (snapshot) setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, poll: snapshot } : p)));
      toast.error("Could not record your vote");
    }
  }, []);

  const remove = React.useCallback(async (postid: number) => {
    let snapshot: FeedPost[] = [];
    setPosts((prev) => {
      snapshot = prev;
      return prev.filter((p) => p.id !== postid);
    });
    try {
      const res = await fetch("/api/v1/deletepost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postid }),
      });
      const body = await res.json();
      if (!res.ok || body.error) throw new Error(body.error);
      toast.success("Post deleted");
    } catch {
      setPosts(snapshot);
      toast.error("Could not delete that post");
    }
  }, []);

  return { posts, setPosts, react, bookmark, vote, remove };
}
