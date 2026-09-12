import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { blockedIds } from "@/lib/social";

/**
 * People you do not already follow.
 *
 * Ordered by follower count so the suggestions are accounts with something to
 * show, and excludes anyone either side has blocked.
 */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "24", 10)));

  const blocked = await blockedIds(userId);

  const people = await prisma.user.findMany({
    where: {
      id: { notIn: [...blocked, userId] },
      followers: { none: { srcid: userId, type: "Follower" } },
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio: true,
      pic: true,
      isVerified: true,
      _count: { select: { followers: true, posts: true } },
    },
    orderBy: { followers: { _count: "desc" } },
    take: limit,
  });

  return NextResponse.json({
    people: people.map((p) => ({
      id: p.id,
      name: p.name,
      username: p.username,
      image: p.image,
      pic: p.pic ?? p.image,
      bio: p.bio,
      isVerified: p.isVerified,
      followerCount: p._count.followers,
      postCount: p._count.posts,
    })),
  });
}
