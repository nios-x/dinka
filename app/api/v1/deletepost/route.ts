import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import cloudinary from "@/lib/cloudinary";

const getPublicIdFromUrl = (url: string) => {
  try {
    // Cloudinary URLs are typically https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<extension>
    // or with folders: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<folder>/<public_id>.<extension>
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;

    // Everything after /upload/v<version>/
    const publicIdWithExtension = parts.slice(uploadIndex + 2).join("/"); // skip 'upload' and 'v<version>'
    const publicId = publicIdWithExtension.split(".")[0];
    return publicId;
  } catch (error) {
    console.error("Error extracting public ID from URL:", error);
    return null;
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const postId = body.postid;
    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true, isMedia: true, mediaurl: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // @ts-ignore
    if (post.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden: Not your post" }, { status: 403 });
    }

    // Deleting associated image from Cloudinary if it exists
    if (post.isMedia && post.mediaurl) {
      const publicId = getPublicIdFromUrl(post.mediaurl);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
          console.log(`Deleted Cloudinary image with public ID: ${publicId}`);
        } catch (cloudinaryError) {
          console.error("Cloudinary deletion failed:", cloudinaryError);
          // We continue anyway to ensure the DB record is deleted
        }
      }
    }

    await prisma.comment.deleteMany({
      where: { postId: postId }
    });

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: "Post and associated media deleted successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
