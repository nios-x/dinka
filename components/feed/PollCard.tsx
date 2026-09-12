"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { compact } from "@/lib/format";

/**
 * A poll inside a post.
 *
 * Before you vote the options are plain buttons; after you vote each one fills
 * to its share. Results stay hidden until you answer or the poll closes, so the
 * standing count cannot steer the vote.
 */
export default function PollCard({
  poll,
  onVote,
}: {
  poll: {
    id: number;
    question: string | null;
    endsAt: string | null;
    options: { id: number; label: string; votes: number }[];
    myVote: number | null;
    totalVotes: number;
  };
  onVote: (optionId: number) => void;
}) {
  const closed = !!poll.endsAt && new Date(poll.endsAt).getTime() <= Date.now();
  const revealed = poll.myVote !== null || closed;
  const leader = poll.options.reduce(
    (best, o) => (o.votes > (best?.votes ?? -1) ? o : best),
    poll.options[0]
  );

  return (
    <div className="mt-3 space-y-2">
      {poll.question && (
        <p className="text-[0.95rem] font-semibold text-ink">{poll.question}</p>
      )}

      <div className="space-y-1.5">
        {poll.options.map((o) => {
          const share = poll.totalVotes > 0 ? (o.votes / poll.totalVotes) * 100 : 0;
          const mine = poll.myVote === o.id;
          const winning = revealed && leader?.id === o.id && poll.totalVotes > 0;

          return (
            <button
              key={o.id}
              type="button"
              disabled={closed}
              onClick={(e) => {
                e.stopPropagation();
                if (!closed) onVote(o.id);
              }}
              aria-pressed={mine}
              className={cn(
                "press relative flex w-full items-center gap-2 overflow-hidden rounded-[var(--r-field)] border px-3.5 py-2.5 text-left transition-colors",
                mine
                  ? "border-glaze dark:border-teal"
                  : "border-line hover:border-line-strong",
                closed && "cursor-default"
              )}
            >
              {revealed && (
                <motion.span
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-[var(--r-field)]",
                    winning ? "bg-glaze-soft dark:bg-teal-soft" : "bg-tile-sunk"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${share}%` }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden
                />
              )}

              <span className="relative flex min-w-0 flex-1 items-center gap-2">
                {mine && (
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-glaze text-glaze-on dark:bg-teal dark:text-ground">
                    <Check size={11} strokeWidth={3.5} />
                  </span>
                )}
                <span
                  className={cn(
                    "truncate text-[0.9rem]",
                    mine || winning ? "font-semibold text-ink" : "font-medium text-ink-2"
                  )}
                >
                  {o.label}
                </span>
              </span>

              {revealed && (
                <span className="relative shrink-0 text-[0.8rem] font-semibold tabular-nums text-ink-2">
                  {Math.round(share)}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="meta">
        {compact(poll.totalVotes)} {poll.totalVotes === 1 ? "vote" : "votes"}
        {poll.endsAt && (
          <>
            {" · "}
            {closed ? "Final result" : `Closes ${new Date(poll.endsAt).toLocaleDateString()}`}
          </>
        )}
        {!revealed && " · Vote to see results"}
      </p>
    </div>
  );
}
