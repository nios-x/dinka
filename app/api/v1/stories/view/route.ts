import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";

/** Marks a story seen. Idempotent — the unique pair is the dedupe key. */
export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ storyId: number }>(req);
  const storyId = Number(body?.storyId);
  if (!Number.isFinite(storyId)) return NextResponse.json({ ok: false });

  try {
    await prisma.storyView.upsert({
      where: { storyId_userId: { storyId, userId } },
      create: { storyId, userId },
      update: {},
    });
  } catch {
    // A story that expired mid-view is not an error worth surfacing.
  }
  return NextResponse.json({ ok: true });
}
