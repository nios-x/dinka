import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0");
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUserEmail = session.user.email;

  const currentUser = await prisma.user.findUnique({
    where: { email: currentUserEmail },
    select: { id: true },
  });

  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const posts = await prisma.post.findMany({
    skip: page * 5,
    take: 5,

    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          pic: true,
          id: true,
        },
      },
      likes: {
        where: {
          id: currentUser.id,
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
