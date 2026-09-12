import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";

/** Likes or unlikes a comment. */
export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ commentId: string; liked: boolean }>(req);
  const commentId = body?.commentId;
  if (!commentId) return NextResponse.json({ error: "A comment id is required" }, { status: 400 });

  if (body?.liked === false) {
    await prisma.commentLike.deleteMany({ where: { commentId, userId } });
  } else {
    try {
      await prisma.commentLike.create({ data: { commentId, userId } });
    } catch {
      // Already liked — the unique pair makes this a no-op.
    }
  }

  const likeCount = await prisma.commentLike.count({ where: { commentId } });
  return NextResponse.json({ likeCount, isLiked: body?.liked !== false });
}
