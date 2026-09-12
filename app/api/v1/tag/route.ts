import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { blockedIds, postInclude, serializePost } from "@/lib/social";

/** Every public post carrying a given hashtag. */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const tag = (searchParams.get("tag") ?? "").toLowerCase().replace(/^#/, "").slice(0, 64);
  const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
  const take = 12;

  if (!tag) return NextResponse.json({ error: "A tag is required" }, { status: 400 });

  const record = await prisma.hashtag.findUnique({
    where: { tag },
    select: { tag: true, useCount: true, createdAt: true },
  });

  const blocked = await blockedIds(userId);

  const links = await prisma.postHashtag.findMany({
    where: {
      hashtag: { tag },
      post: {
        visiblity: "Public",
        authorId: { notIn: blocked.length ? blocked : ["__none__"] },
      },
    },
    orderBy: { post: { createdAt: "desc" } },
    skip: page * take,
    take,
    include: { post: { include: postInclude(userId) } },
  });

  return NextResponse.json({
    tag: record ?? { tag, useCount: 0, createdAt: null },
    posts: links.filter((l) => l.post).map((l) => serializePost(l.post, userId)),
    hasMore: links.length >= take,
  });
}
