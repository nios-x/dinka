/**
 * A tiny event bus so any surface — the dock, the rail, an empty state, a
 * keyboard shortcut — can open the composer without threading state through the
 * whole tree or re-mounting a second copy of it.
 */

export type ComposerIntent = {
  /** Pre-selects a tab in the composer. */
  mode?: "post" | "poll" | "story" | "reel";
  /** Seeds the body, e.g. a hashtag from a tag page. */
  seed?: string;
  /** Quote-posting an existing post. */
  quoteOf?: { id: number; title: string; authorName?: string | null };
};

const EVENT = "dinka:composer";
const PALETTE = "dinka:palette";

export function openComposer(intent: ComposerIntent = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ComposerIntent>(EVENT, { detail: intent }));
}

export function onComposer(handler: (intent: ComposerIntent) => void) {
  if (typeof window === "undefined") return () => {};
  const listener = (e: Event) => handler((e as CustomEvent<ComposerIntent>).detail ?? {});
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

export function openPalette(query?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string | undefined>(PALETTE, { detail: query }));
}

export function onPalette(handler: (query?: string) => void) {
  if (typeof window === "undefined") return () => {};
  const listener = (e: Event) => handler((e as CustomEvent<string | undefined>).detail);
  window.addEventListener(PALETTE, listener);
  return () => window.removeEventListener(PALETTE, listener);
}
