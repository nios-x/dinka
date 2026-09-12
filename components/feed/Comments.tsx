"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Send, Trash2, Loader2, BadgeCheck, CornerDownRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
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
import RichText from "./RichText";
import { HeartIcon } from "@/components/icons";
import { compact, handleOf, shortAgo } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * A post's comment thread.
 *
 * Two levels only: comments and their replies. Deeper nesting on a phone turns
 * into a column of slivers, so a reply to a reply joins the same thread with an
 * @mention instead.
 */

export type CommentNode = {
  commentId: string;
  content: string;
  createdAt: string;
  userId: string;
  user: {
    id: string;
    name: string | null;
    username?: string | null;
    image?: string | null;
    pic?: string | null;
    isVerified?: boolean;
  };
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
  replies: CommentNode[];
};

export default function Comments({
  postId,
  postAuthorId,
  onCountChange,
}: {
  postId: number;
  postAuthorId: string;
  onCountChange?: (delta: number) => void;
}) {
  const { data: session } = useSession();
  const me = session?.user as { id?: string; name?: string | null; image?: string | null } | undefined;

  const [comments, setComments] = React.useState<CommentNode[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [draft, setDraft] = React.useState("");
  const [replyTo, setReplyTo] = React.useState<CommentNode | null>(null);
  const [sending, setSending] = React.useState(false);
  const [pendingDelete, setPendingDelete] = React.useState<CommentNode | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    fetch(`/api/v1/comment/get?postId=${postId}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setComments(d?.comments ?? []))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [postId]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = draft.trim();
    if (!content || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/v1/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: content,
          postid: postId,
          parentId: replyTo?.commentId ?? null,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error);

      const node: CommentNode = { ...data.data, replies: [] };

      setComments((prev) =>
        replyTo
          ? prev.map((c) =>
              c.commentId === replyTo.commentId
                ? { ...c, replies: [...c.replies, node], replyCount: c.replyCount + 1 }
                : c
            )
          : [node, ...prev]
      );

      onCountChange?.(1);
      setDraft("");
      setReplyTo(null);
    } catch {
      toast.error("Could not post that comment");
    } finally {
      setSending(false);
    }
  };

  const toggleLike = async (node: CommentNode) => {
    const next = !node.isLiked;
    const patch = (c: CommentNode): CommentNode =>
      c.commentId === node.commentId
        ? { ...c, isLiked: next, likeCount: Math.max(0, c.likeCount + (next ? 1 : -1)) }
        : { ...c, replies: c.replies.map(patch) };

    setComments((prev) => prev.map(patch));

    try {
      const res = await fetch("/api/v1/comment/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId: node.commentId, liked: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setComments((prev) =>
        prev.map((c) => {
          const undo = (x: CommentNode): CommentNode =>
            x.commentId === node.commentId
              ? { ...x, isLiked: !next, likeCount: Math.max(0, x.likeCount + (next ? -1 : 1)) }
              : { ...x, replies: x.replies.map(undo) };
          return undo(c);
        })
      );
      toast.error("Could not save that");
    }
  };

  const remove = async () => {
    const node = pendingDelete;
    if (!node) return;
    setPendingDelete(null);

    const snapshot = comments;
    setComments((prev) =>
      prev
        .filter((c) => c.commentId !== node.commentId)
        .map((c) => ({ ...c, replies: c.replies.filter((r) => r.commentId !== node.commentId) }))
    );

    try {
      const res = await fetch("/api/v1/comment/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId: node.commentId }),
      });
      if (!res.ok) throw new Error();
      onCountChange?.(-1);
      toast.success("Comment deleted");
    } catch {
      setComments(snapshot);
      toast.error("Could not delete that comment");
    }
  };

  const expand = async (node: CommentNode) => {
    try {
      const res = await fetch(`/api/v1/comment/replies?parentId=${node.commentId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setComments((prev) =>
        prev.map((c) => (c.commentId === node.commentId ? { ...c, replies: data.replies } : c))
      );
    } catch {
      toast.error("Could not load those replies");
    }
  };

  const startReply = (node: CommentNode) => {
    setReplyTo(node);
    setDraft(`@${handleOf(node.user)} `);
    inputRef.current?.focus();
  };

  const total = comments.reduce((n, c) => n + 1 + c.replies.length, 0);

  return (
    <section className="pb-4">
      <h2 className="px-4 pb-2 pt-4 text-[0.95rem] font-semibold text-ink">
        {total > 0 ? `${compact(total)} ${total === 1 ? "comment" : "comments"}` : "Comments"}
      </h2>

      {loading ? (
        <div className="space-y-4 px-4 py-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="skeleton h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-3 w-28 rounded-full" />
                <div className="skeleton h-3 w-4/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="px-4 py-8 text-center text-[0.875rem] text-ink-3">
          No comments yet. Say the first thing.
        </p>
      ) : (
        <ul className="space-y-1">
          <AnimatePresence initial={false}>
            {comments.map((c) => (
              <motion.li
                key={c.commentId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <CommentRow
                  node={c}
                  meId={me?.id}
                  postAuthorId={postAuthorId}
                  onLike={toggleLike}
                  onReply={startReply}
                  onDelete={setPendingDelete}
                />

                {c.replies.length > 0 && (
                  <ul className="ml-8 border-l border-line pl-3 sm:ml-12">
                    {c.replies.map((r) => (
                      <li key={r.commentId}>
                        <CommentRow
                          node={r}
                          meId={me?.id}
                          postAuthorId={postAuthorId}
                          compact
                          onLike={toggleLike}
                          onReply={startReply}
                          onDelete={setPendingDelete}
                        />
                      </li>
                    ))}
                  </ul>
                )}

                {c.replyCount > c.replies.length && (
                  <button
                    type="button"
                    onClick={() => expand(c)}
                    className="ml-8 flex items-center gap-1.5 px-4 py-1.5 text-[0.8rem] font-medium text-ink-3 transition-colors hover:text-ink sm:ml-12"
                  >
                    <CornerDownRight size={13} />
                    Show {c.replyCount - c.replies.length} more{" "}
                    {c.replyCount - c.replies.length === 1 ? "reply" : "replies"}
                  </button>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {/* Composer — always reachable.

          On a phone the dock floats over the bottom of the viewport, so this
          parks above it rather than underneath: sticking at bottom-0 here put
          the comment field behind the dock's pill. On desktop there is no dock
          and it sits on the bottom edge. */}
      <form
        onSubmit={send}
        className="safe-b sticky bottom-[5.25rem] z-20 mt-3 rounded-[var(--r-sheet)] border border-line bg-tile/90 px-3 py-2.5 backdrop-blur-xl lg:bottom-0 lg:rounded-none lg:border-x-0 lg:border-b-0"
      >
        {replyTo && (
          <div className="mb-2 flex items-center justify-between gap-2 rounded-full bg-tile-sunk px-3 py-1.5">
            <p className="min-w-0 truncate text-[0.78rem] text-ink-2">
              Replying to <span className="font-semibold">{replyTo.user.name ?? "them"}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                setReplyTo(null);
                setDraft("");
              }}
              className="shrink-0 text-[0.75rem] font-semibold text-ember"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Avatar src={me?.image} name={me?.name} userId={me?.id} size="sm" />
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={replyTo ? "Write a reply…" : "Add a comment…"}
            maxLength={1000}
            aria-label={replyTo ? "Your reply" : "Your comment"}
            className="h-10 flex-1 rounded-full border border-line bg-tile px-4 text-[0.9rem] text-ink outline-none transition-colors focus:border-glaze"
          />
          <button
            type="submit"
            disabled={!draft.trim() || sending}
            aria-label="Post comment"
            className={cn(
              "press grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors",
              draft.trim() ? "bg-glaze text-glaze-on" : "bg-tile-sunk text-ink-4"
            )}
          >
            {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
      </form>

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this comment?</AlertDialogTitle>
            <AlertDialogDescription>
              It will be removed for everyone. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction onClick={remove} className="bg-ember text-white hover:bg-ember/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

function CommentRow({
  node,
  meId,
  postAuthorId,
  compact: isCompact,
  onLike,
  onReply,
  onDelete,
}: {
  node: CommentNode;
  meId?: string;
  postAuthorId: string;
  compact?: boolean;
  onLike: (n: CommentNode) => void;
  onReply: (n: CommentNode) => void;
  onDelete: (n: CommentNode) => void;
}) {
  // The post's author can moderate their own thread; you can delete your own.
  const canDelete = meId === node.userId || meId === postAuthorId;

  return (
    <div className="group flex gap-3 px-4 py-2.5">
      <Avatar
        src={node.user.pic ?? node.user.image}
        name={node.user.name}
        userId={node.user.id}
        size={isCompact ? "sm" : "md"}
        href={`/profile?id=${node.user.id}`}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <Link
            href={`/profile?id=${node.user.id}`}
            className="truncate text-[0.85rem] font-semibold text-ink hover:underline"
          >
            {node.user.name ?? "Someone"}
          </Link>
          {node.user.isVerified && (
            <BadgeCheck size={13} className="shrink-0 text-glaze dark:text-teal" aria-label="Verified" />
          )}
          {node.userId === postAuthorId && (
            <span className="shrink-0 rounded-full bg-tile-sunk px-1.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-ink-3">
              Author
            </span>
          )}
          <time className="meta shrink-0" dateTime={new Date(node.createdAt).toISOString()}>
            {shortAgo(node.createdAt)}
          </time>
        </div>

        <RichText className="mt-0.5 text-[0.9rem] leading-relaxed text-ink-2">{node.content}</RichText>

        <div className="mt-1 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onLike(node)}
            aria-pressed={node.isLiked}
            aria-label={node.isLiked ? "Remove your like" : "Like this comment"}
            className={cn(
              "flex items-center gap-1 text-[0.78rem] font-semibold transition-colors",
              node.isLiked ? "text-ember" : "text-ink-3 hover:text-ink-2"
            )}
          >
            <HeartIcon size={14} filled={node.isLiked} />
            {node.likeCount > 0 && <span className="tabular-nums">{compact(node.likeCount)}</span>}
          </button>

          {!isCompact && (
            <button
              type="button"
              onClick={() => onReply(node)}
              className="text-[0.78rem] font-semibold text-ink-3 transition-colors hover:text-ink-2"
            >
              Reply
            </button>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={() => onDelete(node)}
              aria-label="Delete this comment"
              className="text-ink-4 opacity-0 transition-opacity hover:text-ember focus-visible:opacity-100 group-hover:opacity-100"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
