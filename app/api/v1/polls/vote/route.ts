import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, readJson } from "@/lib/auth";

/** Cast or change a vote. One vote per person per poll. */
export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body = await readJson<{ optionId: number }>(req);
  const optionId = Number(body?.optionId);
  if (!Number.isFinite(optionId)) {
    return NextResponse.json({ error: "An option id is required" }, { status: 400 });
  }

  const option = await prisma.pollOption.findUnique({
    where: { id: optionId },
    include: { poll: { select: { id: true, endsAt: true } } },
  });
  if (!option) return NextResponse.json({ error: "That option no longer exists" }, { status: 404 });

  if (option.poll.endsAt && option.poll.endsAt.getTime() <= Date.now()) {
    return NextResponse.json({ error: "This poll has closed" }, { status: 409 });
  }

  await prisma.pollVote.upsert({
    where: { pollId_userId: { pollId: option.poll.id, userId } },
    create: { pollId: option.poll.id, optionId, userId },
    update: { optionId },
  });

  const options = await prisma.pollOption.findMany({
    where: { pollId: option.poll.id },
    orderBy: { order: "asc" },
    include: { _count: { select: { votes: true } } },
  });

  return NextResponse.json({
    options: options.map((o) => ({ id: o.id, label: o.label, votes: o._count.votes })),
    myVote: optionId,
    totalVotes: options.reduce((sum, o) => sum + o._count.votes, 0),
  });
}
