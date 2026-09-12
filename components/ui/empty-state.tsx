"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Empty states.
 *
 * Every empty surface says what belongs there and offers the one action that
 * fills it — an empty screen with nothing to do is a dead end.
 */
export default function EmptyState({
  icon,
  title,
  body,
  action,
  secondary,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  body?: string;
  action?: { label: string; href?: string; onClick?: () => void };
  secondary?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center px-6 py-16 text-center", className)}>
      {icon && (
        <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-tile-sunk text-ink-3">
          {icon}
        </span>
      )}

      <h2 className="text-[1.15rem] font-semibold text-ink">{title}</h2>
      {body && <p className="mt-1.5 max-w-[34ch] text-[0.9rem] leading-relaxed text-ink-3">{body}</p>}

      {action && (
        <div className="mt-5">
          {action.href ? (
            <Link
              href={action.href}
              className="press inline-flex rounded-full bg-glaze px-5 py-2.5 text-[0.875rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover"
            >
              {action.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={action.onClick}
              className="press inline-flex rounded-full bg-glaze px-5 py-2.5 text-[0.875rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover"
            >
              {action.label}
            </button>
          )}
        </div>
      )}

      {secondary && (
        <Link
          href={secondary.href}
          className="mt-3 text-[0.85rem] font-medium text-ink-3 underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          {secondary.label}
        </Link>
      )}
    </div>
  );
}
