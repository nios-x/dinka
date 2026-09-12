import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";
import { postInclude, serializePost } from "@/lib/social";

/** Your saved posts, newest save first. */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
  const collectionId = searchParams.get("collection");
  const take = 12;

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId,
      ...(collectionId ? { collectionId: Number(collectionId) } : {}),
    },
    orderBy: { createdAt: "desc" },
    skip: page * take,
    take,
    include: { post: { include: postInclude(userId) } },
  });

  return NextResponse.json({
    posts: bookmarks.filter((b) => b.post).map((b) => serializePost(b.post, userId)),
    hasMore: bookmarks.length >= take,
  });
}

/** Save or unsave a post, optionally into a named collection. */
export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ postId: number; saved: boolean; collectionId?: number | null }>(req);
  const postId = Number(body?.postId);
  if (!Number.isFinite(postId)) {
    return NextResponse.json({ error: "A post id is required" }, { status: 400 });
  }

  if (body?.saved === false) {
    await prisma.bookmark.deleteMany({ where: { postId, userId } });
    return NextResponse.json({ saved: false });
  }

  await prisma.bookmark.upsert({
    where: { postId_userId: { postId, userId } },
    create: { postId, userId, collectionId: body?.collectionId ?? null },
    update: { collectionId: body?.collectionId ?? null },
  });

  return NextResponse.json({ saved: true });
}
