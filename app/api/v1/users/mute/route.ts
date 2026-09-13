import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";

/**
 * Mute or unmute someone.
 *
 * Muting is the quiet option the product was missing. Block is a statement: it
 * severs the follow in both directions and the other person can tell. Mute is
 * a decision about your own feed — their posts stop appearing, the follow
 * stands, and nobody is notified of anything.
 *
 * Without it the only tool for "I like this person and not their posting" is
 * one that ends the relationship, so people either put up with a feed they
 * dislike or cut someone off over it.
 */
export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ targetId: string; muted: boolean }>(req);
  const targetId = body?.targetId;

  if (!targetId || targetId === userId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (body?.muted === false) {
    await prisma.mute.deleteMany({ where: { muterId: userId, mutedId: targetId } });
    return NextResponse.json({ muted: false });
  }

  const target = await prisma.user.findUnique({ where: { id: targetId }, select: { id: true } });
  if (!target) return NextResponse.json({ error: "No such account" }, { status: 404 });

  await prisma.mute.upsert({
    where: { muterId_mutedId: { muterId: userId, mutedId: targetId } },
    create: { muterId: userId, mutedId: targetId },
    update: {},
  });

  return NextResponse.json({ muted: true });
}

/** The accounts you have muted, for the settings screen. */
export async function GET() {
  const { userId, error } = await requireUser();
  if (error) return error;

  const mutes = await prisma.mute.findMany({
    where: { muterId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      createdAt: true,
      muted: { select: { id: true, name: true, username: true, pic: true, image: true } },
    },
  });

  return NextResponse.json({ mutes: mutes.map((m) => ({ ...m.muted, mutedAt: m.createdAt })) });
}
