import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/** The followers or following list for one account. */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || userId;
  const kind = searchParams.get("kind") === "following" ? "following" : "followers";
  const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
  const take = 20;

  const rows = await prisma.relations.findMany({
    where:
      kind === "followers"
        ? { destid: id, type: "Follower" }
        : { srcid: id, type: "Follower" },
    orderBy: { createdAt: "desc" },
    skip: page * take,
    take,
    include: {
      src: { select: { id: true, name: true, username: true, pic: true, image: true, bio: true, isVerified: true } },
      dest: { select: { id: true, name: true, username: true, pic: true, image: true, bio: true, isVerified: true } },
    },
  });

  const people = rows.map((r) => (kind === "followers" ? r.src : r.dest));

  // Which of these the viewer already follows, so the buttons are correct.
  const mine = await prisma.relations.findMany({
    where: { srcid: userId, destid: { in: people.map((p) => p.id) }, type: "Follower" },
    select: { destid: true },
  });
  const followingSet = new Set(mine.map((m) => m.destid));

  return NextResponse.json({
    people: people.map((p) => ({
      ...p,
      pic: p.pic ?? p.image,
      isFollowing: followingSet.has(p.id),
      isMe: p.id === userId,
    })),
    hasMore: rows.length >= take,
  });
}
