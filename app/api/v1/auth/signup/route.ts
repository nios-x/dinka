import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { userEmailandPassword, UserEmailandPassword } from "@/lib/types";
import { sendOtpMail } from "@/lib/otp-mailer";
export async function POST(req: NextRequest) {
  try {
    const body: UserEmailandPassword = await req.json();
    if (body.stage == 0) {
      const validationResult = userEmailandPassword.safeParse(body);
      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0]?.message || "Invalid input";
        return NextResponse.json({ error: firstError }, { status: 400 });
      }
      const { email, password } = validationResult.data;
      const isUser = await prisma.user.findFirst({
        where: { email },
      });
      if (isUser) {
        console.log(isUser)
        return NextResponse.json("User Found with Same Email", { status: 409 }); // Conflict
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      sendOtpMail({ to: email, otp: otp.toString() })
      await prisma.oTPTable.deleteMany({ where: { email: email } })
      await prisma.oTPTable.create({ data: { otp: otp, email: email } })
      return NextResponse.json({ success: true, user: body, stage: 1 });
    }
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
