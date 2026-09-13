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
    select: {
      title: true,
      createdAt: true,
      visiblity: true,
      hiddenAt: true,
      author: { select: { name: true, username: true } },
    },
  });
  if (!post) return { title: "Post not found" };

  const author = post.author?.name ?? "Someone";
  const title = `${author}: “${post.title.slice(0, 60)}”`;
  const description = post.title.slice(0, 160);

  // A follower-only post is unfurled by platforms that are not signed in and
  // often not even by the recipient, so its words must not travel in a
  // preview. The page itself still gates on the follow relation.
  const isPublic = post.visiblity === "Public" && !post.hiddenAt;

  const shareTitle = isPublic ? title : "A post on Dinka";
  const shareDescription = isPublic ? description : "Sign in to read this post.";

  return {
    title,
    description,
    alternates: { canonical: `/postid/${postId}` },
    openGraph: {
      type: "article",
      title: shareTitle,
      description: shareDescription,
      url: `/postid/${postId}`,
      publishedTime: post.createdAt.toISOString(),
      authors: author ? [author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
    },
    robots: isPublic ? undefined : { index: false, follow: false },
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
