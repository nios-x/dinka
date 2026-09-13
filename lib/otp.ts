import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { sendOtpMail } from "@/lib/otp-mailer";
import type { OtpPurpose } from "@/generated/prisma";

/**
 * Email codes.
 *
 * One place for both flows that issue them — signup and password reset —
 * because the two differ only in what the code entitles you to, and that
 * difference is the whole security model:
 *
 *   A Signup code must never sign you into an account that already exists.
 *   A Reset code must never create one.
 *
 * Keeping issuance and verification in one file is what stops the second flow
 * from quietly reintroducing the hole the first one closed.
 */

/** How long a code is good for. Short, because the mail arrives in seconds. */
const TTL_MINUTES = 10;

/**
 * How many wrong guesses a code tolerates before it dies.
 *
 * This is the cap that matters. A six-digit code is one in a million, which is
 * only strong if the number of guesses is bounded — and the in-memory rate
 * limiter cannot bound it alone, because it counts per instance and resets on
 * cold start. Five attempts against a ten-minute code is a 1-in-200,000 chance
 * per issued code, and the code dies rather than the attacker being merely
 * slowed down.
 */
const MAX_ATTEMPTS = 5;

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: "missing" | "expired" | "locked" | "wrong" };

/**
 * Issues a code and mails it.
 *
 * Replaces any code already outstanding for that address, so requesting a new
 * one invalidates the old — otherwise every resend widens the window an
 * attacker is guessing into.
 *
 * The send is awaited: on a serverless runtime a fire-and-forget `sendMail`
 * races the function shutting down, which is why some codes never arrive.
 */
export async function issueOtp(
  email: string,
  purpose: OtpPurpose
): Promise<{ sent: boolean }> {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const hash = await bcrypt.hash(code, 10);

  await prisma.oTPTable.upsert({
    where: { email },
    create: { email, otp: hash, purpose, expiry: new Date(), attempts: 0 },
    update: { otp: hash, purpose, expiry: new Date(), attempts: 0 },
  });

  const result = await sendOtpMail({ to: email, otp: code });
  return { sent: result.success };
}

/**
 * Checks a code and spends it.
 *
 * A correct code is deleted before this returns, so it cannot be replayed —
 * including by the person who legitimately used it, on a second tab.
 */
export async function verifyOtp(
  email: string,
  code: string,
  purpose: OtpPurpose
): Promise<VerifyResult> {
  const record = await prisma.oTPTable.findUnique({ where: { email } });

  if (!record || record.purpose !== purpose) return { ok: false, reason: "missing" };

  if (record.expiry.getTime() + TTL_MINUTES * 60 * 1000 < Date.now()) {
    await prisma.oTPTable.delete({ where: { email } }).catch(() => {});
    return { ok: false, reason: "expired" };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    await prisma.oTPTable.delete({ where: { email } }).catch(() => {});
    return { ok: false, reason: "locked" };
  }

  const matches = await bcrypt.compare(code, record.otp);

  if (!matches) {
    // Counted before returning, so a guess costs the attacker an attempt even
    // if they abandon the connection.
    await prisma.oTPTable.update({
      where: { email },
      data: { attempts: { increment: 1 } },
    });
    return { ok: false, reason: "wrong" };
  }

  await prisma.oTPTable.delete({ where: { email } }).catch(() => {});
  return { ok: true };
}

/** Clears codes nobody came back for. Safe to call from any write path. */
export async function sweepExpiredOtps(): Promise<void> {
  await prisma.oTPTable
    .deleteMany({
      where: { expiry: { lt: new Date(Date.now() - TTL_MINUTES * 60 * 1000) } },
    })
    .catch(() => {});
}
