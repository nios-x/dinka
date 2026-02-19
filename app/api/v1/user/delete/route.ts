
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userId = user.id;

        // Transactional delete to handle relations manually since constraints might prevent user deletion
        // We delete in order of dependency
        await prisma.$transaction(async (tx) => {
            // 1. Delete Comments made by user
            await tx.comment.deleteMany({ where: { userId } });

            // 2. Delete Notifications for user
            await tx.notification.deleteMany({ where: { userId } });

            // 3. Delete SeenPosts
            await tx.seenPost.deleteMany({ where: { userId } });

            // 4. Delete Relations (followers/following)
            await tx.relations.deleteMany({ where: { OR: [{ srcid: userId }, { destid: userId }] } });

            // 5. Delete Chats
            await tx.chats.deleteMany({ where: { OR: [{ fromId: userId }, { toId: userId }] } });

            // 6. Delete Posts (and their related data like comments/notifications/seen/likes)
            // First fetch posts to delete their related items
            const userPosts = await tx.post.findMany({ where: { authorId: userId }, select: { id: true } });
            const postIds = userPosts.map(p => p.id);

            if (postIds.length > 0) {
                await tx.comment.deleteMany({ where: { postId: { in: postIds } } });
                await tx.notification.deleteMany({ where: { postid: { in: postIds } } });
                await tx.seenPost.deleteMany({ where: { postId: { in: postIds } } });
                // Likes on posts? PostLikes relation is implicit many-to-many.
                // Prisma handles implicit cleanup usually? Or we need to disconnect?
                // Usually deleting the post deletes the join table entries for implicit m-n.
                await tx.post.deleteMany({ where: { authorId: userId } });
            }

            // 7. Delete the User
            await tx.user.delete({ where: { id: userId } });
        });

        return NextResponse.json({ success: true, message: "Account deleted successfully" });

    } catch (error) {
        console.error("Delete account error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
