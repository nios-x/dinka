import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";

/**
 * Route guard.
 *
 * Returns the signed-in user's id, or a ready-made 401 response. Sessions carry
 * an id, but older tokens may only have an email, so this falls back to a
 * lookup rather than failing the request.
 */
export async function requireUser(): Promise<
  { userId: string; error: null } | { userId: null; error: NextResponse }
> {
  const session: any = await getServerSession(authOptions);

  if (session?.user?.id) return { userId: session.user.id as string, error: null };

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (user) return { userId: user.id, error: null };
  }

  return {
    userId: null,
    error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
  };
}

/** Parses a JSON body without throwing on an empty or malformed one. */
export async function readJson<T = any>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}
