"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  BadgeCheck,
  MapPin,
  LinkIcon,
  CalendarDays,
  Phone,
  Video,
  Settings,
  Check,
  MoreHorizontal,
} from "lucide-react";
import PageHeader from "@/components/shell/PageHeader";
import Feed from "@/components/feed/Feed";
import EmptyState from "@/components/ui/empty-state";
import { Avatar, AvatarStack } from "@/components/ui/avatar";
import { useLocalPostActions } from "@/components/feed/useLocalPostActions";
import { useSocket } from "@/app/hooks/videosocket";
import { compact, handleOf, joinedLabel } from "@/lib/format";
import { prettyLink, href as toHref } from "@/lib/richtext";
import { cn } from "@/lib/utils";
import { MessagesIcon, InsightsIcon } from "@/components/icons";
import { openComposer } from "@/components/composer/composer-bus";
import type { FeedPost } from "@/app/Providers/PostsProvider";

/**
 * A profile.
 *
 * The header carries identity and the relationship; the tabs below carry the
 * work. Follow is optimistic — the count moves on tap and rolls back only if
 * the write fails.
 */

type Profile = {
  user: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    pic: string | null;
    bio: string;
    coverUrl: string | null;
    location: string | null;
    website: string | null;
    pronouns: string | null;
    isVerified: boolean;
    createdAt: string;
  };
  isMe: boolean;
  isFollowing: boolean;
  followsYou: boolean;
  postCount: number;
  followersCount: number;
  followingCount: number;
  followedBy: { id: string; name: string | null; pic: string | null }[];
};

const TABS = [
  { key: "posts", label: "Posts" },
  { key: "media", label: "Media" },
  { key: "reposts", label: "Reposts" },
] as const;

export default function ProfileView({ id }: { id: string }) {
  const [data, setData] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState<string>("posts");
  const [page, setPage] = React.useState(0);
  const [postsLoading, setPostsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const [following, setFollowing] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const { posts, setPosts, react, bookmark, vote, remove } = useLocalPostActions();
  const { createCall } = useSocket();
  const busy = React.useRef(false);

  React.useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch("/api/v1/getuserdetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: Profile | null) => {
        setData(d?.user ? d : null);
        setFollowing(!!d?.isFollowing);
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [id]);

  const loadPosts = React.useCallback(
    async (p: number, t: string) => {
      if (busy.current || !id) return;
      busy.current = true;
      try {
        const res = await fetch(`/api/v1/getuserposts?page=${p}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, tab: t }),
        });
        if (!res.ok) {
          setHasMore(false);
          return;
        }
        const d = await res.json();
        setPosts((prev: FeedPost[]) => {
          if (p === 0) return d.posts;
          const seen = new Set(prev.map((x) => x.id));
          return [...prev, ...d.posts.filter((x: FeedPost) => !seen.has(x.id))];
        });
        setHasMore(!!d.hasMore);
        setPage(p + 1);
      } catch {
        setHasMore(false);
      } finally {
        busy.current = false;
        setPostsLoading(false);
      }
    },
    [id, setPosts]
  );

  React.useEffect(() => {
    setPostsLoading(true);
    setPage(0);
    setHasMore(true);
    void loadPosts(0, tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, tab]);

  const toggleFollow = async () => {
    if (!data) return;
    const next = !following;
    setFollowing(next);
    setPending(true);
    setData((d) => (d ? { ...d, followersCount: Math.max(0, d.followersCount + (next ? 1 : -1)) } : d));
    try {
      const res = await fetch(next ? "/api/v1/friends/follow" : "/api/v1/friends/unfollow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendId: data.user.id }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setFollowing(!next);
      setData((d) =>
        d ? { ...d, followersCount: Math.max(0, d.followersCount + (next ? -1 : 1)) } : d
      );
      toast.error(next ? "Could not follow" : "Could not unfollow");
    } finally {
      setPending(false);
    }
  };

  if (loading) return <ProfileSkeleton />;

  if (!data) {
    return (
      <>
        <PageHeader back title="Profile" />
        <EmptyState
          title="This account doesn’t exist"
          body="The link may be wrong, or the account may have been deleted."
          action={{ label: "Back to your feed", href: "/" }}
        />
      </>
    );
  }

  const u = data.user;
  const tabs = data.isMe ? [...TABS, { key: "liked", label: "Liked" } as const] : TABS;

  return (
    <>
      <PageHeader
        back
        title={u.name ?? "Profile"}
        subtitle={`${compact(data.postCount)} ${data.postCount === 1 ? "post" : "posts"}`}
        actions={
          data.isMe ? (
            <Link
              href="/settings"
              aria-label="Edit your profile"
              className="press grid h-9 w-9 place-items-center rounded-full bg-tile-sunk text-ink-2 transition-colors hover:text-ink"
            >
              <Settings size={17} />
            </Link>
          ) : (
            <button
              type="button"
              aria-label="Report this account"
              onClick={() => toast.success("Thanks — we’ll take a look")}
              className="press grid h-9 w-9 place-items-center rounded-full bg-tile-sunk text-ink-2 transition-colors hover:text-ink"
            >
              <MoreHorizontal size={17} />
            </button>
          )
        }
      />

      <div
        className="h-32 w-full bg-tile-sunk sm:h-40"
        style={
          u.coverUrl
            ? {
                backgroundImage: `url(${u.coverUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {
                background:
                  "linear-gradient(135deg, var(--glaze-soft), var(--tile-sunk) 55%, var(--saffron-soft))",
              }
        }
        role={u.coverUrl ? "img" : undefined}
        aria-label={u.coverUrl ? `${u.name ?? "Their"} cover image` : undefined}
      />

      <div className="px-4">
        <div className="-mt-11 flex items-end justify-between gap-3">
          <span className="rounded-full ring-4" style={{ ["--tw-ring-color" as never]: "var(--ground)" }}>
            <Avatar src={u.pic ?? u.image} name={u.name} userId={u.id} size="2xl" />
          </span>

          <div className="flex items-center gap-2 pb-1">
            {!data.isMe && (
              <>
                <button
                  type="button"
                  onClick={() => createCall(u.id)}
                  aria-label="Start a voice call"
                  className="press grid h-10 w-10 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:text-ink"
                >
                  <Phone size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => createCall(u.id)}
                  aria-label="Start a video call"
                  className="press hidden h-10 w-10 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:text-ink xs:grid sm:grid"
                >
                  <Video size={17} />
                </button>
                <Link
                  href={`/chat?id=${u.id}`}
                  aria-label="Send a message"
                  className="press grid h-10 w-10 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:text-ink"
                >
                  <MessagesIcon size={18} />
                </Link>
                <button
                  type="button"
                  onClick={toggleFollow}
                  disabled={pending}
                  className={cn(
                    "press flex h-10 items-center gap-1.5 rounded-full px-5 text-[0.875rem] font-semibold transition-colors disabled:opacity-60",
                    following
                      ? "border border-line text-ink hover:border-ember hover:text-ember"
                      : "bg-glaze text-glaze-on hover:bg-glaze-hover"
                  )}
                >
                  {following && <Check size={15} strokeWidth={3} />}
                  {following ? "Following" : "Follow"}
                </button>
              </>
            )}

            {data.isMe && (
              <>
                <Link
                  href="/insights"
                  className="press flex h-10 items-center gap-1.5 rounded-full border border-line px-4 text-[0.875rem] font-semibold text-ink transition-colors hover:border-line-strong"
                >
                  <InsightsIcon size={16} />
                  Insights
                </Link>
                <Link
                  href="/settings"
                  className="press flex h-10 items-center rounded-full bg-glaze px-5 text-[0.875rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover"
                >
                  Edit profile
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h1 className="text-[1.4rem] font-extrabold tracking-[-0.025em] text-ink">
              {u.name ?? "Someone"}
            </h1>
            {u.isVerified && (
              <BadgeCheck size={18} className="text-glaze dark:text-teal" aria-label="Verified" />
            )}
            {data.followsYou && !data.isMe && (
              <span className="rounded-full bg-tile-sunk px-2 py-0.5 text-[0.7rem] font-semibold text-ink-3">
                Follows you
              </span>
            )}
          </div>

          <p className="meta">
            @{handleOf(u)}
            {u.pronouns && ` · ${u.pronouns}`}
          </p>

          {u.bio && (
            <p className="mt-2.5 whitespace-pre-wrap text-[0.95rem] leading-relaxed text-ink-2">{u.bio}</p>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {u.location && (
              <span className="flex items-center gap-1 text-[0.82rem] text-ink-3">
                <MapPin size={13} />
                {u.location}
              </span>
            )}
            {u.website && (
              <a
                href={toHref(u.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[0.82rem] font-medium text-glaze hover:underline dark:text-teal"
              >
                <LinkIcon size={13} />
                {prettyLink(u.website, 32)}
              </a>
            )}
            <span className="flex items-center gap-1 text-[0.82rem] text-ink-3">
              <CalendarDays size={13} />
              {joinedLabel(u.createdAt)}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-5">
            <Link href="/people" className="group">
              <span className="text-[1rem] font-bold tabular-nums text-ink">
                {compact(data.followersCount)}
              </span>{" "}
              <span className="text-[0.85rem] text-ink-3 group-hover:underline">Followers</span>
            </Link>
            <Link href="/people" className="group">
              <span className="text-[1rem] font-bold tabular-nums text-ink">
                {compact(data.followingCount)}
              </span>{" "}
              <span className="text-[0.85rem] text-ink-3 group-hover:underline">Following</span>
            </Link>
          </div>

          {data.followedBy.length > 0 && !data.isMe && (
            <div className="mt-3 flex items-center gap-2">
              <AvatarStack people={data.followedBy} />
              <p className="min-w-0 truncate text-[0.8rem] text-ink-3">
                Followed by {data.followedBy.map((f) => f.name ?? "someone").join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="sticky top-14 z-20 mt-4 flex border-b border-line bg-ground lg:top-0">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={cn(
              "relative flex-1 py-3 text-[0.875rem] font-semibold transition-colors",
              tab === t.key ? "text-ink" : "text-ink-3 hover:text-ink-2"
            )}
          >
            {t.label}
            {tab === t.key && (
              <motion.span
                layoutId="profile-tab"
                className="absolute inset-x-[28%] bottom-0 h-[3px] rounded-full bg-glaze dark:bg-teal"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="sm:pt-3">
        <Feed
          posts={posts}
          isLoading={postsLoading}
          hasMore={hasMore}
          onLoadMore={() => loadPosts(page, tab)}
          onReact={react}
          onBookmark={bookmark}
          onDelete={data.isMe ? remove : undefined}
          onVote={vote}
          empty={
            <EmptyState
              title={
                data.isMe
                  ? tab === "liked"
                    ? "Nothing reacted to yet"
                    : "You haven’t posted yet"
                  : "Nothing here yet"
              }
              body={
                data.isMe
                  ? "Your posts will show up on your profile."
                  : `${u.name ?? "They"} hasn’t posted in this tab.`
              }
              action={
                data.isMe && tab !== "liked"
                  ? { label: "Write your first post", onClick: () => openComposer() }
                  : undefined
              }
            />
          }
        />
      </div>
    </>
  );
}

function ProfileSkeleton() {
  return (
    <div>
      <div className="skeleton h-32 w-full sm:h-40" />
      <div className="px-4">
        <div className="-mt-11">
          <div className="skeleton h-[88px] w-[88px] rounded-full ring-4 ring-ground" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="skeleton h-5 w-40 rounded-full" />
          <div className="skeleton h-3 w-24 rounded-full" />
          <div className="skeleton h-3 w-full rounded-full" />
          <div className="skeleton h-3 w-2/3 rounded-full" />
        </div>
      </div>
    </div>
  );
}
