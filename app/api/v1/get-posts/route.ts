import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { blockedIds, followingIds, mutedIds, postInclude, serializePost } from "@/lib/social";

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
  const [following, blocked, muted] = await Promise.all([
    followingIds(viewerId),
    blockedIds(viewerId),
    mutedIds(viewerId),
  ]);

  // Blocked and muted are both "not in my feed"; they differ in everything
  // else, which is why they are gathered separately and merged only here.
  const excluded = [...new Set([...blocked, ...muted])];

  // A post hidden by reports leaves every listing. The author still sees it
  // on their own profile, which is handled where that query is built.
  const where =
    tab === "following"
      ? {
          hiddenAt: null,
          authorId: { in: following.filter((id) => !excluded.includes(id)) },
        }
      : {
          hiddenAt: null,
          authorId: { notIn: excluded.length ? excluded : ["__none__"] },
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
