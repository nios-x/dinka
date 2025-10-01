import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const session: any = await auth();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0");
  if (!session || !session.user?.email || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = session.user.id;
  const posts = await prisma.post.findMany({
    skip: page * 5,
    take: 5,
    where: {
      authorId: body.id ? body.id : id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          pic: true,
          image: true,
        },
      },
      likes: {
        where: {
          id: session.user.id,
        },
        select: {
          id: true,
        },
      },

      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  const postsWithLikeStatus = posts.map((post) => ({
    ...post,
    isLiked: post.likes.length > 0,
    likes: post._count.likes,
  }));

  return NextResponse.json({ posts: postsWithLikeStatus });
};
