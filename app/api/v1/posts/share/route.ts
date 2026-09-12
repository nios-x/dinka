import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";

/** Records that a post was shared. Fire-and-forget from the client. */
export async function POST(req: Request) {
  const { error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ postId: number }>(req);
  const postId = Number(body?.postId);
  if (!Number.isFinite(postId)) return NextResponse.json({ ok: false });

  try {
    await prisma.post.update({ where: { id: postId }, data: { shareCount: { increment: 1 } } });
  } catch {
    // A deleted post is not worth a client-visible error here.
  }
  return NextResponse.json({ ok: true });
}
