import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";

/**
 * A profile header, in one request.
 *
 * Identity, counts, and the viewer's relationship to this account all arrive
 * together, because the header cannot render correctly without all three.
 * `followedBy` is the social proof row: people you follow who also follow them.
 */
export async function POST(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ id?: string }>(req);
  const id = body?.id || userId;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      pic: true,
      bio: true,
      coverUrl: true,
      location: true,
      website: true,
      pronouns: true,
      isVerified: true,
      createdAt: true,
      lastSeenAt: true,
      _count: { select: { posts: true } },
    },
  });

  if (!user) return NextResponse.json({ error: "Account not found" }, { status: 404 });

  const [outgoing, incoming, followersCount, followingCount] = await Promise.all([
    prisma.relations.findUnique({
      where: { srcid_destid: { srcid: userId, destid: user.id } },
      select: { type: true },
    }),
    prisma.relations.findUnique({
      where: { srcid_destid: { srcid: user.id, destid: userId } },
      select: { type: true },
    }),
    prisma.relations.count({ where: { destid: user.id, type: "Follower" } }),
    prisma.relations.count({ where: { srcid: user.id, type: "Follower" } }),
  ]);

  // Being blocked hides the account entirely rather than showing an empty one.
  if (incoming?.type === "Blocked") {
    return NextResponse.json({ error: "This account is not available" }, { status: 403 });
  }

  // People the viewer follows who also follow this account.
  const mutuals =
    user.id === userId
      ? []
      : await prisma.relations.findMany({
          where: {
            destid: user.id,
            type: "Follower",
            src: { followers: { some: { srcid: userId, type: "Follower" } } },
          },
          take: 3,
          select: { src: { select: { id: true, name: true, pic: true, image: true } } },
        });

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      image: user.image,
      pic: user.pic ?? user.image,
      bio: user.bio,
      coverUrl: user.coverUrl,
      location: user.location,
      website: user.website,
      pronouns: user.pronouns,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      lastSeenAt: user.lastSeenAt,
    },
    isMe: user.id === userId,
    isFollowing: outgoing?.type === "Follower",
    followsYou: incoming?.type === "Follower",
    isBlocked: outgoing?.type === "Blocked",
    postCount: user._count.posts,
    followersCount,
    followingCount,
    followedBy: mutuals.map((m) => ({
      id: m.src.id,
      name: m.src.name,
      pic: m.src.pic ?? m.src.image,
    })),
  });
}
