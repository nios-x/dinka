import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const session: any = await auth();

  if (!session || !session.user?.email || !session.user?.id) {
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

  const { comment, postid } = body;

  console.log(comment, postid, session.user);

  const commentObj = await prisma.comment.create({
    data: {
      userId: session.user.id,
      postId: postid,
      content: comment,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return NextResponse.json({ data: commentObj });
}
