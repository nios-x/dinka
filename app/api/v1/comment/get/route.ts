import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/**
 * A post's comments, as threads.
 *
 * Top-level comments come back newest-first with their replies attached
 * oldest-first — a thread reads forward, a list of threads reads backward.
 */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const postId = Number(searchParams.get("postId"));
  const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
  const take = 20;

  if (!Number.isFinite(postId)) {
    return NextResponse.json({ error: "A post id is required" }, { status: 400 });
  }

  const userSelect = {
    select: { id: true, name: true, username: true, image: true, pic: true, isVerified: true },
  };

  const roots = await prisma.comment.findMany({
    where: { postId, parentId: null },
    orderBy: { createdAt: "desc" },
    skip: page * take,
    take,
    include: {
      user: userSelect,
      likes: { where: { userId }, select: { id: true } },
      _count: { select: { likes: true, replies: true } },
      replies: {
        orderBy: { createdAt: "asc" },
        take: 3,
        include: {
          user: userSelect,
          likes: { where: { userId }, select: { id: true } },
          _count: { select: { likes: true, replies: true } },
        },
      },
    },
  });

  const shape = (c: any) => ({
    commentId: c.commentId,
    content: c.content,
    createdAt: c.createdAt,
    userId: c.userId,
    user: c.user,
    likeCount: c._count.likes,
    replyCount: c._count.replies,
    isLiked: c.likes.length > 0,
    replies: (c.replies ?? []).map(shape),
  });

  return NextResponse.json({
    comments: roots.map(shape),
    hasMore: roots.length >= take,
  });
}
