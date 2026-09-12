"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { hueOf, initials } from "@/lib/format";

/**
 * Avatar.
 *
 * A pictureless account is not a gray blank: it gets a warm tile keyed to a
 * deterministic hue from its id, with drawn initials. `ring` carries story
 * state — the throwing ring — so the feed, the rail and the profile all say the
 * same thing about the same person.
 */

export type AvatarRing = "none" | "unseen" | "seen" | "live" | "self";

const SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  "2xl": 88,
  "3xl": 112,
} as const;

export type AvatarSize = keyof typeof SIZES;

type Props = {
  src?: string | null;
  name?: string | null;
  userId?: string | null;
  size?: AvatarSize;
  ring?: AvatarRing;
  /** Renders the whole avatar as a link to that profile. */
  href?: string;
  className?: string;
  /** Small presence dot at the lower-right. */
  online?: boolean;
};

export function Avatar({
  src,
  name,
  userId,
  size = "md",
  ring = "none",
  href,
  className,
  online,
}: Props) {
  const px = SIZES[size];
  const hue = hueOf(userId ?? name ?? "");
  // Ring geometry: the gap between ring and portrait scales with the avatar.
  const pad = px >= 64 ? 3 : px >= 40 ? 2.5 : 2;
  const ringW = ring === "none" ? 0 : px >= 64 ? 2.5 : 2;
  const outer = px + (ring === "none" ? 0 : (pad + ringW) * 2);

  const inner = (
    <AvatarPrimitive.Root
      className="relative block shrink-0 overflow-hidden rounded-full"
      style={{ width: px, height: px }}
    >
      <AvatarPrimitive.Image
        src={src ?? undefined}
        alt={name ? `${name}’s profile picture` : "Profile picture"}
        className="h-full w-full object-cover"
      />
      <AvatarPrimitive.Fallback
        delayMs={0}
        className="flex h-full w-full items-center justify-center font-semibold text-ink"
        style={{
          background: `linear-gradient(145deg, oklch(0.88 0.055 ${hue}), oklch(0.79 0.075 ${(hue + 40) % 360}))`,
          fontSize: Math.max(9, Math.round(px * 0.36)),
          letterSpacing: "-0.02em",
        }}
      >
        {initials(name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );

  const ringStyle: React.CSSProperties =
    ring === "unseen"
      ? {
          background: `conic-gradient(from 210deg, var(--glaze), var(--saffron), var(--ember), var(--glaze))`,
        }
      : ring === "live"
        ? { background: "var(--ember)" }
        : ring === "seen"
          ? { background: "var(--line-strong)" }
          : ring === "self"
            ? { background: "transparent", border: "2px dashed var(--line-strong)" }
            : {};

  const body =
    ring === "none" ? (
      <div className={cn("relative shrink-0", className)}>
        {inner}
        {online && <PresenceDot px={px} />}
      </div>
    ) : (
      <div
        className={cn("relative grid shrink-0 place-items-center rounded-full", className)}
        style={{ width: outer, height: outer, padding: ringW, ...ringStyle }}
      >
        <div
          className="grid h-full w-full place-items-center rounded-full"
          style={{ padding: pad, background: "var(--ground)" }}
        >
          {inner}
        </div>
        {online && <PresenceDot px={px} />}
      </div>
    );

  if (href) {
    return (
      <Link href={href} className="press rounded-full" aria-label={name ? `Open ${name}’s profile` : "Open profile"}>
        {body}
      </Link>
    );
  }
  return body;
}

function PresenceDot({ px }: { px: number }) {
  const d = Math.max(9, Math.round(px * 0.26));
  return (
    <span
      className="absolute rounded-full border-2"
      style={{
        width: d,
        height: d,
        right: 0,
        bottom: 0,
        background: "var(--online)",
        borderColor: "var(--ground)",
      }}
      role="img"
      aria-label="Online now"
      title="Online now"
    />
  );
}

/** Overlapping avatars for “liked by” and viewer rows. */
export function AvatarStack({
  people,
  size = "xs",
  max = 3,
  className,
}: {
  people: { id?: string; name?: string | null; pic?: string | null; image?: string | null }[];
  size?: AvatarSize;
  max?: number;
  className?: string;
}) {
  const shown = people.slice(0, max);
  if (!shown.length) return null;
  return (
    <div className={cn("flex items-center", className)}>
      {shown.map((p, i) => (
        <div
          key={p.id ?? i}
          className="rounded-full ring-2"
          style={{
            marginLeft: i === 0 ? 0 : -8,
            zIndex: shown.length - i,
            // @ts-expect-error CSS custom property on ring color
            "--tw-ring-color": "var(--ground)",
          }}
        >
          <Avatar src={p.pic ?? p.image} name={p.name} userId={p.id} size={size} />
        </div>
      ))}
    </div>
  );
}

export const AvatarImage = AvatarPrimitive.Image;
export const AvatarFallback = AvatarPrimitive.Fallback;
export const AvatarRoot = AvatarPrimitive.Root;
