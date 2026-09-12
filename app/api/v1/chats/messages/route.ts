import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/**
 * One conversation.
 *
 * Returns the thread oldest-last so the client can render bottom-up, marks the
 * other side's messages read on open, and hides messages the viewer deleted.
 */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const withId = searchParams.get("id");
  if (!withId) return NextResponse.json({ error: "Who are you messaging?" }, { status: 400 });

  const [partner, messages] = await Promise.all([
    prisma.user.findUnique({
      where: { id: withId },
      select: {
        id: true,
        name: true,
        username: true,
        pic: true,
        image: true,
        isVerified: true,
        lastSeenAt: true,
      },
    }),
    prisma.chats.findMany({
      where: {
        OR: [
          { fromId: userId, toId: withId, isDeletedByFrom: false },
          { fromId: withId, toId: userId, isDeletedByTo: false },
        ],
      },
      orderBy: { createdAt: "asc" },
      take: 200,
    }),
  ]);

  if (!partner) return NextResponse.json({ error: "That account no longer exists" }, { status: 404 });

  await prisma.chats.updateMany({
    where: { fromId: withId, toId: userId, isSeen: false },
    data: { isSeen: true },
  });

  return NextResponse.json({ partner, messages });
}
