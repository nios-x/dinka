import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/**
 * A profile, by id or by @handle.
 *
 * Returns everything the header needs in one request — identity, counts, the
 * viewer's relationship to this account, and whether either side has blocked
 * the other — so the page does not assemble itself from four round trips.
 */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const username = searchParams.get("username");
  const target = id || username ? undefined : userId;

  const user = await prisma.user.findFirst({
    where: target
      ? { id: target }
      : id
        ? { id }
        : { username: { equals: username!, mode: "insensitive" } },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      pic: true,
      image: true,
      coverUrl: true,
      location: true,
      website: true,
      pronouns: true,
      isVerified: true,
      createdAt: true,
      lastSeenAt: true,
      _count: { select: { posts: true, followers: true, following: true } },
    },
  });

  if (!user) return NextResponse.json({ error: "Account not found" }, { status: 404 });

  const [outgoing, incoming] = await Promise.all([
    prisma.relations.findUnique({
      where: { srcid_destid: { srcid: userId, destid: user.id } },
      select: { type: true },
    }),
    prisma.relations.findUnique({
      where: { srcid_destid: { srcid: user.id, destid: userId } },
      select: { type: true },
    }),
  ]);

  const blockedByMe = outgoing?.type === "Blocked";
  const blockedMe = incoming?.type === "Blocked";

  if (blockedMe) {
    return NextResponse.json({ error: "This account is not available to you" }, { status: 403 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      pic: user.pic ?? user.image,
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
    isBlocked: blockedByMe,
    counts: {
      posts: user._count.posts,
      followers: user._count.followers,
      following: user._count.following,
    },
  });
}
