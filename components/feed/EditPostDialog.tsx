"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/**
 * Editing the text of your own post.
 *
 * The dialog says plainly that the post will be marked as edited, because the
 * mark is not a punishment and people should not discover it afterwards. What
 * cannot be changed here — the photo, the poll — is absent rather than
 * disabled: a control you can see and cannot use is a worse answer than no
 * control.
 */
export default function EditPostDialog({
  postId,
  initialText,
  open,
  onOpenChange,
  onSaved,
}: {
  postId: number;
  initialText: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (post: { title: string; editedAt: string }) => void;
}) {
  const [text, setText] = React.useState(initialText);
  const [busy, setBusy] = React.useState(false);

  // Reopening after a cancel should show the post as it stands, not the
  // abandoned draft.
  React.useEffect(() => {
    if (open) setText(initialText);
  }, [open, initialText]);

  const save = async () => {
    if (text.trim() === initialText.trim()) {
      onOpenChange(false);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/v1/posts/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, title: text }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.error ?? "Could not save that edit");
        return;
      }

      onSaved({
        title: data?.data?.title ?? text.trim(),
        editedAt: data?.data?.editedAt ?? new Date().toISOString(),
      });
      onOpenChange(false);
      toast.success("Post updated");
    } catch {
      toast.error("Could not save that edit");
    } finally {
      setBusy(false);
    }
  };

  const remaining = 2000 - text.length;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit your post</AlertDialogTitle>
          <AlertDialogDescription>
            Only the text changes. Anyone reading it will see that it was edited.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 2000))}
          rows={6}
          autoFocus
          aria-label="Post text"
          className="w-full resize-none rounded-[var(--r-field)] border border-line bg-tile px-3.5 py-3 text-[0.95rem] leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-glaze"
        />

        <div className="flex items-center justify-between gap-3">
          <span
            className={remaining < 100 ? "text-[0.78rem] font-semibold tabular-nums text-ember" : "meta tabular-nums"}
          >
            {remaining < 100 ? `${remaining} left` : ""}
          </span>

          <div className="flex gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <button
              type="button"
              onClick={save}
              disabled={busy}
              className="press inline-flex h-10 items-center justify-center gap-2 rounded-full bg-glaze px-5 text-[0.875rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover disabled:opacity-45"
            >
              {busy && <Loader2 size={15} className="animate-spin" />}
              Save changes
            </button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
