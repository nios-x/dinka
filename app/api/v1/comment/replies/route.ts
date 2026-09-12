import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/** Every reply under one comment, for when a thread is expanded. */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const parentId = searchParams.get("parentId");
  if (!parentId) return NextResponse.json({ error: "A comment id is required" }, { status: 400 });

  const replies = await prisma.comment.findMany({
    where: { parentId },
    orderBy: { createdAt: "asc" },
    include: {
      user: {
        select: { id: true, name: true, username: true, image: true, pic: true, isVerified: true },
      },
      likes: { where: { userId }, select: { id: true } },
      _count: { select: { likes: true, replies: true } },
    },
  });

  return NextResponse.json({
    replies: replies.map((c) => ({
      commentId: c.commentId,
      content: c.content,
      createdAt: c.createdAt,
      userId: c.userId,
      user: c.user,
      likeCount: c._count.likes,
      replyCount: c._count.replies,
      isLiked: c.likes.length > 0,
      replies: [],
    })),
  });
}
