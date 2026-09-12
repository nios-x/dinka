"use client";

import React from "react";
import Link from "next/link";
import { DinkaMark } from "@/components/icons";
import ThemeSwitch from "@/components/shell/ThemeSwitch";

/**
 * The frame around signing in and signing up.
 *
 * A split layout on desktop — the form on the left, a quiet panel of what the
 * account is for on the right — and the form alone on a phone, where the panel
 * would only push the fields below the fold.
 */
export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col px-5 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-ink" aria-label="Dinka home">
            <DinkaMark size={26} className="text-glaze dark:text-teal" />
            <span className="wordmark text-[2rem] leading-none">dinka</span>
          </Link>
          <ThemeSwitch />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <h1 className="text-[1.9rem] font-extrabold tracking-[-0.03em] text-ink">{title}</h1>
            <p className="mt-1.5 text-[0.95rem] text-ink-2">{subtitle}</p>

            <div className="mt-7">{children}</div>

            <div className="mt-6 text-center text-[0.875rem] text-ink-2">{footer}</div>
          </div>
        </div>

        <p className="text-center text-[0.75rem] leading-relaxed text-ink-3">
          By continuing you agree to our{" "}
          <Link href="/terms-of-service" className="underline underline-offset-2 hover:text-ink-2">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      {/* The panel is decorative context, so it is hidden from assistive tech. */}
      <aside
        aria-hidden
        className="relative hidden overflow-hidden bg-ink lg:flex lg:flex-col lg:justify-center lg:px-14"
      >
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 22% 18%, var(--teal), transparent 46%), radial-gradient(circle at 82% 76%, var(--iris), transparent 48%)",
          }}
        />

        <blockquote className="relative max-w-md">
          <p className="text-[2rem] font-bold leading-[1.18] tracking-[-0.03em] text-ground">
            The feed is the people you actually chose.
          </p>
          <p className="mt-5 text-[1rem] leading-relaxed text-ground/70">
            Following is chronological and complete. Discovery lives in Explore, where you go when
            you want it — not in the middle of your morning.
          </p>
        </blockquote>

        <ul className="relative mt-10 grid max-w-md gap-3">
          {[
            ["Stories and reels", "Post a day-long story or a vertical video."],
            ["Messages and calls", "DMs, voice and video with anyone you follow."],
            ["Your own numbers", "Reach and engagement on your normal account."],
          ].map(([title, body]) => (
            <li key={title} className="rounded-[var(--r-tile)] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[0.95rem] font-semibold text-ground">{title}</p>
              <p className="mt-0.5 text-[0.85rem] text-ground/65">{body}</p>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
