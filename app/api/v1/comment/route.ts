import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";
import { notify, notifyMentions } from "@/lib/social";

/**
 * Posts a comment, or a reply to one.
 *
 * A reply notifies the parent comment's author; a top-level comment notifies
 * the post's author. Mentions inside either are notified as well, and `notify`
 * drops the self-notification case.
 */
export async function POST(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ comment: string; postid: number; parentId?: string | null }>(req);
  const content = (body?.comment ?? "").trim().slice(0, 1000);
  const postId = Number(body?.postid);
  const parentId = body?.parentId ?? null;

  if (!content) return NextResponse.json({ error: "Write something first" }, { status: 400 });
  if (!Number.isFinite(postId)) {
    return NextResponse.json({ error: "A post id is required" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  });
  if (!post) return NextResponse.json({ error: "That post no longer exists" }, { status: 404 });

  // A reply must belong to the same post, or threads could cross posts.
  let parentAuthorId: string | null = null;
  if (parentId) {
    const parent = await prisma.comment.findUnique({
      where: { commentId: parentId },
      select: { userId: true, postId: true },
    });
    if (!parent || parent.postId !== postId) {
      return NextResponse.json({ error: "That comment no longer exists" }, { status: 404 });
    }
    parentAuthorId = parent.userId;
  }

  const comment = await prisma.comment.create({
    data: { userId, postId, content, parentId },
    include: {
      user: { select: { id: true, name: true, username: true, image: true, pic: true, isVerified: true } },
      _count: { select: { likes: true, replies: true } },
    },
  });

  if (parentAuthorId) {
    await notify({
      userId: parentAuthorId,
      actorId: userId,
      type: "Reply",
      postId,
      commentId: comment.commentId,
    });
  } else {
    await notify({
      userId: post.authorId,
      actorId: userId,
      type: "Comment",
      postId,
      commentId: comment.commentId,
    });
  }

  await notifyMentions({ body: content, actorId: userId, postId, commentId: comment.commentId });

  return NextResponse.json({
    data: {
      ...comment,
      likeCount: comment._count.likes,
      replyCount: comment._count.replies,
      isLiked: false,
      replies: [],
    },
  });
}
