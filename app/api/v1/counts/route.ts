import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/** Badge counts for the nav: unread notifications, unread DMs, follow requests. */
export async function GET() {
  const { userId, error } = await requireUser();
  if (error) return error;

  const [notifications, messages, requests] = await Promise.all([
    prisma.notification.count({ where: { userId, isRead: false } }),
    prisma.chats.count({ where: { toId: userId, isSeen: false, isDeletedByTo: false } }),
    prisma.relations.count({ where: { destid: userId, type: "Follower" } }),
  ]);

  return NextResponse.json({ notifications, messages, requests });
}
