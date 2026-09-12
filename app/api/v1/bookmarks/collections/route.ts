import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";

/** Named collections of saved posts, with a count and a cover each. */
export async function GET() {
  const { userId, error } = await requireUser();
  if (error) return error;

  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { bookmarks: true } },
      bookmarks: {
        take: 1,
        orderBy: { createdAt: "desc" },
        include: { post: { select: { mediaurl: true } } },
      },
    },
  });

  return NextResponse.json({
    collections: collections.map((c) => ({
      id: c.id,
      name: c.name,
      count: c._count.bookmarks,
      cover: c.coverUrl ?? c.bookmarks[0]?.post?.mediaurl ?? null,
    })),
  });
}

export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ name: string }>(req);
  const name = (body?.name ?? "").trim().slice(0, 40);
  if (!name) return NextResponse.json({ error: "Give the collection a name" }, { status: 400 });

  try {
    const collection = await prisma.collection.create({ data: { userId, name } });
    return NextResponse.json({ collection });
  } catch {
    return NextResponse.json({ error: "You already have a collection with that name" }, { status: 409 });
  }
}
