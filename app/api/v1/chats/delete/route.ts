import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
    try {
        const session: any = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { chatId } = await req.json();

        if (!chatId) {
            return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
        }

        const chat = await prisma.chats.findUnique({
            where: { id: chatId },
        });

        if (!chat) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }

        // Allow deletion if the user is the sender OR receiver
        if (chat.fromId !== session.user.id && chat.toId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Soft delete logic based on schema: isDeletedByFrom, isDeletedByTo
        if (chat.fromId === session.user.id) {
            await prisma.chats.update({
                where: { id: chatId },
                data: { isDeletedByFrom: true },
            });
        } else {
            await prisma.chats.update({
                where: { id: chatId },
                data: { isDeletedByTo: true },
            });
        }

        // If both deleted, we could optionally hard delete, but schema seems to support soft delete for both.

        return NextResponse.json({ message: "Message deleted" }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting chat message:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
