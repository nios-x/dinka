"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import type { ReactionKey } from "@/lib/reactions";

/**
 * Feed state.
 *
 * Every interaction is optimistic and reverts on failure — on a phone the
 * network is the slowest part of a tap, and a heart that waits 400ms to fill
 * feels broken. Writes are debounced per post so holding down a reaction does
 * not produce a burst of requests.
 */

export type FeedPost = {
  id: number;
  title: string;
  kind: "Text" | "Image" | "Video" | "Reel" | "Poll" | "Repost";
  visiblity: "Public" | "Followers";
  createdAt: string;
  isMedia: boolean;
  mediaurl: string | null;
  mediaType?: string | null;
  mediaWidth?: number | null;
  mediaHeight?: number | null;
  location?: string | null;
  isSynthetic?: boolean;
  authorId: string;
  author: {
    id?: string;
    name: string | null;
    username?: string | null;
    pic?: string | null;
    image?: string | null;
    isVerified?: boolean;
  };
  likes: number;
  isLiked: boolean;
  commentCount: number;
  reactionCounts: Partial<Record<ReactionKey, number>>;
  myReaction: ReactionKey | null;
  isBookmarked: boolean;
  repostCount: number;
  shareCount: number;
  viewCount: number;
  tags: string[];
  poll: {
    id: number;
    question: string | null;
    endsAt: string | null;
    options: { id: number; label: string; votes: number }[];
    myVote: number | null;
    totalVotes: number;
  } | null;
  repostOf: {
    id: number;
    title: string;
    createdAt: string;
    isMedia: boolean;
    mediaurl: string | null;
    authorId: string;
    author: { id?: string; name: string | null; username?: string | null; pic?: string | null };
  } | null;
};

export type FeedTab = "following" | "latest";

type PostContextType = {
  posts: FeedPost[];
  isLoading: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  tab: FeedTab;
  setTab: (t: FeedTab) => void;
  addPost: (post: FeedPost) => void;
  setIsLoading: (v: boolean) => void;
  fetchPost: () => void;
  refresh: () => Promise<void>;
  handleLike: (id: number, like: boolean) => void;
  handleReact: (id: number, reaction: ReactionKey | null) => void;
  handleBookmark: (id: number, saved: boolean) => void;
  handleVote: (postId: number, optionId: number) => void;
  handleDelete: (id: number) => void;
  /** Lets other surfaces (profile, post page) push updates back into the feed. */
  patchPost: (id: number, patch: Partial<FeedPost>) => void;
};

const PostContext = createContext<PostContextType | null>(null);

export const usePostContext = () => {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error("usePostContext must be used within PostProvider");
  return ctx;
};

const PAGE_SIZE = 8;

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [tab, setTabState] = useState<FeedTab>("following");
  const { status } = useSession();

  // Guards against two in-flight page requests from a fast scroll.
  const loadingRef = useRef(false);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const load = useCallback(
    async (nextPage: number, mode: FeedTab, replace: boolean) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      try {
        const res = await fetch(`/api/v1/get-posts?page=${nextPage}&tab=${mode}&take=${PAGE_SIZE}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          setHasMore(false);
          return;
        }
        const data = await res.json();
        const batch: FeedPost[] = data.posts ?? [];
        setPosts((prev) => {
          if (replace) return batch;
          // The feed can shift between requests; never render the same post twice.
          const seen = new Set(prev.map((p) => p.id));
          return [...prev, ...batch.filter((p) => !seen.has(p.id))];
        });
        setHasMore(batch.length >= PAGE_SIZE);
        setPage(nextPage + 1);
      } catch {
        setHasMore(false);
      } finally {
        loadingRef.current = false;
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    if (status !== "authenticated") {
      if (status === "unauthenticated") setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setPosts([]);
    setPage(0);
    setHasMore(true);
    load(0, tab, true);
  }, [status, tab, load]);

  const fetchPost = useCallback(() => {
    if (status !== "authenticated" || !hasMore) return;
    load(page, tab, false);
  }, [status, hasMore, page, tab, load]);

  const refresh = useCallback(async () => {
    if (status !== "authenticated") return;
    setIsRefreshing(true);
    setHasMore(true);
    await load(0, tab, true);
  }, [status, tab, load]);

  const setTab = useCallback((t: FeedTab) => setTabState(t), []);

  const addPost = useCallback((post: FeedPost) => {
    if (!post) return;
    setPosts((prev) => [post, ...prev.filter((p) => p.id !== post.id)]);
  }, []);

  const patchPost = useCallback((id: number, patch: Partial<FeedPost>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  /** Runs `write` after `delay`, collapsing repeated taps on the same target. */
  const debounce = (key: string, delay: number, write: () => Promise<void>) => {
    if (timers.current[key]) clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(() => {
      delete timers.current[key];
      void write();
    }, delay);
  };

  const handleLike = useCallback((id: number, like: boolean) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isLiked: like, likes: Math.max(0, p.likes + (like ? 1 : -1)) } : p
      )
    );
    debounce(`like:${id}`, 450, async () => {
      try {
        const res = await fetch("/api/v1/togglelike", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, whatToDo: like }),
        });
        if (!res.ok) throw new Error();
      } catch {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, isLiked: !like, likes: Math.max(0, p.likes + (like ? -1 : 1)) } : p
          )
        );
        toast.error("Could not save that like");
      }
    });
  }, []);

  const handleReact = useCallback((id: number, reaction: ReactionKey | null) => {
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

  const handleBookmark = useCallback((id: number, saved: boolean) => {
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

  const handleVote = useCallback(async (postId: number, optionId: number) => {
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
          poll: {
            ...p.poll,
            options,
            myVote: optionId,
            totalVotes: p.poll.totalVotes + (already ? 0 : 1),
          },
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

  const handleDelete = useCallback(async (postid: number) => {
    const snapshot = posts;
    setPosts((prev) => prev.filter((p) => p.id !== postid));
    try {
      const res = await fetch("/api/v1/deletepost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postid }),
      });
      const body = await res.json();
      if (!res.ok || body.error) throw new Error(body.error ?? "failed");
      toast.success("Post deleted");
    } catch (err: any) {
      setPosts(snapshot);
      toast.error(err?.message === "failed" ? "Could not delete that post" : err.message);
    }
  }, [posts]);

  // Clear any pending debounced writes when the provider unmounts.
  useEffect(() => {
    const pending = timers.current;
    return () => {
      Object.values(pending).forEach(clearTimeout);
    };
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        isLoading,
        isRefreshing,
        hasMore,
        tab,
        setTab,
        addPost,
        setIsLoading,
        fetchPost,
        refresh,
        handleLike,
        handleReact,
        handleBookmark,
        handleVote,
        handleDelete,
        patchPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
