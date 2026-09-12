import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { blockedIds, postInclude, serializePost } from "@/lib/social";

/**
 * Explore.
 *
 * Public posts ranked by engagement over the last fortnight, so the grid shows
 * what people responded to rather than simply what was posted most recently.
 */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
  const filter = searchParams.get("filter") ?? "all";
  const take = 18;

  const blocked = await blockedIds(userId);
  const since = new Date(Date.now() - 14 * 86_400_000);

  const posts = await prisma.post.findMany({
    where: {
      visiblity: "Public",
      authorId: { notIn: blocked.length ? blocked : ["__none__"] },
      ...(filter === "media" ? { isMedia: true } : {}),
      ...(filter === "reels" ? { kind: "Reel" } : {}),
      ...(filter === "polls" ? { kind: "Poll" } : {}),
      ...(filter === "fresh" ? { createdAt: { gte: since } } : {}),
    },
    orderBy:
      filter === "fresh"
        ? [{ createdAt: "desc" }]
        : [{ reactions: { _count: "desc" } }, { comments: { _count: "desc" } }, { createdAt: "desc" }],
    skip: page * take,
    take,
    include: postInclude(userId),
  });

  return NextResponse.json({
    posts: posts.map((p) => serializePost(p, userId)),
    hasMore: posts.length >= take,
  });
}
