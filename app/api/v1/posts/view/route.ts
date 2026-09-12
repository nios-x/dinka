import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";

/** Counts a post view once per person, using SeenPost as the dedupe key. */
export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ postId: number }>(req);
  const postId = Number(body?.postId);
  if (!Number.isFinite(postId)) return NextResponse.json({ ok: false });

  try {
    const existing = await prisma.seenPost.findUnique({
      where: { userId_postId: { userId, postId } },
      select: { id: true },
    });
    if (!existing) {
      await prisma.seenPost.create({ data: { userId, postId } });
      await prisma.post.update({ where: { id: postId }, data: { viewCount: { increment: 1 } } });
    }
  } catch {
    // Racing duplicates are fine; the unique constraint is the source of truth.
  }
  return NextResponse.json({ ok: true });
}
