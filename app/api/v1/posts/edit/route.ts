import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";
import { limit } from "@/lib/rate-limit";
import { indexHashtags, postInclude, serializePost } from "@/lib/social";

/**
 * Editing a post.
 *
 * Text only. The media, the poll and the quoted post stay as they were, and
 * that is deliberate: swapping the photograph under a post that people have
 * already replied to rewrites a conversation after the fact. Fixing a typo is
 * the thing people actually want, and it is the thing that is safe to allow.
 *
 * Every edit stamps `editedAt`, which the card shows. An edit nobody can see
 * is worse than no editing at all — it means a post's text is not evidence of
 * anything.
 */
export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const limited = limit(req, { key: "edit-post", limit: 30, windowSeconds: 600, userId });
  if (limited) return limited;

  const body = await readJson<{ postId: number; title: string }>(req);
  const postId = Number(body?.postId);
  const title = String(body?.title ?? "").trim().slice(0, 2000);

  if (!Number.isInteger(postId) || postId <= 0) {
    return NextResponse.json({ error: "Which post?" }, { status: 400 });
  }

  const existing = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true, isMedia: true, title: true },
  });

  if (!existing) return NextResponse.json({ error: "That post no longer exists" }, { status: 404 });
  if (existing.authorId !== userId) {
    return NextResponse.json({ error: "That isn't your post" }, { status: 403 });
  }

  // A text post with its text removed would render as an empty card. A post
  // carrying a photo can legitimately have no words at all.
  if (!title && !existing.isMedia) {
    return NextResponse.json({ error: "A post needs something in it" }, { status: 400 });
  }

  // Nothing changed: don't stamp an edit mark for a no-op save.
  if (title === existing.title) {
    const unchanged = await prisma.post.findUnique({
      where: { id: postId },
      include: postInclude(userId),
    });
    return NextResponse.json({ data: serializePost(unchanged, userId) });
  }

  const post = await prisma.post.update({
    where: { id: postId },
    data: { title, editedAt: new Date() },
    include: postInclude(userId),
  });

  // The old hashtags belong to the old text.
  await prisma.postHashtag.deleteMany({ where: { postId } });
  await indexHashtags(postId, title);

  return NextResponse.json({ data: serializePost(post, userId) });
}
