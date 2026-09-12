import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/**
 * Creator insights.
 *
 * Everything is computed from real rows — there are no estimated or modelled
 * figures here. "Reach" is distinct viewers of your posts; "impressions" is
 * total views. The comparison is this period against the one before it, so a
 * delta always has something real behind it.
 */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const days = Math.min(90, Math.max(7, parseInt(searchParams.get("days") || "30", 10)));

  const now = Date.now();
  const start = new Date(now - days * 86_400_000);
  const prevStart = new Date(now - days * 2 * 86_400_000);

  const myPosts = await prisma.post.findMany({
    where: { authorId: userId },
    select: { id: true, createdAt: true, viewCount: true },
  });
  const postIds = myPosts.map((p) => p.id);

  const [
    followers,
    followersPrev,
    reactions,
    reactionsPrev,
    comments,
    commentsPrev,
    seen,
    seenPrev,
    topPosts,
  ] = await Promise.all([
    prisma.relations.count({ where: { destid: userId, type: "Follower" } }),
    prisma.relations.count({
      where: { destid: userId, type: "Follower", createdAt: { lt: start } },
    }),
    prisma.reaction.count({ where: { postId: { in: postIds }, createdAt: { gte: start } } }),
    prisma.reaction.count({
      where: { postId: { in: postIds }, createdAt: { gte: prevStart, lt: start } },
    }),
    prisma.comment.count({ where: { postId: { in: postIds }, createdAt: { gte: start } } }),
    prisma.comment.count({
      where: { postId: { in: postIds }, createdAt: { gte: prevStart, lt: start } },
    }),
    prisma.seenPost.findMany({
      where: { postId: { in: postIds }, seenAt: { gte: start } },
      select: { userId: true },
    }),
    prisma.seenPost.findMany({
      where: { postId: { in: postIds }, seenAt: { gte: prevStart, lt: start } },
      select: { userId: true },
    }),
    prisma.post.findMany({
      where: { authorId: userId },
      orderBy: [{ reactions: { _count: "desc" } }, { createdAt: "desc" }],
      take: 5,
      select: {
        id: true,
        title: true,
        kind: true,
        mediaurl: true,
        isMedia: true,
        createdAt: true,
        viewCount: true,
        _count: { select: { reactions: true, comments: true, likes: true } },
      },
    }),
  ]);

  const reach = new Set(seen.map((s) => s.userId)).size;
  const reachPrev = new Set(seenPrev.map((s) => s.userId)).size;
  const impressions = myPosts.reduce((sum, p) => sum + p.viewCount, 0);

  const postsThisPeriod = myPosts.filter((p) => p.createdAt >= start).length;
  const engagements = reactions + comments;
  const engagementsPrev = reactionsPrev + commentsPrev;

  // Engagement rate is engagements per person reached — the honest denominator.
  const rate = reach > 0 ? (engagements / reach) * 100 : 0;
  const ratePrev = reachPrev > 0 ? (engagementsPrev / reachPrev) * 100 : 0;

  // A daily series for the chart, zero-filled so gaps read as quiet days.
  const buckets: Record<string, { reactions: number; comments: number }> = {};
  for (let i = days - 1; i >= 0; i--) {
    const key = new Date(now - i * 86_400_000).toISOString().slice(0, 10);
    buckets[key] = { reactions: 0, comments: 0 };
  }

  const [reactionRows, commentRows] = await Promise.all([
    prisma.reaction.findMany({
      where: { postId: { in: postIds }, createdAt: { gte: start } },
      select: { createdAt: true },
    }),
    prisma.comment.findMany({
      where: { postId: { in: postIds }, createdAt: { gte: start } },
      select: { createdAt: true },
    }),
  ]);

  for (const r of reactionRows) {
    const key = r.createdAt.toISOString().slice(0, 10);
    if (buckets[key]) buckets[key].reactions += 1;
  }
  for (const c of commentRows) {
    const key = c.createdAt.toISOString().slice(0, 10);
    if (buckets[key]) buckets[key].comments += 1;
  }

  const pctChange = (now_: number, then: number) =>
    then === 0 ? (now_ > 0 ? 100 : 0) : ((now_ - then) / then) * 100;

  return NextResponse.json({
    days,
    totals: {
      followers,
      followersDelta: pctChange(followers, followersPrev || followers),
      engagementRate: rate,
      engagementRateDelta: rate - ratePrev,
      reach,
      reachDelta: pctChange(reach, reachPrev),
      impressions,
      impressionsDelta: pctChange(reactions, reactionsPrev),
      posts: postsThisPeriod,
      engagements,
    },
    series: Object.entries(buckets).map(([date, v]) => ({ date, ...v })),
    topPosts: topPosts.map((p) => ({
      id: p.id,
      title: p.title,
      kind: p.kind,
      mediaurl: p.mediaurl,
      isMedia: p.isMedia,
      createdAt: p.createdAt,
      views: p.viewCount,
      reactions: p._count.reactions + p._count.likes,
      comments: p._count.comments,
      rate: p.viewCount > 0 ? ((p._count.reactions + p._count.comments) / p.viewCount) * 100 : 0,
    })),
  });
}
