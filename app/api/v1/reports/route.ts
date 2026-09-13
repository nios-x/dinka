import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";
import { limit } from "@/lib/rate-limit";
import type { ReportReason } from "@/generated/prisma";

/**
 * Reporting a post.
 *
 * This replaces a button that showed "Thanks — we'll take a look" and wrote
 * nothing anywhere. The distance between those two things is the distance
 * between a product and a mockup of one: somebody reporting harassment is
 * telling you something, and the old button's only effect was to stop them
 * telling anyone else.
 *
 * Three distinct people are enough to pull a post out of circulation. It stays
 * in the database and its author keeps seeing it, so the automatic call is
 * reversible by a human and by design errs toward hiding rather than deleting.
 */

const REASONS: ReportReason[] = [
  "Spam",
  "Harassment",
  "Hate",
  "Violence",
  "SelfHarm",
  "Nudity",
  "Misinformation",
  "Other",
];

/** Distinct reporters needed before a post leaves every feed. */
const HIDE_THRESHOLD = 3;

export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  // Mass-reporting is itself an abuse vector — a coordinated group hiding
  // someone they disagree with. A ceiling per reporter blunts the automated
  // version of it.
  const limited = limit(req, { key: "report", limit: 20, windowSeconds: 3600, userId });
  if (limited) return limited;

  const body = await readJson<{ postId: number; reason: string; detail?: string }>(req);
  const postId = Number(body?.postId);
  const reason = REASONS.includes(body?.reason as ReportReason)
    ? (body!.reason as ReportReason)
    : null;

  if (!Number.isInteger(postId) || postId <= 0 || !reason) {
    return NextResponse.json({ error: "Pick a reason for the report" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { id: true, authorId: true, hiddenAt: true },
  });

  if (!post) return NextResponse.json({ error: "That post no longer exists" }, { status: 404 });

  if (post.authorId === userId) {
    return NextResponse.json(
      { error: "You can delete your own post instead of reporting it" },
      { status: 400 }
    );
  }

  const detail = typeof body?.detail === "string" ? body.detail.trim().slice(0, 500) || null : null;

  try {
    await prisma.report.create({
      data: { reporterId: userId, postId, reason, detail },
    });
  } catch {
    // The unique index on (reporter, post) is what makes the threshold count
    // people rather than clicks. A second report from the same account is not
    // an error worth showing — they have already been heard.
    return NextResponse.json({ reported: true, alreadyReported: true });
  }

  if (!post.hiddenAt) {
    const reporters = await prisma.report.count({ where: { postId } });
    if (reporters >= HIDE_THRESHOLD) {
      await prisma.post.update({ where: { id: postId }, data: { hiddenAt: new Date() } });
    }
  }

  return NextResponse.json({ reported: true });
}
