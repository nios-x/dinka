import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { blockedIds, postInclude, serializePost } from "@/lib/social";

/** The vertical video feed: public posts whose media is a video. */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
  const take = 6;

  const blocked = await blockedIds(userId);

  const posts = await prisma.post.findMany({
    where: {
      visiblity: "Public",
      isMedia: true,
      authorId: { notIn: blocked.length ? blocked : ["__none__"] },
      OR: [
        { kind: "Reel" },
        { kind: "Video" },
        { mediaType: { startsWith: "video" } },
        { mediaurl: { endsWith: ".mp4" } },
        { mediaurl: { endsWith: ".webm" } },
      ],
    },
    orderBy: { createdAt: "desc" },
    skip: page * take,
    take,
    include: postInclude(userId),
  });

  return NextResponse.json({
    posts: posts.map((p) => serializePost(p, userId)),
    hasMore: posts.length >= take,
  });
}
