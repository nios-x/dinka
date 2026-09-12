import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { postInclude, serializePost } from "@/lib/social";
import PostDetail from "@/components/feed/PostDetail";

/** A single post with its comment threads. Rendered on the server so a shared
 *  link opens with the post already in the HTML. */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) return { title: "Post" };

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { title: true, author: { select: { name: true } } },
  });
  if (!post) return { title: "Post not found" };

  const author = post.author?.name ?? "Someone";
  return {
    title: `${author}: “${post.title.slice(0, 60)}”`,
    description: post.title.slice(0, 160),
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) notFound();

  const session: any = await getServerSession(authOptions);
  if (!session?.user) redirect(`/login?next=/postid/${postId}`);

  const viewerId =
    session.user.id ??
    (
      await prisma.user.findUnique({
        where: { email: session.user.email! },
        select: { id: true },
      })
    )?.id;

  if (!viewerId) redirect("/login");

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: postInclude(viewerId),
  });

  if (!post) notFound();

  // Follower-only posts stay inside the author's circle.
  if (post.visiblity === "Followers" && post.authorId !== viewerId) {
    const rel = await prisma.relations.findUnique({
      where: { srcid_destid: { srcid: viewerId, destid: post.authorId } },
      select: { type: true },
    });
    if (rel?.type !== "Follower") notFound();
  }

  return <PostDetail post={JSON.parse(JSON.stringify(serializePost(post, viewerId)))} />;
}
