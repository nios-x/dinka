"use client";

import React from "react";
import Link from "next/link";
import { BadgeCheck, Check } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { compact, handleOf } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * One person in a list.
 *
 * Used by every people surface — followers, suggestions, requests — so the same
 * account looks the same wherever it is listed. Actions are passed in because
 * the verb differs per surface (Follow, Accept, Remove).
 */

export type Person = {
  id: string;
  name: string | null;
  username?: string | null;
  pic?: string | null;
  image?: string | null;
  bio?: string | null;
  isVerified?: boolean;
  followerCount?: number;
  postCount?: number;
};

export default function PersonRow({
  person,
  primary,
  secondary,
  pending,
  className,
}: {
  person: Person;
  primary?: { label: string; onClick: () => void; done?: boolean };
  secondary?: { label: string; onClick: () => void };
  pending?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-3 px-4 py-3.5", className)}>
      <Avatar
        src={person.pic ?? person.image}
        name={person.name}
        userId={person.id}
        size="xl"
        href={`/profile?id=${person.id}`}
      />

      <div className="min-w-0 flex-1">
        <Link href={`/profile?id=${person.id}`} className="group block min-w-0">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-[0.95rem] font-semibold text-ink group-hover:underline">
              {person.name ?? "Someone"}
            </span>
            {person.isVerified && (
              <BadgeCheck size={14} className="shrink-0 text-glaze dark:text-teal" aria-label="Verified" />
            )}
          </span>
          <span className="meta block truncate">
            @{handleOf(person)}
            {typeof person.followerCount === "number" && person.followerCount > 0 && (
              <> · {compact(person.followerCount)} followers</>
            )}
          </span>
        </Link>

        {person.bio && (
          <p className="mt-1 line-clamp-2 text-[0.85rem] leading-snug text-ink-2">{person.bio}</p>
        )}

        {secondary && (
          <button
            type="button"
            onClick={secondary.onClick}
            className="mt-2 text-[0.8rem] font-semibold text-ink-3 transition-colors hover:text-ember"
          >
            {secondary.label}
          </button>
        )}
      </div>

      {primary && (
        <button
          type="button"
          onClick={primary.onClick}
          disabled={pending}
          className={cn(
            "press flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-[0.82rem] font-semibold transition-colors disabled:opacity-60",
            primary.done
              ? "border border-line text-ink hover:border-ember hover:text-ember"
              : "bg-glaze text-glaze-on hover:bg-glaze-hover"
          )}
        >
          {primary.done && <Check size={14} strokeWidth={3} />}
          {primary.label}
        </button>
      )}
    </div>
  );
}
