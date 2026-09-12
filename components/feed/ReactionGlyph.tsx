"use client";

import React from "react";
import type { ReactionKey } from "@/lib/reactions";

/**
 * Reaction glyphs, drawn rather than typed.
 *
 * System emoji change shape per platform and per OS version, which makes a
 * reaction row look different on every device. These are fixed 24px SVGs in one
 * palette, so a row of reactions is the same picture everywhere.
 */

type Props = { size?: number; className?: string };

function Face({
  size = 24,
  children,
  className,
}: Props & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="12" r="10" fill="#FFC83D" />
      {children}
    </svg>
  );
}

export function LikeGlyph({ size = 24, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="12" cy="12" r="10" fill="#2F81F7" />
      <path
        d="M8.1 11.3h1.5l2.2-3.9a.9.9 0 0 1 1.66.66l-.5 2.44h2.6a1.2 1.2 0 0 1 1.17 1.47l-.83 3.6a1.6 1.6 0 0 1-1.56 1.23H9.4"
        fill="#fff"
      />
      <rect x="6" y="11" width="2.6" height="5.9" rx="1.1" fill="#DDE9FA" />
    </svg>
  );
}

export function LoveGlyph({ size = 24, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="12" cy="12" r="10" fill="#F0405C" />
      <path
        d="M12 17.4s-4.9-2.9-4.9-6.2a2.75 2.75 0 0 1 4.9-1.72 2.75 2.75 0 0 1 4.9 1.72c0 3.3-4.9 6.2-4.9 6.2Z"
        fill="#fff"
      />
    </svg>
  );
}

export function LaughGlyph({ size = 24, className }: Props) {
  return (
    <Face size={size} className={className}>
      <path d="M6.6 12.4h10.8a5.4 5.4 0 0 1-10.8 0Z" fill="#2B1A0B" />
      <path d="M8.2 15.9a5.4 5.4 0 0 0 7.6 0 6 6 0 0 0-7.6 0Z" fill="#F2566E" />
      <path d="M7.1 8.6c.8-.8 2-.8 2.8 0M14.1 8.6c.8-.8 2-.8 2.8 0" stroke="#2B1A0B" strokeWidth="1.5" strokeLinecap="round" />
    </Face>
  );
}

export function WowGlyph({ size = 24, className }: Props) {
  return (
    <Face size={size} className={className}>
      <ellipse cx="8.7" cy="10.2" rx="1.35" ry="1.8" fill="#2B1A0B" />
      <ellipse cx="15.3" cy="10.2" rx="1.35" ry="1.8" fill="#2B1A0B" />
      <ellipse cx="12" cy="15.7" rx="2.2" ry="2.8" fill="#2B1A0B" />
      <path d="M6.4 7.3c.9-1 2.3-1.2 3.4-.5M17.6 7.3c-.9-1-2.3-1.2-3.4-.5" stroke="#2B1A0B" strokeWidth="1.3" strokeLinecap="round" />
    </Face>
  );
}

export function SadGlyph({ size = 24, className }: Props) {
  return (
    <Face size={size} className={className}>
      <circle cx="8.9" cy="10.4" r="1.3" fill="#2B1A0B" />
      <circle cx="15.1" cy="10.4" r="1.3" fill="#2B1A0B" />
      <path d="M8.6 16.6a4.2 4.2 0 0 1 6.8 0" stroke="#2B1A0B" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6.6 12.2c0 1.9 1 3.3 1 3.3s1-1.4 1-3.3a1 1 0 0 0-2 0Z" fill="#5AB4F0" />
    </Face>
  );
}

export function FireGlyph({ size = 24, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12.6 2.2c.4 2.6-.7 4-2 5.3-1.5 1.5-3.4 3-3.4 6.1a6.8 6.8 0 0 0 13.6 0c0-4.3-3.2-6.4-4.8-9.6-.7 1.1-1.5 1.6-2.2 1.8.1-1.3-.2-2.6-1.2-3.6Z"
        fill="#FF7A2F"
      />
      <path
        d="M12.2 12c.3 1.5-.5 2.2-1.1 2.9-.6.7-1 1.4-1 2.4a3.2 3.2 0 0 0 6.4 0c0-2.2-1.7-3.3-2.7-5.1-.4.6-.9.9-1.6.9Z"
        fill="#FFD02F"
      />
    </svg>
  );
}

const GLYPHS: Record<ReactionKey, React.ComponentType<Props>> = {
  Like: LikeGlyph,
  Love: LoveGlyph,
  Laugh: LaughGlyph,
  Wow: WowGlyph,
  Sad: SadGlyph,
  Fire: FireGlyph,
};

export default function ReactionGlyph({
  reaction,
  size = 24,
  className,
}: Props & { reaction: ReactionKey }) {
  const Glyph = GLYPHS[reaction] ?? LikeGlyph;
  return <Glyph size={size} className={className} />;
}
