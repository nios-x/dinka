
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"; // verify path
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "profile_images",
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(buffer);
        });

        if (!uploadResult?.secure_url) {
            return NextResponse.json({ error: "Upload failed" }, { status: 500 });
        }

        const url = uploadResult.secure_url;

        // Fetch current user to get old image URL
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email as string },
            select: { image: true }
        });

        // Delete old image if it exists and is from Cloudinary
        if (currentUser?.image) {
            const oldUrl = currentUser.image;
            // Check if it's a Cloudinary URL
            if (oldUrl.includes("cloudinary.com")) {
                try {
                    const parts = oldUrl.split("/");
                    const uploadIndex = parts.indexOf("upload");
                    if (uploadIndex !== -1) {
                        // Support for folders in public ID
                        const publicIdWithExtension = parts.slice(uploadIndex + 2).join("/");
                        const publicId = publicIdWithExtension.split(".")[0];

                        await cloudinary.uploader.destroy(publicId);
                        console.log(`Deleted old profile image: ${publicId}`);
                    }
                } catch (error) {
                    console.error("Failed to delete old image:", error);
                    // Continue with update even if delete fails
                }
            }
        }

        // Update user in DB
        await prisma.user.update({
            where: { email: session.user.email as string },
            data: {
                image: url,
                pic: url
            }
        });

        return NextResponse.json({ url });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
