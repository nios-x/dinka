import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { requireUser } from "@/lib/auth";
import type { StoryKind } from "@/generated/prisma";

/** Posts a story. Media goes to Cloudinary; text stories carry a gradient. */
export async function POST(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const raw = form.get("data");
    const data = raw ? JSON.parse(raw.toString()) : {};

    const kind: StoryKind = ["Image", "Video", "Text"].includes(data.kind) ? data.kind : "Image";
    const caption = typeof data.caption === "string" ? data.caption.slice(0, 240) : null;

    if (kind !== "Text" && !file) {
      return NextResponse.json({ error: "Pick a photo or video first" }, { status: 400 });
    }
    if (kind === "Text" && !caption) {
      return NextResponse.json({ error: "Write something first" }, { status: 400 });
    }

    let mediaUrl: string | null = null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const upload = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "dinka_stories", resource_type: "auto" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(buffer);
      });
      if (!upload?.secure_url && !upload?.url) {
        return NextResponse.json({ error: "Upload failed" }, { status: 502 });
      }
      mediaUrl = upload.secure_url ?? upload.url;
    }

    const story = await prisma.story.create({
      data: {
        authorId: userId,
        kind,
        mediaUrl,
        caption,
        bgFrom: data.bgFrom ?? null,
        bgTo: data.bgTo ?? null,
        expiresAt: new Date(Date.now() + 24 * 3_600_000),
      },
    });

    return NextResponse.json({ story });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Could not post that story" }, { status: 500 });
  }
}
