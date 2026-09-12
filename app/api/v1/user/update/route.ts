import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";

/**
 * Updates your profile.
 *
 * Only the fields present in the body are written, and empty strings clear a
 * field rather than being ignored — that is how you remove a website or a
 * location once you have set one.
 */

const LIMITS = {
  name: 50,
  bio: 300,
  location: 60,
  website: 200,
  pronouns: 30,
  username: 32,
} as const;

export async function PUT(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<Record<string, unknown>>(req);
  if (!body) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  const data: Record<string, unknown> = {};

  const text = (key: keyof typeof LIMITS) => {
    if (!(key in body)) return;
    const raw = body[key];
    if (raw === null) {
      data[key] = null;
      return;
    }
    if (typeof raw !== "string") return;
    const value = raw.trim().slice(0, LIMITS[key]);
    data[key] = value || null;
  };

  text("name");
  text("bio");
  text("location");
  text("website");
  text("pronouns");

  // Bio is non-nullable in the schema, so clearing it writes an empty string.
  if (data.bio === null) data.bio = "";

  if (typeof body.image === "string" && body.image) {
    // `pic` is what every surface reads; `image` stays in step for the session.
    data.pic = body.image;
    data.image = body.image;
  }
  if (typeof body.coverUrl === "string") data.coverUrl = body.coverUrl || null;

  if (typeof body.username === "string") {
    const handle = body.username.trim().toLowerCase().replace(/^@/, "").slice(0, LIMITS.username);
    if (handle) {
      if (!/^[a-z0-9_.]{2,32}$/.test(handle)) {
        return NextResponse.json(
          { error: "Handles can use letters, numbers, dots and underscores only" },
          { status: 400 }
        );
      }
      const taken = await prisma.user.findFirst({
        where: { username: handle, NOT: { id: userId } },
        select: { id: true },
      });
      if (taken) return NextResponse.json({ error: "That handle is taken" }, { status: 409 });
      data.username = handle;
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        pic: true,
        image: true,
        coverUrl: true,
        location: true,
        website: true,
        pronouns: true,
      },
    });
    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json({ error: "Could not save those changes" }, { status: 500 });
  }
}
