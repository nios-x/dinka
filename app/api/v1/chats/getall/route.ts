import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const toId = searchParams.get("id");

    const session:any = await getServerSession(authOptions);
    const fromId = session?.user?.id;

    if (!session || !fromId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!toId) {
      return NextResponse.json({ error: "Missing recipient ID" }, { status: 400 });
    }

    const chats = await prisma.chats.findMany({
      where: {
        OR: [
          { fromId, toId, isDeletedByFrom: false },
          { fromId: toId, toId: fromId, isDeletedByTo: false },
        ],
      },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(chats);
  } catch (error:any) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error.message) || "" },
      { status: 500 }
    );
  }
}
