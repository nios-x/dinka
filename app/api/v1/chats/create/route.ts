import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user?.email || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";
    let toId = "";
    let messageText = "";
    let mediaUrl = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      toId = formData.get("toId") as string;
      messageText = (formData.get("message") as string) || "";
      const file = formData.get("file") as File | null;

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "chats_media",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(buffer);
        });

        if (!uploadResult?.url) {
          return NextResponse.json({ error: "Upload failed" }, { status: 500 });
        }
        mediaUrl = uploadResult.url;
      }
    } else {
      const body = await req.json();
      toId = body.toId;
      messageText = body.message;
    }

    if (!toId) {
      return NextResponse.json({ error: "Missing recipient ID" }, { status: 400 });
    }

    const message = await prisma.chats.create({
      data: {
        fromId: session.user.id,
        toId,
        type: "Message",
        message: messageText,
        ...(mediaUrl && { mediaUrl }),
      },
    });

    return NextResponse.json({ message });
  } catch (error: any) {
    console.error("Error creating chat message:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}