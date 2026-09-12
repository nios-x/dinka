import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";
import { postInclude, serializePost } from "@/lib/social";

/**
 * A profile's posts, by tab.
 *
 * `posts` is everything, `media` only posts with an attachment, `reposts` only
 * quote-reposts, and `liked` what this person reacted to — the last of which is
 * returned for your own profile only, since reactions are not public.
 *
 * Follower-only posts are excluded unless the viewer actually follows them.
 */
export async function POST(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
  const take = 8;

  const body = await readJson<{ id?: string; tab?: string }>(req);
  const id = body?.id || userId;
  const tab = body?.tab ?? "posts";
  const isMe = id === userId;

  if (tab === "liked") {
    if (!isMe) return NextResponse.json({ posts: [], hasMore: false });

    const reactions = await prisma.reaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip: page * take,
      take,
      include: { post: { include: postInclude(userId) } },
    });

    return NextResponse.json({
      posts: reactions.filter((r) => r.post).map((r) => serializePost(r.post, userId)),
      hasMore: reactions.length >= take,
    });
  }

  const relation = isMe
    ? null
    : await prisma.relations.findUnique({
        where: { srcid_destid: { srcid: userId, destid: id } },
        select: { type: true },
      });

  if (relation?.type === "Blocked") return NextResponse.json({ posts: [], hasMore: false });

  const canSeeFollowersOnly = isMe || relation?.type === "Follower";

  const posts = await prisma.post.findMany({
    where: {
      authorId: id,
      ...(tab === "media" ? { isMedia: true } : {}),
      ...(tab === "reposts" ? { kind: "Repost" } : {}),
      ...(canSeeFollowersOnly ? {} : { visiblity: "Public" }),
    },
    orderBy: { createdAt: "desc" },
    skip: page * take,
    take,
    include: postInclude(userId),
  });

  return NextResponse.json({
    posts: posts.map((p) => serializePost(p, userId)),
    hasMore: posts.length >= take,
  });
}
