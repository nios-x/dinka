"use client";

import React from "react";
import Link from "next/link";
import { href, prettyLink, tokenize } from "@/lib/richtext";
import { cn } from "@/lib/utils";

/**
 * Renders a post or comment body, turning #tags, @handles and URLs into real
 * links. Clicks on a link stop propagating so tapping a tag inside a post does
 * not also open the post.
 */
export default function RichText({
  children,
  className,
  /** Collapses to `clamp` lines with a "more" control when the body is long. */
  clamp,
}: {
  children: string;
  className?: string;
  clamp?: number;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const tokens = React.useMemo(() => tokenize(children ?? ""), [children]);

  // Only offer "more" when there is meaningfully more to show.
  const longEnough =
    !!clamp && ((children ?? "").length > clamp * 68 || (children ?? "").split("\n").length > clamp);
  const clamped = !!clamp && longEnough && !expanded;

  return (
    <div className={cn("min-w-0", className)}>
      <p
        className={cn("whitespace-pre-wrap break-words", clamped && "line-clamp-[var(--clamp)]")}
        style={clamped ? ({ ["--clamp" as never]: String(clamp) } as React.CSSProperties) : undefined}
      >
        {tokens.map((t, i) => {
          if (t.type === "text") return <React.Fragment key={i}>{t.value}</React.Fragment>;
          if (t.type === "tag")
            return (
              <Link
                key={i}
                href={`/tag/${encodeURIComponent(t.value)}`}
                onClick={(e) => e.stopPropagation()}
                className="font-medium text-glaze hover:underline dark:text-teal"
              >
                {t.raw}
              </Link>
            );
          if (t.type === "mention")
            return (
              <Link
                key={i}
                href={`/u/${encodeURIComponent(t.value)}`}
                onClick={(e) => e.stopPropagation()}
                className="font-medium text-glaze hover:underline dark:text-teal"
              >
                {t.raw}
              </Link>
            );
          return (
            <a
              key={i}
              href={href(t.value)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              onClick={(e) => e.stopPropagation()}
              className="font-medium text-glaze underline decoration-line-strong hover:decoration-current dark:text-teal"
            >
              {prettyLink(t.value)}
            </a>
          );
        })}
      </p>

      {longEnough && !expanded && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(true);
          }}
          className="mt-0.5 text-[0.85rem] font-medium text-ink-3 transition-colors hover:text-ink"
        >
          Show more
        </button>
      )}
    </div>
  );
}
