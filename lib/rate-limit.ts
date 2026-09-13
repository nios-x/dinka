import { NextResponse } from "next/server";

/**
 * Rate limiting.
 *
 * A fixed-window counter held in module memory. Two honest limitations, stated
 * here so nobody mistakes this for more than it is:
 *
 *   1. Serverless runs many instances, so the real ceiling is the configured
 *      limit multiplied by however many instances are warm. It still turns an
 *      unbounded attack into a bounded one, which is the whole point for the
 *      OTP path — a million-guess walk through a 6-digit code becomes
 *      impossible long before instance count matters.
 *   2. Memory resets on cold start. An attacker who can force restarts gets a
 *      fresh budget. Moving the store to Redis is a drop-in change to
 *      `hit()` alone; every call site stays as written.
 *
 * Where a real cap must hold no matter what — OTP attempts — the count also
 * lives in the database, and this is only the cheap first line.
 */

type Window = { count: number; resetAt: number };

const WINDOWS = new Map<string, Window>();

/** Stops the map from growing without bound on a long-lived instance. */
function sweep(now: number) {
  if (WINDOWS.size < 5000) return;
  for (const [key, window] of WINDOWS) {
    if (window.resetAt <= now) WINDOWS.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  /** Seconds until the window resets. Sent as `Retry-After`. */
  retryAfter: number;
};

/**
 * Records one hit against `key`.
 *
 * `limit` requests are allowed per `windowSeconds`. The first call in a window
 * starts the clock, so a burst of one request per window forever is fine and a
 * burst of `limit + 1` in a second is not.
 */
export function hit(key: string, limit: number, windowSeconds: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = WINDOWS.get(key);

  if (!existing || existing.resetAt <= now) {
    WINDOWS.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  return {
    ok: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    retryAfter,
  };
}

/**
 * The caller's identity for limiting purposes.
 *
 * A signed-in user is limited as themselves wherever possible, because IP is a
 * poor key: a university or an office shares one, and a determined caller
 * changes theirs. IP is the fallback for the routes that run before there is a
 * session — which is exactly where the abuse is.
 */
export function callerKey(req: Request, userId?: string | null): string {
  if (userId) return `u:${userId}`;

  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return `ip:${ip}`;
}

/**
 * Guards a route. Returns a ready-made 429 when the caller is over, or null
 * when the request should proceed:
 *
 *   const limited = limit(req, { key: "signup", limit: 5, windowSeconds: 600 });
 *   if (limited) return limited;
 */
export function limit(
  req: Request,
  options: { key: string; limit: number; windowSeconds: number; userId?: string | null }
): NextResponse | null {
  const result = hit(
    `${options.key}:${callerKey(req, options.userId)}`,
    options.limit,
    options.windowSeconds
  );

  if (result.ok) return null;

  return NextResponse.json(
    { error: "Too many requests — give it a moment and try again" },
    { status: 429, headers: { "Retry-After": String(result.retryAfter) } }
  );
}
