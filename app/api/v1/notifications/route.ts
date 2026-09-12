import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/** The notification center, newest first, with the actor and post attached. */
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
  const take = 20;

  const rows = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    skip: page * take,
    take,
    include: {
      actor: { select: { id: true, name: true, username: true, pic: true, image: true } },
      post: { select: { id: true, title: true, mediaurl: true, isMedia: true } },
      comment: { select: { commentId: true, content: true } },
    },
  });

  return NextResponse.json({
    notifications: rows.map((n) => ({
      id: n.id,
      type: n.type,
      isRead: n.isRead,
      createdAt: n.createdAt,
      message: n.message,
      actor: n.actor,
      post: n.post,
      comment: n.comment,
    })),
    hasMore: rows.length >= take,
  });
}

/** Marks everything read, or a single notification when an id is given. */
export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  let id: number | undefined;
  try {
    id = (await req.json())?.id;
  } catch {
    id = undefined;
  }

  await prisma.notification.updateMany({
    where: { userId, ...(id ? { id: Number(id) } : { isRead: false }) },
    data: { isRead: true },
  });

  return NextResponse.json({ ok: true });
}
