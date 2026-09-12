/**
 * Presence.
 *
 * Every signed-in client touches `User.lastSeenAt` on a heartbeat. Anyone whose
 * last beat landed inside the window counts as online. The window is wider than
 * the heartbeat interval so one dropped request does not flicker someone
 * offline and back.
 */

/** Someone is online if they were seen within the last two minutes. */
export const ONLINE_WINDOW_MS = 2 * 60 * 1000;

/** How often a client reports in. Must stay well under the window. */
export const HEARTBEAT_MS = 45_000;

export function isOnline(lastSeenAt: Date | string | null | undefined): boolean {
  if (!lastSeenAt) return false;
  const t = new Date(lastSeenAt).getTime();
  if (!Number.isFinite(t)) return false;
  return Date.now() - t < ONLINE_WINDOW_MS;
}

/** "Active now", "Active 6m ago", "Active 3h ago", "Active 2d ago". */
export function presenceLabel(lastSeenAt: Date | string | null | undefined): string {
  if (!lastSeenAt) return "Offline";
  if (isOnline(lastSeenAt)) return "Active now";

  const seconds = Math.max(0, Math.floor((Date.now() - new Date(lastSeenAt).getTime()) / 1000));
  if (seconds < 3600) return `Active ${Math.max(1, Math.floor(seconds / 60))}m ago`;
  if (seconds < 86400) return `Active ${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `Active ${Math.floor(seconds / 86400)}d ago`;
  return `Active ${new Date(lastSeenAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
}
