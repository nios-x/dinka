import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { followingIds } from "@/lib/social";

/**
 * Active stories from you and the people you follow, grouped by author.
 *
 * Expired stories are filtered by query rather than deleted on read, so a slow
 * cleanup job never makes yesterday's stories reappear.
 */
export async function GET() {
  const { userId, error } = await requireUser();
  if (error) return error;

  const authors = await followingIds(userId);

  const stories = await prisma.story.findMany({
    where: { authorId: { in: authors }, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "asc" },
    include: {
      author: { select: { id: true, name: true, username: true, pic: true, image: true } },
      views: { where: { userId }, select: { id: true } },
      _count: { select: { views: true } },
    },
  });

  const groups = new Map();
  for (const s of stories) {
    const key = s.authorId;
    if (!groups.has(key)) {
      groups.set(key, {
        user: {
          id: s.author.id,
          name: s.author.name,
          username: s.author.username,
          pic: s.author.pic ?? s.author.image,
        },
        stories: [],
        allSeen: true,
        isMe: s.authorId === userId,
      });
    }
    const group = groups.get(key);
    const seen = s.views.length > 0;
    if (!seen) group.allSeen = false;
    group.stories.push({
      id: s.id,
      kind: s.kind,
      mediaUrl: s.mediaUrl,
      caption: s.caption,
      bgFrom: s.bgFrom,
      bgTo: s.bgTo,
      createdAt: s.createdAt,
      expiresAt: s.expiresAt,
      seen,
      viewCount: s._count.views,
    });
  }

  return NextResponse.json({ groups: [...groups.values()] });
}
