import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";
import { notify, unnotify } from "@/lib/social";
import type { ReactionType } from "@/generated/prisma";

const VALID = ["Like", "Love", "Laugh", "Wow", "Sad", "Fire"];

/**
 * Set or clear your reaction on a post. One reaction per person per post:
 * sending a new type replaces the old one, sending null removes it.
 */
export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ postId: number; type: string | null }>(req);
  const postId = Number(body?.postId);
  if (!Number.isFinite(postId)) {
    return NextResponse.json({ error: "A post id is required" }, { status: 400 });
  }

  const type = body?.type;
  if (type !== null && type !== undefined && !VALID.includes(type)) {
    return NextResponse.json({ error: "Unknown reaction" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  });
  if (!post) return NextResponse.json({ error: "That post no longer exists" }, { status: 404 });

  if (!type) {
    await prisma.reaction.deleteMany({ where: { postId, userId } });
    await unnotify({ userId: post.authorId, actorId: userId, type: "Like", postId });
  } else {
    await prisma.reaction.upsert({
      where: { postId_userId: { postId, userId } },
      create: { postId, userId, type: type as ReactionType },
      update: { type: type as ReactionType },
    });
    await notify({ userId: post.authorId, actorId: userId, type: "Like", postId, message: type });
  }

  const rows = await prisma.reaction.groupBy({
    by: ["type"],
    where: { postId },
    _count: { type: true },
  });

  const counts: Record<string, number> = {};
  for (const r of rows) counts[r.type] = r._count.type;

  return NextResponse.json({ counts, myReaction: type ?? null });
}
