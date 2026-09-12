"use client";

import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

/**
 * Sign-in: Google, or email and password.
 *
 * `?next=` is honoured. A shared post link sends a signed-out visitor here with
 * the post in that parameter, and landing them on the generic feed afterwards
 * loses whatever they actually clicked. Only same-origin paths are accepted, so
 * the parameter cannot be used to bounce someone off the site.
 */
function safeNext(raw: string | null | undefined): string {
  if (!raw) return "/";
  return raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";
}

export function LoginForm({ className }: { className?: string }) {
  const { data: session } = useSession();
  const params = useSearchParams();
  const next = safeNext(params?.get("next"));
  const [credentials, setCredentials] = React.useState({ email: "", password: "" });
  const [show, setShow] = React.useState(false);
  const [busy, setBusy] = React.useState<"google" | "email" | null>(null);

  if (session) {
    return (
      <div className="rounded-[var(--r-tile)] border border-line bg-tile p-5 text-center">
        <p className="text-[0.95rem] text-ink">
          You’re signed in as <span className="font-semibold">{session.user?.email}</span>
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href="/"
            className="press rounded-full bg-glaze py-2.5 text-[0.875rem] font-semibold text-glaze-on"
          >
            Go to your feed
          </Link>
          <button
            type="button"
            onClick={() => signOut()}
            className="press rounded-full border border-line py-2.5 text-[0.875rem] font-semibold text-ink"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) return;

    setBusy("email");
    const res = await signIn("email-password", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });
    setBusy(null);

    if (res?.error) {
      toast.error("That email and password don’t match an account");
      return;
    }
    window.location.href = next;
  };

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <button
        type="button"
        onClick={() => {
          setBusy("google");
          signIn("google", { callbackUrl: next });
        }}
        disabled={busy !== null}
        className="press flex h-12 items-center justify-center gap-2.5 rounded-full border border-line bg-tile text-[0.925rem] font-semibold text-ink transition-colors hover:border-line-strong disabled:opacity-60"
      >
        {busy === "google" ? (
          <Loader2 size={17} className="animate-spin" />
        ) : (
          <GoogleMark />
        )}
        Continue with Google
      </button>

      <div className="relative text-center">
        <span className="absolute inset-x-0 top-1/2 h-px bg-line" aria-hidden />
        <span className="meta relative bg-ground px-3">or</span>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-3.5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[0.82rem] font-semibold text-ink-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={credentials.email}
            onChange={(e) => setCredentials((c) => ({ ...c, email: e.target.value }))}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>

        <div>
          {/* There is no password-reset route behind the product yet, and a
              "Forgot it?" link that 404s is worse than no link at all. Restore
              this the moment a reset flow exists. */}
          <label htmlFor="password" className="mb-1.5 block text-[0.82rem] font-semibold text-ink-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials((c) => ({ ...c, password: e.target.value }))}
              placeholder="Your password"
              className={cn(fieldClass, "pr-12")}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-ink-3 transition-colors hover:text-ink"
            >
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={busy !== null}
          className="press mt-1 flex h-12 items-center justify-center gap-2 rounded-full bg-glaze text-[0.925rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover disabled:opacity-60"
        >
          {busy === "email" && <Loader2 size={17} className="animate-spin" />}
          Sign in
        </button>
      </form>
    </div>
  );
}

const fieldClass =
  "h-12 w-full rounded-[var(--r-field)] border border-line bg-tile px-4 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-glaze";

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.92l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.28a12 12 0 0 0 0 10.74l4.01-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.63l4.01 3.09C6.23 6.88 8.88 4.77 12 4.77Z"
      />
    </svg>
  );
}
