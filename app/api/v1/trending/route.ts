import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/**
 * Trending tags.
 *
 * Ranked by use in the last week rather than all-time, so a tag that was busy
 * a year ago does not sit at the top forever. Falls back to all-time counts
 * when the week has been quiet.
 */
export async function GET(req: NextRequest) {
  const { error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "8", 10)));
  const since = new Date(Date.now() - 7 * 86_400_000);

  const recent = await prisma.postHashtag.groupBy({
    by: ["hashtagId"],
    where: { post: { createdAt: { gte: since }, visiblity: "Public" } },
    _count: { hashtagId: true },
    orderBy: { _count: { hashtagId: "desc" } },
    take: limit,
  });

  if (recent.length > 0) {
    const tags = await prisma.hashtag.findMany({
      where: { id: { in: recent.map((r) => r.hashtagId) } },
      select: { id: true, tag: true, useCount: true },
    });
    const byId = new Map(tags.map((t) => [t.id, t]));

    return NextResponse.json({
      tags: recent
        .map((r) => {
          const t = byId.get(r.hashtagId);
          return t ? { tag: t.tag, useCount: t.useCount, recent: r._count.hashtagId } : null;
        })
        .filter(Boolean),
    });
  }

  const tags = await prisma.hashtag.findMany({
    orderBy: { useCount: "desc" },
    select: { tag: true, useCount: true },
    take: limit,
  });
  return NextResponse.json({ tags: tags.map((t) => ({ ...t, recent: 0 })) });
}
