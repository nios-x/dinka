import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";

/**
 * Block or unblock someone.
 *
 * Blocking also drops the follow in both directions — a blocked account should
 * not keep appearing in either feed.
 */
export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ targetId: string; blocked: boolean }>(req);
  const targetId = body?.targetId;
  if (!targetId || targetId === userId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (body?.blocked === false) {
    await prisma.relations.deleteMany({ where: { srcid: userId, destid: targetId, type: "Blocked" } });
    return NextResponse.json({ blocked: false });
  }

  await prisma.relations.deleteMany({
    where: { OR: [{ srcid: targetId, destid: userId }, { srcid: userId, destid: targetId }] },
  });
  await prisma.relations.create({ data: { srcid: userId, destid: targetId, type: "Blocked" } });

  return NextResponse.json({ blocked: true });
}
