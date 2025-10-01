import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session: any = await auth();
  if (!session || !session.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { friendId } = await req.json();
  const myId = session.user.id;

  try {
    // Remove the incoming follower request (friendId → me)
    await prisma.relations.deleteMany({
      where: {
        srcid: friendId,
        destid: myId,
        type: "Follower",
      },
    });

    // Optionally: Remove reverse entry too if you added symmetric rows
    await prisma.relations.deleteMany({
      where: {
        srcid: myId,
        destid: friendId,
        type: "Follower",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Reject failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
