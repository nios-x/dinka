import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { isOnline } from "@/lib/presence";

/** The heartbeat: records that you are here right now. */
export async function POST() {
  const { userId, error } = await requireUser();
  if (error) return error;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { lastSeenAt: new Date() },
    });
  } catch {
    // A missed beat is harmless; the next one is 45 seconds away.
  }

  return NextResponse.json({ ok: true });
}

/** Presence for a set of accounts: `?ids=a,b,c`. */
export async function GET(req: NextRequest) {
  const { error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const ids = (searchParams.get("ids") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 60);

  if (!ids.length) return NextResponse.json({ presence: {} });

  const users = await prisma.user.findMany({
    where: { id: { in: ids } },
    select: { id: true, lastSeenAt: true },
  });

  const presence: Record<string, { lastSeenAt: Date; online: boolean }> = {};
  for (const u of users) {
    presence[u.id] = { lastSeenAt: u.lastSeenAt, online: isOnline(u.lastSeenAt) };
  }

  return NextResponse.json({ presence });
}
