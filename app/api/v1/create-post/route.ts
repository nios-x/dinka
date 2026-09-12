import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { requireUser } from "@/lib/auth";
import { indexHashtags, notify, notifyMentions, postInclude, serializePost } from "@/lib/social";
import type { PostKind, Viewers } from "@/generated/prisma";

/**
 * Creates a post.
 *
 * One endpoint covers every kind the composer can produce — plain text, image,
 * video, poll, and quote-repost — because they differ only in which extras are
 * attached. The response is a fully serialized post so the client can insert it
 * at the top of the feed without a refetch.
 */
export const POST = async (req: NextRequest) => {
  const { userId, error } = await requireUser();
  if (error) return error;

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const raw = form.get("data");
    const data = raw ? JSON.parse(raw.toString()) : {};

    const title = String(data.title ?? "").trim().slice(0, 2000);
    const visiblity: Viewers = data.visiblity === "Followers" ? "Followers" : "Public";
    const location = data.location ? String(data.location).slice(0, 60) : null;
    const quoteOf = Number.isFinite(Number(data.quoteOf)) ? Number(data.quoteOf) : null;
    const poll =
      data.poll && Array.isArray(data.poll.options) && data.poll.options.length >= 2
        ? {
            options: data.poll.options
              .map((o: unknown) => String(o).trim().slice(0, 60))
              .filter(Boolean)
              .slice(0, 4),
            endsAt: data.poll.endsAt ? new Date(data.poll.endsAt) : null,
          }
        : null;

    if (!title && !file) {
      return NextResponse.json({ error: "Write something or add a photo" }, { status: 400 });
    }

    // The quoted post must exist before we build a repost around it.
    let quoted: { authorId: string } | null = null;
    if (quoteOf) {
      quoted = await prisma.post.findUnique({
        where: { id: quoteOf },
        select: { authorId: true },
      });
      if (!quoted) {
        return NextResponse.json({ error: "That post no longer exists" }, { status: 404 });
      }
    }

    let mediaurl: string | null = null;
    let mediaType: string | null = null;
    let mediaWidth: number | null = null;
    let mediaHeight: number | null = null;

    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        return NextResponse.json({ error: "That file is over 25MB" }, { status: 413 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const upload = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "posts_images", resource_type: "auto" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(buffer);
      });

      if (!upload?.secure_url && !upload?.url) {
        return NextResponse.json({ error: "Upload failed" }, { status: 502 });
      }
      mediaurl = upload.secure_url ?? upload.url;
      mediaType = file.type || (upload.resource_type === "video" ? "video/mp4" : "image/jpeg");
      // Storing dimensions lets the feed reserve the frame before the file loads.
      mediaWidth = upload.width ?? null;
      mediaHeight = upload.height ?? null;
    }

    const kind: PostKind = quoteOf
      ? "Repost"
      : poll
        ? "Poll"
        : mediaType?.startsWith("video")
          ? "Video"
          : mediaurl
            ? "Image"
            : "Text";

    const post = await prisma.post.create({
      data: {
        title,
        visiblity,
        location,
        kind,
        isMedia: !!mediaurl,
        mediaurl,
        mediaType,
        mediaWidth,
        mediaHeight,
        authorId: userId,
        repostOfId: quoteOf,
        ...(poll
          ? {
              poll: {
                create: {
                  endsAt: poll.endsAt,
                  options: {
                    create: poll.options.map((label: string, i: number) => ({ label, order: i })),
                  },
                },
              },
            }
          : {}),
      },
      include: postInclude(userId),
    });

    // Side effects run after the post is safely written.
    await indexHashtags(post.id, title);
    await notifyMentions({ body: title, actorId: userId, postId: post.id });
    if (quoted) {
      await notify({ userId: quoted.authorId, actorId: userId, type: "Repost", postId: post.id });
    }

    return NextResponse.json({ message: "Post created", data: serializePost(post, userId) });
  } catch (err: any) {
    console.error("create-post failed:", err);
    return NextResponse.json(
      { error: err?.message ?? "Could not publish that post" },
      { status: 500 }
    );
  }
};
