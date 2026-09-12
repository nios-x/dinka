/** Display formatting shared by every surface. Counts, clocks, and names. */

/** 1 → "1", 1_240 → "1.2k", 48_200 → "48.2k", 1_200_000 → "1.2M" */
export function compact(n: number | null | undefined): string {
  const v = Number(n ?? 0);
  if (!Number.isFinite(v)) return "0";
  const abs = Math.abs(v);
  if (abs < 1000) return String(Math.round(v));
  if (abs < 1_000_000) {
    const k = v / 1000;
    return `${trimZero(k < 100 ? k.toFixed(1) : String(Math.round(k)))}k`;
  }
  const m = v / 1_000_000;
  return `${trimZero(m < 100 ? m.toFixed(1) : String(Math.round(m)))}M`;
}

function trimZero(s: string) {
  return s.endsWith(".0") ? s.slice(0, -2) : s;
}

/** Feed timestamps: "now", "4m", "3h", "2d", then a date. */
export function shortAgo(date: Date | string | number): string {
  const t = new Date(date).getTime();
  if (!Number.isFinite(t)) return "";
  const s = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (s < 45) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  if (s < 604800) return `${Math.floor(s / 86400)}d`;
  const d = new Date(t);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}

/** Stories count down instead of up: "18h left". */
export function timeLeft(expiresAt: Date | string): string {
  const ms = new Date(expiresAt).getTime() - Date.now();
  if (ms <= 0) return "expired";
  const h = Math.floor(ms / 3_600_000);
  if (h >= 1) return `${h}h left`;
  return `${Math.max(1, Math.floor(ms / 60_000))}m left`;
}

/** Chat bubbles show wall-clock time. */
export function clock(date: Date | string): string {
  return new Date(date).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

/** Day separators in a message thread. */
export function dayLabel(date: Date | string): string {
  const d = new Date(date);
  const today = new Date();
  const yest = new Date();
  yest.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yest.toDateString()) return "Yesterday";
  return d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
}

/** "Joined March 2024" */
export function joinedLabel(date: Date | string): string {
  return `Joined ${new Date(date).toLocaleDateString(undefined, { month: "long", year: "numeric" })}`;
}

/** A stable @handle even for accounts that never set one. */
export function handleOf(user: { username?: string | null; name?: string | null; id?: string } | null | undefined): string {
  if (!user) return "someone";
  if (user.username) return user.username;
  const base = (user.name ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  if (base) return base.slice(0, 18);
  return `user${(user.id ?? "").slice(0, 6)}`;
}

/** Two-letter fallback drawn inside the avatar when there is no picture. */
export function initials(name?: string | null): string {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "··";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * A deterministic warm hue per user id, used for the avatar fallback tile so a
 * pictureless account still reads as a specific person rather than a gray blank.
 */
export function hueOf(seed: string | null | undefined): number {
  const s = seed ?? "";
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
}

/** Engagement rate as shown on the insights surface. */
export function pct(n: number, digits = 1): string {
  if (!Number.isFinite(n)) return "0%";
  return `${n.toFixed(digits)}%`;
}

/** "+2.4%" / "−1.2%" with the sign the reader expects. */
export function delta(n: number, digits = 1): string {
  const sign = n > 0 ? "+" : n < 0 ? "−" : "";
  return `${sign}${Math.abs(n).toFixed(digits)}%`;
}
