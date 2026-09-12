/**
 * Reactions.
 *
 * Six fired signals. Each one is a drawn glyph rather than a system emoji, so a
 * reaction row renders identically on every platform and sits in the same hand
 * as the icon set. `tint` is the color the count takes once you have reacted.
 */

export type ReactionKey = "Like" | "Love" | "Laugh" | "Wow" | "Sad" | "Fire";

export type ReactionDef = {
  key: ReactionKey;
  /** Verb shown in notifications and the a11y label. */
  label: string;
  /** CSS color token driving the active state. */
  tint: string;
  tintSoft: string;
};

export const REACTIONS: ReactionDef[] = [
  { key: "Like", label: "Like", tint: "var(--glaze)", tintSoft: "var(--glaze-soft)" },
  { key: "Love", label: "Love", tint: "var(--ember)", tintSoft: "var(--ember-soft)" },
  { key: "Laugh", label: "Laugh", tint: "var(--saffron)", tintSoft: "var(--saffron-soft)" },
  { key: "Wow", label: "Wow", tint: "var(--iris)", tintSoft: "var(--iris-soft)" },
  { key: "Sad", label: "Sad", tint: "var(--ink-2)", tintSoft: "var(--tile-sunk)" },
  { key: "Fire", label: "Fire", tint: "var(--ember)", tintSoft: "var(--ember-soft)" },
];

export const REACTION_MAP: Record<ReactionKey, ReactionDef> = Object.fromEntries(
  REACTIONS.map((r) => [r.key, r])
) as Record<ReactionKey, ReactionDef>;

export function isReactionKey(v: unknown): v is ReactionKey {
  return typeof v === "string" && v in REACTION_MAP;
}

/** Summed counts keyed by reaction, as returned by the API. */
export type ReactionCounts = Partial<Record<ReactionKey, number>>;

export function totalReactions(counts: ReactionCounts | null | undefined): number {
  if (!counts) return 0;
  return Object.values(counts).reduce<number>((a, b) => a + (b ?? 0), 0);
}

/** The reactions a post actually received, busiest first, for the summary row. */
export function topReactions(counts: ReactionCounts | null | undefined, limit = 3): ReactionKey[] {
  if (!counts) return [];
  return (Object.entries(counts) as [ReactionKey, number][])
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([k]) => k);
}
