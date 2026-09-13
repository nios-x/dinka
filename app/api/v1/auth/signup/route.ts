import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { userEmailandPassword, UserEmailandPassword } from "@/lib/types";
import { issueOtp, sweepExpiredOtps } from "@/lib/otp";
import { limit } from "@/lib/rate-limit";

/**
 * Step one of signing up: prove you own the address.
 *
 * Three things this route deliberately does not do:
 *
 *   It does not send the code in the response, or store it where it could be
 *   read back — `issueOtp` keeps only a hash.
 *
 *   It does not echo the request body. It used to return `user: body`, which
 *   sent the submitted password back down the wire for no reason.
 *
 *   It does not answer faster for an unknown address than a known one in a way
 *   worth measuring. The 409 for an existing account is unavoidable here —
 *   signup has to tell you the address is taken — but that is also why the
 *   password-reset flow refuses to say anything at all.
 */
export async function POST(req: NextRequest) {
  // Mailing costs money and reputation, and an unthrottled code generator is
  // both an email bomb aimed at whoever you name and a free brute-force
  // oracle. Five in ten minutes per caller is generous for a real signup.
  const limited = limit(req, { key: "signup", limit: 5, windowSeconds: 600 });
  if (limited) return limited;

  try {
    const body: UserEmailandPassword = await req.json();

    if (body.stage !== 0) {
      return NextResponse.json({ error: "Unknown signup stage" }, { status: 400 });
    }

    const validationResult = userEmailandPassword.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const email = validationResult.data.email.trim().toLowerCase();

    const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (existing) {
      return NextResponse.json(
        { error: "An account already uses that email. Sign in instead." },
        { status: 409 }
      );
    }

    void sweepExpiredOtps();

    const { sent } = await issueOtp(email, "Signup");
    if (!sent) {
      return NextResponse.json(
        { error: "We couldn't send that code. Check the address and try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, stage: 1 });
  } catch (err) {
    console.error("signup failed:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
