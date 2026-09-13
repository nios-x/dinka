import prisma from "@/lib/prisma";
import { extractMentions, extractTags } from "@/lib/richtext";
import type { NotificationType } from "@/generated/prisma";

/**
 * Server-side social side effects: notifying, indexing and shaping.
 *
 * Every write path that produces a notification or a hashtag goes through here
 * so the rules (never notify yourself, collapse duplicates, keep useCount
 * honest) live in one place instead of in eleven route handlers.
 */

type NotifyInput = {
  /** Who receives it. */
  userId: string;
  /** Who caused it. Self-notifications are dropped. */
  actorId: string;
  type: NotificationType;
  postId?: number | null;
  commentId?: string | null;
  message?: string | null;
};

export async function notify(input: NotifyInput): Promise<void> {
  if (!input.userId || input.userId === input.actorId) return;
  try {
    await prisma.notification.create({
      data: {
        userId: input.userId,
        actorId: input.actorId,
        type: input.type,
        postid: input.postId ?? null,
        commentId: input.commentId ?? null,
        message: input.message ?? null,
      },
    });
  } catch {
    // A notification must never fail the action that produced it.
  }
}

/** Removes the notification a now-undone action created (unlike, unfollow). */
export async function unnotify(input: {
  userId: string;
  actorId: string;
  type: NotificationType;
  postId?: number | null;
}): Promise<void> {
  try {
    await prisma.notification.deleteMany({
      where: {
        userId: input.userId,
        actorId: input.actorId,
        type: input.type,
        ...(input.postId ? { postid: input.postId } : {}),
      },
    });
  } catch {
    /* best effort */
  }
}

/** Indexes a post body's hashtags and bumps their use counts. */
export async function indexHashtags(postId: number, body: string): Promise<string[]> {
  const tags = extractTags(body);
  if (!tags.length) return [];
  try {
    for (const tag of tags) {
      const row = await prisma.hashtag.upsert({
        where: { tag },
        create: { tag, useCount: 1 },
        update: { useCount: { increment: 1 } },
      });
      await prisma.postHashtag.upsert({
        where: { postId_hashtagId: { postId, hashtagId: row.id } },
        create: { postId, hashtagId: row.id },
        update: {},
      });
    }
  } catch {
    /* indexing is best effort; the post is already saved */
  }
  return tags;
}

/** Resolves @handles in a body to users and notifies each one. */
export async function notifyMentions(opts: {
  body: string;
  actorId: string;
  postId?: number | null;
  commentId?: string | null;
}): Promise<void> {
  const handles = extractMentions(opts.body);
  if (!handles.length) return;
  try {
    const users = await prisma.user.findMany({
      where: { username: { in: handles, mode: "insensitive" } },
      select: { id: true },
    });
    await Promise.all(
      users.map((u) =>
        notify({
          userId: u.id,
          actorId: opts.actorId,
          type: "Mention",
          postId: opts.postId ?? null,
          commentId: opts.commentId ?? null,
        })
      )
    );
  } catch {
    /* best effort */
  }
}

/** The ids the signed-in user follows, plus their own — the feed's scope. */
export async function followingIds(userId: string): Promise<string[]> {
  const rels = await prisma.relations.findMany({
    where: { srcid: userId, type: "Follower" },
    select: { destid: true },
  });
  return [userId, ...rels.map((r) => r.destid)];
}

/** Ids the user has blocked or been blocked by — excluded everywhere. */
export async function blockedIds(userId: string): Promise<string[]> {
  const rels = await prisma.relations.findMany({
    where: { type: "Blocked", OR: [{ srcid: userId }, { destid: userId }] },
    select: { srcid: true, destid: true },
  });
  const out = new Set<string>();
  for (const r of rels) {
    if (r.srcid !== userId) out.add(r.srcid);
    if (r.destid !== userId) out.add(r.destid);
  }
  return [...out];
}

/**
 * Accounts this person has muted.
 *
 * Separate from `blockedIds` because the two mean different things and apply in
 * different places: a block is mutual and hides both directions everywhere, a
 * mute is one-way, invisible to the other person, and applies only to the
 * feeds — their profile still opens, and a link to their post still works.
 */
export async function mutedIds(userId: string): Promise<string[]> {
  const rows = await prisma.mute.findMany({
    where: { muterId: userId },
    select: { mutedId: true },
  });
  return rows.map((r) => r.mutedId);
}

/** The reaction tally for a set of posts, shaped for the client. */
export function tallyReactions(
  rows: { postId: number; type: string }[]
): Record<number, Record<string, number>> {
  const out: Record<number, Record<string, number>> = {};
  for (const r of rows) {
    (out[r.postId] ??= {})[r.type] = ((out[r.postId] ?? {})[r.type] ?? 0) + 1;
  }
  return out;
}

/**
 * The single post shape every surface consumes. Keeping one serializer means a
 * post looks and behaves identically in the feed, on a profile, in bookmarks
 * and in search results.
 */
export function serializePost(post: any, viewerId: string) {
  const counts: Record<string, number> = {};
  for (const r of post.reactions ?? []) {
    counts[r.type] = (counts[r.type] ?? 0) + 1;
  }
  const mine = (post.reactions ?? []).find((r: any) => r.userId === viewerId);

  const poll = post.poll
    ? {
        id: post.poll.id,
        question: post.poll.question,
        endsAt: post.poll.endsAt,
        options: (post.poll.options ?? []).map((o: any) => ({
          id: o.id,
          label: o.label,
          votes: o._count?.votes ?? o.votes?.length ?? 0,
        })),
        myVote:
          (post.poll.options ?? [])
            .flatMap((o: any) => (o.votes ?? []).map((v: any) => ({ optionId: o.id, userId: v.userId })))
            .find((v: any) => v.userId === viewerId)?.optionId ?? null,
        totalVotes: (post.poll.options ?? []).reduce(
          (sum: number, o: any) => sum + (o._count?.votes ?? o.votes?.length ?? 0),
          0
        ),
      }
    : null;

  return {
    id: post.id,
    title: post.title,
    kind: post.kind,
    visiblity: post.visiblity,
    createdAt: post.createdAt,
    editedAt: post.editedAt ?? null,
    isMedia: post.isMedia,
    mediaurl: post.mediaurl,
    mediaType: post.mediaType,
    mediaWidth: post.mediaWidth,
    mediaHeight: post.mediaHeight,
    location: post.location,
    isSynthetic: post.isSynthetic,
    authorId: post.authorId,
    author: post.author,
    likes: post._count?.likes ?? 0,
    isLiked: (post.likes ?? []).length > 0,
    commentCount: post._count?.comments ?? 0,
    reactionCounts: counts,
    myReaction: mine?.type ?? null,
    isBookmarked: (post.bookmarks ?? []).length > 0,
    repostCount: post._count?.reposts ?? 0,
    shareCount: post.shareCount ?? 0,
    viewCount: post.viewCount ?? 0,
    tags: (post.hashtags ?? []).map((h: any) => h.hashtag?.tag).filter(Boolean),
    poll,
    repostOf: post.repostOf
      ? {
          id: post.repostOf.id,
          title: post.repostOf.title,
          createdAt: post.repostOf.createdAt,
          isMedia: post.repostOf.isMedia,
          mediaurl: post.repostOf.mediaurl,
          authorId: post.repostOf.authorId,
          author: post.repostOf.author,
        }
      : null,
  };
}

/** The include block that feeds `serializePost`. */
export function postInclude(viewerId: string) {
  return {
    author: { select: { id: true, name: true, username: true, pic: true, image: true, isVerified: true } },
    likes: { where: { id: viewerId }, select: { id: true } },
    reactions: { select: { type: true, userId: true } },
    bookmarks: { where: { userId: viewerId }, select: { id: true } },
    hashtags: { select: { hashtag: { select: { tag: true } } } },
    poll: {
      include: {
        options: {
          orderBy: { order: "asc" as const },
          include: {
            votes: { select: { userId: true } },
            _count: { select: { votes: true } },
          },
        },
      },
    },
    repostOf: {
      select: {
        id: true,
        title: true,
        createdAt: true,
        isMedia: true,
        mediaurl: true,
        authorId: true,
        author: { select: { id: true, name: true, username: true, pic: true, image: true, isVerified: true } },
      },
    },
    _count: { select: { likes: true, comments: true, reposts: true } },
  };
}
