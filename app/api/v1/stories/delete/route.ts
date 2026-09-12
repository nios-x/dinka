import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";

export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ storyId: number }>(req);
  const storyId = Number(body?.storyId);
  if (!Number.isFinite(storyId)) {
    return NextResponse.json({ error: "A story id is required" }, { status: 400 });
  }

  const story = await prisma.story.findUnique({ where: { id: storyId }, select: { authorId: true } });
  if (!story) return NextResponse.json({ error: "That story no longer exists" }, { status: 404 });
  if (story.authorId !== userId) {
    return NextResponse.json({ error: "That is not your story" }, { status: 403 });
  }

  await prisma.story.delete({ where: { id: storyId } });
  return NextResponse.json({ ok: true });
}
