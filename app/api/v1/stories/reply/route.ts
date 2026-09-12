import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";
import { notify } from "@/lib/social";

/**
 * Replying to a story sends a normal DM as well as a story reply, so the
 * conversation continues where the author already looks for messages.
 */
export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ storyId: number; message: string }>(req);
  const storyId = Number(body?.storyId);
  const message = (body?.message ?? "").trim().slice(0, 500);

  if (!Number.isFinite(storyId) || !message) {
    return NextResponse.json({ error: "Write a reply first" }, { status: 400 });
  }

  const story = await prisma.story.findUnique({
    where: { id: storyId },
    select: { authorId: true, caption: true },
  });
  if (!story) return NextResponse.json({ error: "That story has expired" }, { status: 404 });

  await prisma.storyReply.create({ data: { storyId, userId, message } });

  if (story.authorId !== userId) {
    await prisma.chats.create({
      data: { fromId: userId, toId: story.authorId, type: "Message", message },
    });
    await notify({ userId: story.authorId, actorId: userId, type: "StoryReply", message });
  }

  return NextResponse.json({ ok: true });
}
