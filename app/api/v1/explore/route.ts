import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { blockedIds, mutedIds, postInclude, serializePost } from "@/lib/social";

/**
 * Explore.
 *
 * Public posts ranked by engagement over the last fortnight, so the grid shows
 * what people responded to rather than simply what was posted most recently.
 *
 * Only posts that carry media reach this surface. Explore is a picture grid,
 * and a text post in it is a cropped paragraph in a square — it reads as a
 * broken tile rather than as something worth opening.
 */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
  const filter = searchParams.get("filter") ?? "all";
  const take = 18;

  const [blocked, muted] = await Promise.all([blockedIds(userId), mutedIds(userId)]);
  const excluded = [...new Set([...blocked, ...muted])];
  const since = new Date(Date.now() - 14 * 86_400_000);

  const where: Prisma.PostWhereInput = {
    hiddenAt: null,
    visiblity: "Public",
    authorId: { notIn: excluded.length ? excluded : ["__none__"] },
    isMedia: true,
    mediaurl: { not: null },
  };

  if (filter === "fresh") where.createdAt = { gte: since };
  if (filter === "reels") where.kind = "Reel";

  // Stills: everything that is not a reel and not a video upload. `mediaType`
  // is null on older posts, and a bare NOT would drop those rows rather than
  // keep them, so the null case is spelled out.
  if (filter === "photos") {
    where.kind = { not: "Reel" };
    where.OR = [{ mediaType: null }, { NOT: { mediaType: { startsWith: "video" } } }];
  }

  const posts = await prisma.post.findMany({
    where,
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
