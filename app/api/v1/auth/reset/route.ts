import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { issueOtp, sweepExpiredOtps } from "@/lib/otp";
import { limit } from "@/lib/rate-limit";

/**
 * Asks for a password-reset code.
 *
 * The response is the same whatever happens: sent, not sent, no such account,
 * Google account with no password to reset. An endpoint that answers
 * differently for a known address is a membership oracle — point it at a list
 * of emails and it tells you which of them are on the platform, which for a
 * social network is exactly the thing people expect to control.
 *
 * So: the caller is told a code is on its way, and the decision about whether
 * one actually went is made silently on this side.
 */
export async function POST(req: NextRequest) {
  const limited = limit(req, { key: "reset", limit: 4, windowSeconds: 900 });
  if (limited) return limited;

  const sameAnswer = NextResponse.json({
    success: true,
    message: "If that address has an account, a code is on its way.",
  });

  try {
    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !email.includes("@")) return sameAnswer;

    // A second limit keyed to the address, so one caller cannot walk a list of
    // emails from a pool of IPs and mail every one of them.
    const perAddress = limit(req, {
      key: `reset-address:${email}`,
      limit: 3,
      windowSeconds: 3600,
      userId: email,
    });
    if (perAddress) return sameAnswer;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, provider: true },
    });

    // Google accounts have no password. Issuing a code would let one be set,
    // which quietly turns an OAuth-only account into a password account.
    if (!user || user.provider !== "Email") return sameAnswer;

    void sweepExpiredOtps();
    await issueOtp(email, "Reset");

    return sameAnswer;
  } catch (err) {
    console.error("reset request failed:", err);
    return sameAnswer;
  }
}
