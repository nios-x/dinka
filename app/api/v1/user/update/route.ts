
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, bio, image } = body;

        // Basic validation
        if (!name && !bio && !image) {
            return NextResponse.json({ error: "No fields to update" }, { status: 400 });
        }

        const dataToUpdate: any = {};
        if (name) dataToUpdate.name = name;
        if (bio) dataToUpdate.bio = bio;
        if (image) dataToUpdate.image = image;

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: dataToUpdate,
        });
        console.log(updatedUser);

        return NextResponse.json({ success: true, user: updatedUser });

    } catch (error) {
        console.error("Update profile error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
