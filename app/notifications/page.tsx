"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Loader2, CheckCheck, UserPlus, AtSign, MessageSquare } from "lucide-react";
import PageHeader from "@/components/shell/PageHeader";
import EmptyState from "@/components/ui/empty-state";
import { Avatar } from "@/components/ui/avatar";
import { useCounts } from "@/app/Providers/CountsProvider";
import { shortAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import { BellIcon, RepostIcon } from "@/components/icons";
import ReactionGlyph from "@/components/feed/ReactionGlyph";
import { isReactionKey } from "@/lib/reactions";

/**
 * The notification centre.
 *
 * Unread rows are tinted rather than badged, and everything is marked read when
 * you arrive — you have, after all, just read it. The badge clears immediately
 * so the nav does not lag behind the screen you are looking at.
 */

type Notification = {
  id: number;
  type: string;
  isRead: boolean;
  createdAt: string;
  message: string | null;
  actor: { id: string; name: string | null; username?: string | null; pic?: string | null; image?: string | null } | null;
  post: { id: number; title: string; mediaurl: string | null; isMedia: boolean } | null;
  comment: { commentId: string; content: string } | null;
};

export default function Page() {
  const [items, setItems] = React.useState<Notification[]>([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const counts = useCounts();
  const { ref, inView } = useInView({ rootMargin: "500px 0px" });
  const busy = React.useRef(false);

  const load = React.useCallback(async (p: number) => {
    if (busy.current) return;
    busy.current = true;
    try {
      const res = await fetch(`/api/v1/notifications?page=${p}`, { cache: "no-store" });
      if (!res.ok) {
        setHasMore(false);
        return;
      }
      const data = await res.json();
      setItems((prev) => (p === 0 ? data.notifications : [...prev, ...data.notifications]));
      setHasMore(!!data.hasMore);
      setPage(p + 1);
    } catch {
      setHasMore(false);
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void load(0);
  }, [load]);

  // Arriving here is reading them.
  React.useEffect(() => {
    void fetch("/api/v1/notifications", { method: "POST" }).catch(() => {});
    counts.clear("notifications");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (inView && hasMore && !loading) void load(page);
  }, [inView, hasMore, loading, page, load]);

  const markAll = async () => {
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    counts.clear("notifications");
    await fetch("/api/v1/notifications", { method: "POST" }).catch(() => {});
  };

  const unread = items.filter((n) => !n.isRead).length;

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle={unread > 0 ? `${unread} new` : undefined}
        actions={
          unread > 0 ? (
            <button
              type="button"
              onClick={markAll}
              className="press flex items-center gap-1.5 rounded-full bg-tile-sunk px-3 py-1.5 text-[0.78rem] font-semibold text-ink-2"
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          ) : undefined
        }
      />

      {loading && items.length === 0 ? (
        <div className="divide-y divide-line">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4">
              <div className="skeleton h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-3 w-3/5 rounded-full" />
                <div className="skeleton h-2.5 w-1/4 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={<BellIcon size={26} />}
          title="No notifications yet"
          body="Reactions, comments, follows and mentions will show up here."
          action={{ label: "Find people to follow", href: "/people/find" }}
        />
      ) : (
        <ul className="divide-y divide-line">
          {items.map((n, i) => (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: Math.min(i, 8) * 0.03, ease: [0.16, 1, 0.3, 1] }}
            >
              <Row n={n} />
            </motion.li>
          ))}
        </ul>
      )}

      <div ref={ref} aria-hidden className="h-px" />
      {hasMore && items.length > 0 && (
        <div className="flex justify-center py-6 text-ink-3">
          <Loader2 size={18} className="animate-spin" />
        </div>
      )}
    </>
  );
}

function Row({ n }: { n: Notification }) {
  const actor = n.actor;
  const name = actor?.name ?? "Someone";

  const { verb, badge, href } = describe(n, name);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-tile-sunk",
        !n.isRead && "bg-glaze-softer"
      )}
    >
      <span className="relative shrink-0">
        <Avatar src={actor?.pic ?? actor?.image} name={name} userId={actor?.id} size="lg" />
        <span
          className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full ring-2"
          style={{ background: "var(--tile)", ["--tw-ring-color" as never]: "var(--tile)" }}
        >
          {badge}
        </span>
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[0.9rem] leading-snug text-ink">
          <span className="font-semibold">{name}</span> {verb}
        </span>

        {(n.comment?.content || n.post?.title) && (
          <span className="mt-0.5 block truncate text-[0.82rem] text-ink-3">
            {n.comment?.content ?? n.post?.title}
          </span>
        )}

        <span className="meta mt-1 block">{shortAgo(n.createdAt)}</span>
      </span>

      {n.post?.isMedia && n.post.mediaurl && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={n.post.mediaurl}
          alt=""
          className="h-12 w-12 shrink-0 rounded-[var(--r-chip)] object-cover"
        />
      )}

      {!n.isRead && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-glaze dark:bg-teal" />}
    </Link>
  );
}

/** Turns a notification row into its sentence, badge and destination. */
function describe(n: Notification, name: string) {
  const postHref = n.post ? `/postid/${n.post.id}` : `/profile?id=${n.actor?.id ?? ""}`;

  switch (n.type) {
    case "Like":
      return {
        verb: isReactionKey(n.message)
          ? `reacted ${n.message.toLowerCase()} to your post`
          : "liked your post",
        badge: <ReactionGlyph reaction={isReactionKey(n.message) ? n.message : "Like"} size={16} />,
        href: postHref,
      };
    case "Comment":
      return {
        verb: "commented on your post",
        badge: <MessageSquare size={11} className="text-glaze dark:text-teal" />,
        href: postHref,
      };
    case "Reply":
      return {
        verb: "replied to your comment",
        badge: <MessageSquare size={11} className="text-glaze dark:text-teal" />,
        href: postHref,
      };
    case "Follow":
      return {
        verb: "started following you",
        badge: <UserPlus size={11} className="text-glaze dark:text-teal" />,
        href: `/profile?id=${n.actor?.id ?? ""}`,
      };
    case "FollowRequest":
      return {
        verb: "asked to follow you",
        badge: <UserPlus size={11} className="text-saffron" />,
        href: "/people/requested",
      };
    case "Mention":
      return {
        verb: "mentioned you",
        badge: <AtSign size={11} className="text-iris" />,
        href: postHref,
      };
    case "Repost":
      return {
        verb: "reposted your post",
        badge: <RepostIcon size={11} className="text-teal" />,
        href: postHref,
      };
    case "StoryReply":
      return {
        verb: "replied to your story",
        badge: <MessageSquare size={11} className="text-ember" />,
        href: `/chat?id=${n.actor?.id ?? ""}`,
      };
    default:
      return {
        verb: n.message ?? "sent you an update",
        badge: <BellIcon size={11} className="text-ink-3" />,
        href: postHref,
      };
  }
}
