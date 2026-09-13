import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { blockedIds } from "@/lib/social";

/** Global search across people, posts and hashtags in one round trip. */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim().slice(0, 80);
  if (q.length < 2) {
    return NextResponse.json({ people: [], posts: [], tags: [] });
  }

  const blocked = await blockedIds(userId);
  const bare = q.replace(/^#/, "");

  const [people, posts, tags] = await Promise.all([
    prisma.user.findMany({
      where: {
        id: { notIn: [...blocked, userId] },
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { username: { contains: bare, mode: "insensitive" } },
        ],
      },
      select: { id: true, name: true, username: true, pic: true, image: true, bio: true, isVerified: true },
      take: 6,
    }),
    prisma.post.findMany({
      where: {
        hiddenAt: null,
        visiblity: "Public",
        authorId: { notIn: blocked.length ? blocked : ["__none__"] },
        title: { contains: q, mode: "insensitive" },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        mediaurl: true,
        isMedia: true,
        author: { select: { id: true, name: true, pic: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.hashtag.findMany({
      where: { tag: { contains: bare, mode: "insensitive" } },
      orderBy: { useCount: "desc" },
      select: { tag: true, useCount: true },
      take: 6,
    }),
  ]);

  return NextResponse.json({ people, posts, tags });
}
