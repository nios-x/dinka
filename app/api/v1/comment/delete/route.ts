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

        const { commentId } = await req.json();

        if (!commentId) {
            return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });
        }

        const comment = await prisma.comment.findUnique({
            where: { commentId },
            include: {
                post: {
                    select: { authorId: true }
                }
            }
        });

        if (!comment) {
            return NextResponse.json({ error: "Comment not found" }, { status: 404 });
        }

        // Allow deletion if the user is the comment author OR the post author
        if (comment.userId !== session.user.id && comment.post.authorId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden: Not your comment or post" }, { status: 403 });
        }

        await prisma.comment.delete({
            where: { commentId },
        });

        return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting comment:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
