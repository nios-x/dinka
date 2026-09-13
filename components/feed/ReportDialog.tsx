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
import { cn } from "@/lib/utils";

/**
 * Reporting a post.
 *
 * Asking for a reason is not bureaucracy — it is the difference between a
 * signal somebody can act on and a number going up. The wording of each option
 * is what the reporter is claiming, in their words, not a taxonomy code.
 *
 * The confirmation says what actually happened and nothing more. The old
 * version of this feature said "we'll take a look" while writing nothing
 * anywhere, and the lesson is that the copy must not outrun the system.
 */

const REASONS = [
  { key: "Spam", label: "Spam", hint: "Repetitive, automated, or trying to sell something" },
  { key: "Harassment", label: "Harassment or bullying", hint: "Targeting someone, including me" },
  { key: "Hate", label: "Hate speech", hint: "Attacks a group of people" },
  { key: "Violence", label: "Violence or threats", hint: "Threatens or glorifies harm" },
  { key: "SelfHarm", label: "Self-harm", hint: "Someone may be in danger" },
  { key: "Nudity", label: "Nudity or sexual content", hint: "Not appropriate for this feed" },
  { key: "Misinformation", label: "Misinformation", hint: "Presents something false as fact" },
  { key: "Other", label: "Something else", hint: "Tell us in your own words" },
] as const;

export default function ReportDialog({
  postId,
  open,
  onOpenChange,
}: {
  postId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [reason, setReason] = React.useState<string | null>(null);
  const [detail, setDetail] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  // A fresh dialog every time: the previous report's reason should not be
  // pre-selected on the next post.
  React.useEffect(() => {
    if (!open) {
      setReason(null);
      setDetail("");
      setBusy(false);
    }
  }, [open]);

  const submit = async () => {
    if (!reason) return;
    setBusy(true);

    try {
      const res = await fetch("/api/v1/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, reason, detail }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.error ?? "Could not send that report");
        return;
      }

      onOpenChange(false);
      toast.success(
        data?.alreadyReported
          ? "You've already reported this post"
          : "Report received — thank you"
      );
    } catch {
      toast.error("Could not send that report");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-h-[85vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Report this post</AlertDialogTitle>
          <AlertDialogDescription>
            Reports are reviewed by a person. A post reported by several people is hidden while
            it waits. Your name is never shown to whoever posted it.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div role="radiogroup" aria-label="Reason for reporting" className="mt-1 flex flex-col gap-1">
          {REASONS.map((r) => (
            <button
              key={r.key}
              type="button"
              role="radio"
              aria-checked={reason === r.key}
              onClick={() => setReason(r.key)}
              className={cn(
                "rounded-[var(--r-field)] border px-3.5 py-2.5 text-left transition-colors",
                reason === r.key
                  ? "border-glaze bg-glaze-soft"
                  : "border-line hover:border-line-strong hover:bg-tile-sunk"
              )}
            >
              <span className="block text-[0.9rem] font-semibold text-ink">{r.label}</span>
              <span className="mt-0.5 block text-[0.8rem] text-ink-3">{r.hint}</span>
            </button>
          ))}
        </div>

        {reason && (
          <div className="mt-1">
            <label htmlFor="report-detail" className="mb-1.5 block text-[0.82rem] font-semibold text-ink-2">
              Anything else? <span className="font-normal text-ink-3">Optional</span>
            </label>
            <textarea
              id="report-detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value.slice(0, 500))}
              rows={3}
              placeholder="What should the reviewer know?"
              className="w-full resize-none rounded-[var(--r-field)] border border-line bg-tile px-3.5 py-2.5 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-glaze"
            />
          </div>
        )}

        <div className="mt-2 flex justify-end gap-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <button
            type="button"
            onClick={submit}
            disabled={!reason || busy}
            className="press inline-flex h-10 items-center justify-center gap-2 rounded-full bg-ember px-5 text-[0.875rem] font-semibold text-white transition-opacity disabled:opacity-45"
          >
            {busy && <Loader2 size={15} className="animate-spin" />}
            Send report
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
