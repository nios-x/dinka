import prisma from "@/lib/prisma";
import ShowPost from "@/components/Posts/ShowPost";
import { auth } from "@/auth";

export default async function Page({ params }: any) {
  const { id } = await params;

  const session = await auth();
  if (!session?.user?.email) {
    return <div>Unauthorized</div>;
  }

  const postId = parseInt(id);
  if (isNaN(postId)) return <div>Invalid Post ID</div>;

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!currentUser) return <div>User not found</div>;

  const post: any = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          name: true,
          pic: true,
          id: true,
        },
      },
      likes: {
        where: { id: currentUser.id },
        select: { id: true },
      },
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              pic: true,
            },
          },
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (!post) return <div>Post not found</div>;

  const normalizedPost = {
    id: post.id,
    title: post.title,
    createdAt: post.createdAt,
    isMedia: post.isMedia ?? false,
    mediaUrl: post.mediaurl ?? null,
    visibility: post.visibility ?? "Public",
    author: post.author,
    isLiked: post.likes.length > 0,
    likes: post._count.likes,
    comments: post.comments,
  };

  return <ShowPost {...normalizedPost} />;
}
