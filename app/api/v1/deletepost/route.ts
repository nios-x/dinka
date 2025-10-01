// File: app/api/post/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const postId = body.postid;
    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // @ts-ignore
    if (post.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden: Not your post" },
        { status: 403 }
      );
    }
    await prisma.comment.deleteMany({
      where: { postId: postId },
    });

    await prisma.post.deleteMany({
      where: { id: postId },
    });
    console.log(postId, post);

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
