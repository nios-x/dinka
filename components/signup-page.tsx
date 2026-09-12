"use client";

import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, ArrowLeft, MailCheck } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

/**
 * Sign-up in two steps: details, then the emailed code.
 *
 * The step is visible up front so the code screen is not a surprise, and the
 * email is repeated on step two so you can tell whether you mistyped it.
 */
export function LoginForm({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [stage, setStage] = React.useState(0);
  const [otp, setOtp] = React.useState("");
  const [credentials, setCredentials] = React.useState({ email: "", password: "" });
  const [show, setShow] = React.useState(false);
  const [busy, setBusy] = React.useState<"google" | "email" | null>(null);

  if (session) {
    return (
      <div className="rounded-[var(--r-tile)] border border-line bg-tile p-5 text-center">
        <p className="text-[0.95rem] text-ink">
          You already have an account as{" "}
          <span className="font-semibold">{session.user?.email}</span>
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

  const requestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.password.length < 8) {
      toast.error("Use at least 8 characters for your password");
      return;
    }

    setBusy("email");
    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...credentials, stage: 0 }),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (data.success) {
        setStage(1);
        toast.success("Code sent — check your inbox");
      }
    } catch {
      toast.error("Could not send the code. Try again.");
    } finally {
      setBusy(null);
    }
  };

  const verify = async (code = otp) => {
    if (code.length < 6) return;
    setBusy("email");
    const res = await signIn("email-otp", {
      redirect: false,
      email: credentials.email,
      otp: code,
      password: credentials.password,
    });
    setBusy(null);

    if (res?.error) {
      toast.error("That code didn’t work. Check it and try again.");
      setOtp("");
      return;
    }
    window.location.href = "/";
  };

  if (stage === 1) {
    return (
      <div className={cn("flex flex-col gap-5", className)}>
        <button
          type="button"
          onClick={() => {
            setStage(0);
            setOtp("");
          }}
          className="flex items-center gap-1.5 self-start text-[0.85rem] font-semibold text-ink-3 transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} />
          Change email
        </button>

        <div className="flex items-start gap-3 rounded-[var(--r-tile)] border border-line bg-tile p-4">
          <MailCheck size={19} className="mt-0.5 shrink-0 text-glaze dark:text-teal" />
          <p className="text-[0.875rem] leading-relaxed text-ink-2">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-ink">{credentials.email}</span>. It expires in five
            minutes.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void verify();
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label htmlFor="otp" className="mb-2 block text-[0.82rem] font-semibold text-ink-2">
              Verification code
            </label>
            <InputOTP
              id="otp"
              maxLength={6}
              value={otp}
              onChange={(v) => {
                setOtp(v);
                // Submit as soon as the last digit lands.
                if (v.length === 6) void verify(v);
              }}
            >
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="h-12 w-11 rounded-[var(--r-field)] border border-line bg-tile text-[1.05rem] font-semibold text-ink first:rounded-l-[var(--r-field)] last:rounded-r-[var(--r-field)] data-[active=true]:border-glaze data-[active=true]:ring-0"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <button
            type="submit"
            disabled={otp.length < 6 || busy !== null}
            className="press flex h-12 items-center justify-center gap-2 rounded-full bg-glaze text-[0.925rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover disabled:opacity-60"
          >
            {busy === "email" && <Loader2 size={17} className="animate-spin" />}
            Create account
          </button>

          <button
            type="button"
            onClick={requestCode}
            disabled={busy !== null}
            className="text-[0.82rem] font-medium text-ink-3 transition-colors hover:text-ink"
          >
            Didn’t get it? Send another code
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <button
        type="button"
        onClick={() => {
          setBusy("google");
          signIn("google", { callbackUrl: "/" });
        }}
        disabled={busy !== null}
        className="press flex h-12 items-center justify-center gap-2.5 rounded-full border border-line bg-tile text-[0.925rem] font-semibold text-ink transition-colors hover:border-line-strong disabled:opacity-60"
      >
        {busy === "google" ? <Loader2 size={17} className="animate-spin" /> : <GoogleMark />}
        Continue with Google
      </button>

      <div className="relative text-center">
        <span className="absolute inset-x-0 top-1/2 h-px bg-line" aria-hidden />
        <span className="meta relative bg-ground px-3">or</span>
      </div>

      <form onSubmit={requestCode} className="flex flex-col gap-3.5">
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
          <label htmlFor="password" className="mb-1.5 block text-[0.82rem] font-semibold text-ink-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={credentials.password}
              onChange={(e) => setCredentials((c) => ({ ...c, password: e.target.value }))}
              placeholder="At least 8 characters"
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
          <p
            className={cn(
              "mt-1.5 text-[0.75rem]",
              credentials.password && credentials.password.length < 8 ? "text-ember" : "text-ink-3"
            )}
          >
            {credentials.password && credentials.password.length < 8
              ? `${8 - credentials.password.length} more characters needed`
              : "8 characters minimum"}
          </p>
        </div>

        <button
          type="submit"
          disabled={busy !== null}
          className="press mt-1 flex h-12 items-center justify-center gap-2 rounded-full bg-glaze text-[0.925rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover disabled:opacity-60"
        >
          {busy === "email" && <Loader2 size={17} className="animate-spin" />}
          Send verification code
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
      <path fill="#FBBC05" d="M5.29 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.28a12 12 0 0 0 0 10.74l4.01-3.09Z" />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.63l4.01 3.09C6.23 6.88 8.88 4.77 12 4.77Z"
      />
    </svg>
  );
}
