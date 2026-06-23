import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import cloudinary from "@/lib/cloudinary";

const getPublicIdFromUrl = (url: string) => {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;
    const publicIdWithExtension = parts.slice(uploadIndex + 2).join("/");
    return publicIdWithExtension.split(".")[0];
  } catch (error) {
    return null;
  }
};

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

        if (chat.fromId !== session.user.id && chat.toId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        let isDeletedByFrom = chat.isDeletedByFrom;
        let isDeletedByTo = chat.isDeletedByTo;

        if (chat.fromId === session.user.id) {
            isDeletedByFrom = true;
            await prisma.chats.update({
                where: { id: chatId },
                data: { isDeletedByFrom: true },
            });
        } else {
            isDeletedByTo = true;
            await prisma.chats.update({
                where: { id: chatId },
                data: { isDeletedByTo: true },
            });
        }

        if (isDeletedByFrom && isDeletedByTo) {
            if (chat.mediaUrl) {
                const publicId = getPublicIdFromUrl(chat.mediaUrl);
                if (publicId) {
                    const isVideo = chat.mediaUrl.includes("/video/");
                    try {
                        await cloudinary.uploader.destroy(publicId, { resource_type: isVideo ? "video" : "image" });
                    } catch (e) {
                        console.error("Cloudinary deletion failed:", e);
                    }
                }
            }
            
            await prisma.chats.delete({
                where: { id: chatId },
            });
        }

        return NextResponse.json({ message: "Message deleted" }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting chat message:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
