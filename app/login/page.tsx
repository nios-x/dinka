import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Dinka.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to pick up where you left off."
      footer={
        <>
          New here?{" "}
          <Link href="/signup" className="font-semibold text-glaze hover:underline dark:text-teal">
            Create an account
          </Link>
        </>
      }
    >
      {/* The form reads `?next=`, so it needs its own boundary to stay
          statically renderable. */}
      <Suspense fallback={<FormFallback />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}

/** Holds the form's exact geometry so the panel does not resize under you. */
function FormFallback() {
  return (
    <div className="flex flex-col gap-5" aria-hidden>
      <div className="skeleton h-12 w-full rounded-full" />
      <div className="skeleton mx-auto h-3 w-8 rounded-full" />
      <div className="flex flex-col gap-3.5">
        <div className="skeleton h-[4.4rem] w-full rounded-[var(--r-field)]" />
        <div className="skeleton h-[4.4rem] w-full rounded-[var(--r-field)]" />
        <div className="skeleton mt-1 h-12 w-full rounded-full" />
      </div>
    </div>
  );
}
