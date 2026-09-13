import type { Metadata } from "next";
import Link from "next/link";
import ResetForm from "@/components/auth/ResetForm";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "Send yourself a code and choose a new password for your Dinka account.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a code, then you can pick a new one."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/login" className="font-semibold text-glaze hover:underline dark:text-teal">
            Back to sign in
          </Link>
        </>
      }
    >
      <ResetForm />
    </AuthShell>
  );
}
