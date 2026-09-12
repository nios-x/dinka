import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireUser, readJson } from "@/lib/auth";
import { notify } from "@/lib/social";

/** Follows someone. Idempotent, so a double tap does not 500. */
export async function POST(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ friendId: string }>(req);
  const friendId = body?.friendId;

  if (!friendId) return NextResponse.json({ error: "Who do you want to follow?" }, { status: 400 });
  if (friendId === userId) {
    return NextResponse.json({ error: "You cannot follow yourself" }, { status: 400 });
  }

  const target = await prisma.user.findUnique({ where: { id: friendId }, select: { id: true } });
  if (!target) return NextResponse.json({ error: "That account no longer exists" }, { status: 404 });

  await prisma.relations.upsert({
    where: { srcid_destid: { srcid: userId, destid: friendId } },
    create: { srcid: userId, destid: friendId, type: "Follower" },
    update: { type: "Follower" },
  });

  await notify({ userId: friendId, actorId: userId, type: "Follow" });

  return NextResponse.json({ success: true });
}
