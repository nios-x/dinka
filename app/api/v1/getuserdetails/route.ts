import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session: any = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  const userId = session.user.id;

  // Step 1: Get user details, followers and following relations
  const user = await prisma.user.findUnique({
    where: { id: id ? id : userId },
    select: {
      id: true,
      name: true,
      username: true,
      pic: true,
      bio: true,
      createdAt: true,
      followers: {
        where: { type: "Follower" },
        select: {
          src: {
            select: {
              id: true,
              name: true,
              image: true,
              followers: {
                where: { type: "Follower" },
                select: { id: true }, // count followers of this follower
              },
            },
          },
        },
      },
      following: {
        where: { type: "Follower" },
        select: {
          dest: {
            select: {
              id: true,
              name: true,
              pic: true,
              followers: {
                where: { type: "Follower" },
                select: { id: true }, // count followers of this following
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const followersCount = user.followers.length;
  const followingCount = user.following.length;

  const topFollowers = user.followers
    .map((f) => ({
      id: f.src.id,
      name: f.src.name,
      image: f.src.image,
      followerCount: f.src.followers.length,
    }))
    .sort((a, b) => b.followerCount - a.followerCount)
    .slice(0, 3);

  const topFollowing = user.following
    .map((f) => ({
      id: f.dest.id,
      name: f.dest.name,
      image: f.dest.pic,
      followerCount: f.dest.followers.length,
    }))
    .sort((a, b) => b.followerCount - a.followerCount)
    .slice(0, 3);

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      image:
        user.pic ||
        "https://imgs.search.brave.com/XGLf_1PQgMe663J8lzlj5Q43AOJUWIEyTIP1nI4rTT0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvdXNl/ci0zZC1pbGx1c3Ry/YXRpb24tZG93bmxv/YWQtaW4tcG5nLWJs/ZW5kLWZieC1nbHRm/LWZpbGUtZm9ybWF0/cy0tYXZhdGFyLXBy/b2ZpbGUtYWNjb3Vu/dC1pbnRlcmZpY29u/LXNldC0yLWxpZ2h0/LXBhY2staW50ZXJm/YWNlLWlsbHVzdHJh/dGlvbnMtMzEwNTI2/NS5wbmc",
      bio: user.bio,
      createdAt: user.createdAt,
    },
    followersCount,
    followingCount,
    topFollowers,
    topFollowing,
  });
}
