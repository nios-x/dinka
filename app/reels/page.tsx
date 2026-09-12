"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Volume2, VolumeX, Play, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";
import EmptyState from "@/components/ui/empty-state";
import RichText from "@/components/feed/RichText";
import ReactionGlyph from "@/components/feed/ReactionGlyph";
import { compact, handleOf } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useLocalPostActions } from "@/components/feed/useLocalPostActions";
import { BookmarkIcon, CommentIcon, HeartIcon, ReelsIcon, ShareIcon } from "@/components/icons";
import type { FeedPost } from "@/app/Providers/PostsProvider";
import { openComposer } from "@/components/composer/composer-bus";

/**
 * Reels.
 *
 * A snap-scrolling column of full-height videos. Only the reel in view plays —
 * an observer starts it and pauses everything else — so scrolling never leaves
 * three soundtracks running at once. Sound is muted until you ask for it, which
 * is both the platform requirement for autoplay and the polite default.
 */
export default function Page() {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const [muted, setMuted] = React.useState(true);
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const { posts, setPosts, react, bookmark } = useLocalPostActions();
  const busy = React.useRef(false);

  const load = React.useCallback(
    async (p: number) => {
      if (busy.current) return;
      busy.current = true;
      try {
        const res = await fetch(`/api/v1/reels?page=${p}`, { cache: "no-store" });
        if (!res.ok) {
          setHasMore(false);
          return;
        }
        const data = await res.json();
        setPosts((prev: FeedPost[]) => {
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
    },
    [setPosts]
  );

  React.useEffect(() => {
    void load(0);
  }, [load]);

  const share = async (post: FeedPost) => {
    const url = `${window.location.origin}/postid/${post.id}`;
    try {
      if (navigator.share) await navigator.share({ url, title: "A reel on Dinka" });
      else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") toast.error("Could not share that reel");
    }
  };

  return (
    <div className="stage fixed inset-0 z-[60] lg:relative lg:inset-auto lg:z-auto lg:h-svh">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Close reels"
        className="press absolute left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm lg:hidden"
      >
        <ArrowLeft size={21} />
      </button>

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute" : "Mute"}
        className="press absolute right-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm"
      >
        {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
      </button>

      {loading && posts.length === 0 ? (
        <div className="grid h-full place-items-center text-white/70">
          <Loader2 size={26} className="animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="grid h-full place-items-center bg-ground">
          <EmptyState
            icon={<ReelsIcon size={26} />}
            title="No reels yet"
            body="Reels are posts with a video. Post one and it shows up here."
            action={{ label: "Post a video", onClick: () => openComposer() }}
            secondary={{ label: "Back to the feed", href: "/" }}
          />
        </div>
      ) : (
        <div
          className="h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar"
          onScroll={(e) => {
            const el = e.currentTarget;
            if (el.scrollTop + el.clientHeight * 2 >= el.scrollHeight && hasMore && !busy.current) {
              void load(page);
            }
          }}
        >
          {posts.map((post) => (
            <Reel
              key={post.id}
              post={post}
              muted={muted}
              active={activeId === post.id}
              onActive={() => setActiveId(post.id)}
              onReact={react}
              onBookmark={bookmark}
              onShare={() => share(post)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Reel({
  post,
  muted,
  active,
  onActive,
  onReact,
  onBookmark,
  onShare,
}: {
  post: FeedPost;
  muted: boolean;
  active: boolean;
  onActive: () => void;
  onReact: (id: number, r: "Love" | null) => void;
  onBookmark: (id: number, saved: boolean) => void;
  onShare: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const video = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) onActive();
      },
      { threshold: [0, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onActive]);

  React.useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (active) {
      v.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [active]);

  const liked = post.myReaction === "Love";
  const total = Object.values(post.reactionCounts).reduce<number>((a, b) => a + (b ?? 0), 0);

  return (
    <section ref={ref} className="relative h-full w-full snap-start snap-always bg-black">
      <video
        ref={video}
        src={post.mediaurl ?? undefined}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onClick={() => {
          const v = video.current;
          if (!v) return;
          if (v.paused) {
            void v.play();
            setPlaying(true);
          } else {
            v.pause();
            setPlaying(false);
          }
        }}
        onDoubleClick={() => onReact(post.id, liked ? null : "Love")}
        className="h-full w-full object-contain"
      />

      {!playing && active && (
        <span className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm">
            <Play size={28} fill="currentColor" />
          </span>
        </span>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Actions rail */}
      <div className="absolute bottom-28 right-3 flex flex-col items-center gap-5 lg:bottom-8">
        <button
          type="button"
          onClick={() => onReact(post.id, liked ? null : "Love")}
          aria-pressed={liked}
          aria-label={liked ? "Remove your reaction" : "Love this reel"}
          className="press flex flex-col items-center gap-1 text-white"
        >
          {liked ? <ReactionGlyph reaction="Love" size={30} /> : <HeartIcon size={28} />}
          <span className="text-[0.72rem] font-bold tabular-nums">{compact(total)}</span>
        </button>

        <Link
          href={`/postid/${post.id}`}
          aria-label={`${post.commentCount} comments`}
          className="press flex flex-col items-center gap-1 text-white"
        >
          <CommentIcon size={27} />
          <span className="text-[0.72rem] font-bold tabular-nums">{compact(post.commentCount)}</span>
        </Link>

        <button
          type="button"
          onClick={onShare}
          aria-label="Share this reel"
          className="press flex flex-col items-center gap-1 text-white"
        >
          <ShareIcon size={27} />
        </button>

        <button
          type="button"
          onClick={() => onBookmark(post.id, !post.isBookmarked)}
          aria-pressed={post.isBookmarked}
          aria-label={post.isBookmarked ? "Remove from saved" : "Save this reel"}
          className={cn("press flex flex-col items-center gap-1", post.isBookmarked ? "text-teal" : "text-white")}
        >
          <BookmarkIcon filled={post.isBookmarked} size={27} />
        </button>
      </div>

      {/* Author and caption */}
      <div className="absolute inset-x-0 bottom-24 px-4 pr-20 lg:bottom-6">
        <div className="flex items-center gap-2.5">
          <Avatar
            src={post.author?.pic ?? post.author?.image}
            name={post.author?.name}
            userId={post.authorId}
            size="md"
            href={`/profile?id=${post.authorId}`}
          />
          <Link href={`/profile?id=${post.authorId}`} className="min-w-0">
            <span className="block truncate text-[0.92rem] font-semibold text-white">
              {post.author?.name ?? "Someone"}
            </span>
            <span className="block truncate text-[0.75rem] text-white/70">
              @{handleOf(post.author)}
            </span>
          </Link>
        </div>

        {post.title && (
          <div className="mt-2 text-[0.88rem] leading-snug text-white/95">
            <RichText clamp={2}>{post.title}</RichText>
          </div>
        )}
      </div>
    </section>
  );
}
