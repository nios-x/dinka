"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  MoreHorizontal,
  Globe,
  Users,
  Trash2,
  Link2,
  Flag,
  Pencil,
  VolumeX,
  Sparkles,
  MapPin,
  BadgeCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { compact, handleOf, shortAgo } from "@/lib/format";
import type { FeedPost } from "@/app/Providers/PostsProvider";
import type { ReactionKey } from "@/lib/reactions";
import RichText from "./RichText";
import PostMedia from "./PostMedia";
import PollCard from "./PollCard";
import ReportDialog from "./ReportDialog";
import EditPostDialog from "./EditPostDialog";
import ReactionBar from "./ReactionBar";
import { RepostIcon } from "@/components/icons";
import { openComposer } from "@/components/composer/composer-bus";

/**
 * A post in the feed.
 *
 * One card renders every kind — text, image, video, poll, and quote-repost —
 * so a post looks the same wherever it appears. The whole card is a link target
 * except for the controls inside it, which stop propagation.
 */
export default function PostCard({
  post,
  onReact,
  onBookmark,
  onDelete,
  onVote,
  /** The post page renders the body in full and without its own link. */
  detail = false,
  className,
}: {
  post: FeedPost;
  onReact: (id: number, r: ReactionKey | null) => void;
  onBookmark: (id: number, saved: boolean) => void;
  onDelete?: (id: number) => void;
  onVote?: (postId: number, optionId: number) => void;
  detail?: boolean;
  className?: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [reporting, setReporting] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  // The edit lands here first so the card updates the moment it saves, rather
  // than waiting for whichever list owns this post to refetch.
  const [edited, setEdited] = React.useState<{ title: string; editedAt: string } | null>(null);

  /**
   * Opening the post from anywhere on the card.
   *
   * This used to be a link stretched across the card behind its contents, which
   * an opaque card background covers — the target was unreachable. Routing from
   * the card's own click instead keeps the whole surface active *and* leaves the
   * post text selectable, which a stretched overlay does not. The timestamp is a
   * real link, so keyboard users and "copy link address" still have a permalink.
   */
  const openPost = (e: React.MouseEvent<HTMLElement>) => {
    if (detail) return;
    const target = e.target as HTMLElement;
    // Anything interactive — and anything that opted out, like the media,
    // where a tap is the first half of a double-tap like — handles its own click.
    if (target.closest("a,button,video,input,textarea,[data-nav-skip],[role='menu'],[role='dialog']"))
      return;
    // Selecting text should never navigate.
    if (window.getSelection()?.toString()) return;
    router.push(`/postid/${post.id}`);
  };

  // What this card is showing right now: the post as loaded, unless an edit
  // was saved from here, in which case that is newer than whatever the list
  // handed down.
  const body = edited?.title ?? post.title;
  const editedAt = edited?.editedAt ?? post.editedAt ?? null;

  const me = (session?.user as { id?: string } | undefined)?.id;
  const isAuthor = !!me && me === post.authorId;
  const author = post.author ?? { name: "Someone" };
  const profileHref = `/profile?id=${post.authorId}`;

  const share = async () => {
    const url = `${window.location.origin}/postid/${post.id}`;
    const payload = {
      title: `${author.name ?? "Someone"} on Dinka`,
      text: body?.slice(0, 120),
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
      void fetch("/api/v1/posts/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id }),
      });
    } catch (err: any) {
      // A cancelled share sheet is not an error worth reporting.
      if (err?.name !== "AbortError") toast.error("Could not share that post");
    }
  };

  const mute = async () => {
    try {
      const res = await fetch("/api/v1/users/mute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId: post.authorId, muted: true }),
      });
      if (!res.ok) throw new Error();
      // Said plainly, because the whole point of muting is that the other
      // person is not told and nothing else about the relationship changes.
      toast.success(`Muted ${author.name ?? "that account"} — they won't know`);
    } catch {
      toast.error("Could not mute that account");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/postid/${post.id}`);
      toast.success("Link copied");
    } catch {
      toast.error("Could not copy the link");
    }
  };

  return (
    <>
      <article
        onClick={openPost}
        className={cn(
          "group relative transition-shadow",
          // Flush at every width: the only edge a post has is the hairline
          // under it, which doubles as the divider to the next one.
          "card card-post rounded-none border-x-0 border-t-0 shadow-none",
          !detail && "cursor-pointer",
          className
        )}
      >
        {/* Repost attribution sits above the card's own header. */}
        {post.kind === "Repost" && post.repostOf && (
          <p className="flex items-center gap-1.5 px-4 pt-3 text-[0.78rem] font-medium text-ink-3">
            <RepostIcon size={14} />
            {isAuthor ? "You reposted" : `${author.name ?? "Someone"} reposted`}
          </p>
        )}

        <header className="flex items-start gap-3 p-4 pb-2.5">
          <Avatar
            src={author.pic ?? author.image}
            name={author.name}
            userId={post.authorId}
            size="lg"
            href={profileHref}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Link
                href={profileHref}
                className="truncate text-[0.95rem] font-semibold text-ink hover:underline"
              >
                {author.name ?? "Someone"}
              </Link>
              {author.isVerified && (
                <BadgeCheck size={15} className="shrink-0 text-glaze dark:text-teal" aria-label="Verified" />
              )}
              {post.isSynthetic && (
                <span
                  className="inline-flex shrink-0 items-center gap-1 rounded-full bg-iris-soft px-1.5 py-0.5 text-[10px] font-semibold text-iris"
                  title="Written by Dinka's AI, not a person"
                >
                  <Sparkles size={10} strokeWidth={2.5} />
                  AI
                </span>
              )}
            </div>

            <p className="meta flex items-center gap-1.5 truncate">
              <span className="truncate">@{handleOf(author)}</span>
              <span aria-hidden>·</span>
              {/* The permalink. Keyboard and right-click reach the post here. */}
              <Link
                href={`/postid/${post.id}`}
                className="shrink-0 transition-colors hover:text-ink-2 hover:underline"
              >
                <time dateTime={new Date(post.createdAt).toISOString()}>
                  {shortAgo(post.createdAt)}
                </time>
                <span className="sr-only"> — open this post</span>
              </Link>
              {editedAt && (
                <>
                  <span aria-hidden>·</span>
                  <span
                    className="shrink-0"
                    title={`Edited ${new Date(editedAt).toLocaleString()}`}
                  >
                    edited
                  </span>
                </>
              )}
              <span aria-hidden>·</span>
              {post.visiblity === "Public" ? (
                <Globe size={11} aria-label="Public" />
              ) : (
                <Users size={11} aria-label="Followers only" />
              )}
              {post.location && (
                <>
                  <span aria-hidden>·</span>
                  <span className="inline-flex min-w-0 items-center gap-0.5 truncate">
                    <MapPin size={11} />
                    {post.location}
                  </span>
                </>
              )}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Post options"
                onClick={(e) => e.stopPropagation()}
                className="press -mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-3 transition-colors hover:bg-tile-sunk hover:text-ink"
              >
                <MoreHorizontal size={19} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem onClick={copyLink}>
                <Link2 size={15} />
                Copy link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBookmark(post.id, !post.isBookmarked)}>
                {post.isBookmarked ? "Remove from saved" : "Save post"}
              </DropdownMenuItem>
              {!isAuthor && (
                <>
                  <DropdownMenuItem onClick={mute}>
                    <VolumeX size={15} />
                    Mute {author.name ?? "this account"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setReporting(true)}>
                    <Flag size={15} />
                    Report
                  </DropdownMenuItem>
                </>
              )}
              {isAuthor && (
                <DropdownMenuItem onClick={() => setEditing(true)}>
                  <Pencil size={15} />
                  Edit post
                </DropdownMenuItem>
              )}
              {isAuthor && onDelete && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setConfirmDelete(true)}
                  >
                    <Trash2 size={15} />
                    Delete post
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {body && (
          // The card is clickable, but its words are still words: the caret
          // over the body says the text can be selected.
          <div className="cursor-text px-4 pb-3">
            {detail ? (
              <RichText className="text-[1.05rem] leading-[1.6] text-ink">{body}</RichText>
            ) : (
              <RichText clamp={6} className="text-[0.975rem] leading-[1.6] text-ink">
                {body}
              </RichText>
            )}
          </div>
        )}

        {post.isMedia && post.mediaurl && (
          <div className="pb-3">
            <PostMedia
              rounded={false}
              url={post.mediaurl}
              type={post.mediaType}
              width={post.mediaWidth}
              height={post.mediaHeight}
              alt={post.title ? `Image from a post: ${post.title.slice(0, 90)}` : "Post image"}
              onDoubleLike={() => {
                if (!post.myReaction) onReact(post.id, "Love");
              }}
            />
          </div>
        )}

        {post.poll && onVote && (
          <div className="px-4 pb-3">
            <PollCard poll={post.poll} onVote={(optionId) => onVote(post.id, optionId)} />
          </div>
        )}

        {/* The quoted post, rendered as a nested preview. */}
        {post.repostOf && (
          <div className="px-4 pb-3">
            <Link
              href={`/postid/${post.repostOf.id}`}
              onClick={(e) => e.stopPropagation()}
              className="block overflow-hidden rounded-[var(--r-tile)] border border-line transition-colors hover:border-line-strong"
            >
              <div className="flex items-center gap-2 px-3.5 pb-1.5 pt-3">
                <Avatar
                  src={post.repostOf.author?.pic}
                  name={post.repostOf.author?.name}
                  userId={post.repostOf.authorId}
                  size="xs"
                />
                <span className="truncate text-[0.85rem] font-semibold text-ink">
                  {post.repostOf.author?.name ?? "Someone"}
                </span>
                <span className="meta shrink-0">{shortAgo(post.repostOf.createdAt)}</span>
              </div>
              <p className="line-clamp-3 px-3.5 pb-3 text-[0.875rem] leading-relaxed text-ink-2">
                {post.repostOf.title}
              </p>
              {post.repostOf.isMedia && post.repostOf.mediaurl && (
                <PostMedia url={post.repostOf.mediaurl} rounded={false} alt="Quoted post image" />
              )}
            </Link>
          </div>
        )}

        {post.tags.length > 0 && !post.title?.includes("#") && (
          <div className="flex flex-wrap gap-1.5 px-4 pb-3">
            {post.tags.map((t) => (
              <Link
                key={t}
                href={`/tag/${encodeURIComponent(t)}`}
                onClick={(e) => e.stopPropagation()}
                className="rounded-full bg-tile-sunk px-2.5 py-1 text-[0.78rem] font-medium text-ink-2 transition-colors hover:text-ink"
              >
                #{t}
              </Link>
            ))}
          </div>
        )}

        <div className="px-3 pb-2.5">
          <ReactionBar
            postId={post.id}
            myReaction={post.myReaction}
            counts={post.reactionCounts}
            commentCount={post.commentCount}
            repostCount={post.repostCount}
            bookmarked={post.isBookmarked}
            onReact={(r) => onReact(post.id, r)}
            onBookmark={(saved) => onBookmark(post.id, saved)}
            onShare={share}
            onRepost={() =>
              openComposer({
                mode: "post",
                quoteOf: { id: post.id, title: post.title, authorName: author.name },
              })
            }
          />
        </div>

        {detail && post.viewCount > 0 && (
          <p className="meta border-t border-line px-4 py-2.5">
            {compact(post.viewCount)} views
          </p>
        )}

      </article>

      <ReportDialog postId={post.id} open={reporting} onOpenChange={setReporting} />

      <EditPostDialog
        postId={post.id}
        initialText={body}
        open={editing}
        onOpenChange={setEditing}
        onSaved={setEdited}
      />

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              It will be removed for everyone, along with its comments and reactions. This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete?.(post.id);
                if (detail) router.push("/");
              }}
              className="bg-ember text-white hover:bg-ember/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
