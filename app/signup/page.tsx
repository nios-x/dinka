import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/signup-page";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Join Dinka.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Follow a few people, post something. That’s the whole setup."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-glaze hover:underline dark:text-teal">
            Sign in
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
