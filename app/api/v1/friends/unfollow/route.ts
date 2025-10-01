import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const session: any = await auth();

  if (!session || !session.user?.email || !session.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = session.user.id;

  try {
    await prisma.relations.deleteMany({
      where: {
        srcid: id,
        destid: data.friendId,
        type: "Follower",
      },
    });

    await prisma.relations.deleteMany({
      where: {
        srcid: data.friendId,
        destid: id,
        type: "Follower",
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Error Occurred" });
  }
}
