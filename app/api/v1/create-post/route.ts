import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@/auth";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const strtitle = formData.get("data");
    const data = strtitle ? JSON.parse(strtitle.toString()) : {};
    const title = data.title || "";

    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!file) {
      const post = await prisma.post.create({
        data: {
          title,
          isMedia: false,
          mediaurl: "",
          //@ts-ignore
          authorId: session.user.id,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });

      return NextResponse.json(
        { message: "Post created", data: post },
        { status: 200 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "posts_images",
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

    const post = await prisma.post.create({
      data: {
        title,
        isMedia: true,
        mediaurl: uploadResult.url,
        //@ts-ignore
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Uploaded", data: post },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
