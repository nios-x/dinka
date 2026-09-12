import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { blockedIds, followingIds, postInclude, serializePost } from "@/lib/social";

/**
 * The feed.
 *
 * `tab=following` is the default and the product's position: only people you
 * follow, plus yourself. `tab=latest` opens it to every public post. Either way
 * blocked accounts are filtered, and follower-only posts stay inside the graph.
 */
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
  const take = Math.min(20, Math.max(1, parseInt(searchParams.get("take") || "8", 10)));
  const tab = searchParams.get("tab") === "latest" ? "latest" : "following";

  const session: any = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!currentUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const viewerId = currentUser.id;
  const [following, blocked] = await Promise.all([followingIds(viewerId), blockedIds(viewerId)]);

  const where =
    tab === "following"
      ? { authorId: { in: following.filter((id) => !blocked.includes(id)) } }
      : {
          authorId: { notIn: blocked.length ? blocked : ["__none__"] },
          // Outside your own graph, follower-only posts are not yours to read.
          OR: [{ visiblity: "Public" as const }, { authorId: { in: following } }],
        };

  const posts = await prisma.post.findMany({
    where,
    skip: page * take,
    take,
    orderBy: { createdAt: "desc" },
    include: postInclude(viewerId),
  });

  return NextResponse.json({
    posts: posts.map((p) => serializePost(p, viewerId)),
    page,
    hasMore: posts.length >= take,
  });
};
