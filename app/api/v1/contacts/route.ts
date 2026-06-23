import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const session: any = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const chats = await prisma.chats.findMany({
    where: {
      OR: [
        { fromId: userId },
        { toId: userId },
      ],
    },
    orderBy: { id: "desc" },
    include: {
      from: {
        select: {
          id: true,
          name: true,
          username: true,
          pic: true,
          email: true,
        },
      },
      to: {
        select: {
          id: true,
          name: true,
          username: true,
          pic: true,
          email: true,
        },
      },
    },
  });

  const uniqueContacts = new Map<string, any>();

  for (const chat of chats) {
    const contactId = chat.fromId === userId ? chat.toId : chat.fromId;
    if (!uniqueContacts.has(contactId)) {
      uniqueContacts.set(contactId, chat);
    }
  }
  
  uniqueContacts.delete(userId)

  const latestChats = Array.from(uniqueContacts.values());

  return NextResponse.json({ data: latestChats });
}
