"use client";

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

/**
 * Resetting a forgotten password.
 *
 * Two steps on one screen: ask for a code, then spend it on a new password.
 * The second step signs you in on success, because being told "password
 * changed, now go and sign in" is a step nobody wants after they have already
 * proved who they are twice.
 *
 * The first step never says whether the address has an account. That is the
 * server's rule — see the route — and the copy here has to match it, or the
 * interface leaks what the API is careful not to.
 */
export default function ResetForm({ className }: { className?: string }) {
  const [stage, setStage] = React.useState<0 | 1>(0);
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  const request = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Enter the email you signed up with");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/v1/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 429) {
        toast.error("Too many requests — wait a few minutes and try again");
        return;
      }

      setStage(1);
      toast.success("If that address has an account, a code is on its way");
    } catch {
      toast.error("Could not send the code. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const submit = async (code = otp) => {
    if (code.length < 6) {
      toast.error("Enter the six-digit code from your email");
      return;
    }
    if (password.length < 8) {
      toast.error("Use at least 8 characters for your new password");
      return;
    }

    setBusy(true);
    const res = await signIn("email-reset", {
      redirect: false,
      email,
      otp: code,
      password,
    });
    setBusy(false);

    if (res?.error) {
      // Deliberately one message for every failure. Distinguishing "wrong
      // code" from "no such account" here would undo the server's silence.
      toast.error("That didn’t work. Check the code and try again.");
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
          Use a different email
        </button>

        <p className="text-[0.9rem] leading-relaxed text-ink-2">
          Enter the six-digit code sent to{" "}
          <span className="font-semibold text-ink">{email}</span>, then choose a new password.
        </p>

        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp} autoFocus>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div>
          <label htmlFor="new-password" className="mb-1.5 block text-[0.82rem] font-semibold text-ink-2">
            New password
          </label>
          <div className="relative">
            <input
              id="new-password"
              name="new-password"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>

        <button
          type="button"
          onClick={() => submit()}
          disabled={busy}
          className="press flex h-12 items-center justify-center gap-2 rounded-full bg-glaze text-[0.925rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover disabled:opacity-60"
        >
          {busy && <Loader2 size={17} className="animate-spin" />}
          Set new password
        </button>

        <button
          type="button"
          onClick={request}
          disabled={busy}
          className="text-[0.85rem] font-semibold text-ink-3 transition-colors hover:text-ink disabled:opacity-60"
        >
          Send another code
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={request} className={cn("flex flex-col gap-3.5", className)}>
      <div>
        <label htmlFor="reset-email" className="mb-1.5 block text-[0.82rem] font-semibold text-ink-2">
          Email
        </label>
        <input
          id="reset-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="press mt-1 flex h-12 items-center justify-center gap-2 rounded-full bg-glaze text-[0.925rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover disabled:opacity-60"
      >
        {busy && <Loader2 size={17} className="animate-spin" />}
        Send reset code
      </button>

      <p className="text-center text-[0.8rem] text-ink-3">
        Signed up with Google?{" "}
        <Link href="/login" className="font-semibold text-ink-2 hover:underline">
          Sign in with Google instead
        </Link>
      </p>
    </form>
  );
}

const fieldClass =
  "h-12 w-full rounded-[var(--r-field)] border border-line bg-tile px-4 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-glaze";
