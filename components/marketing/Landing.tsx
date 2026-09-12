"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import PhoneMock from "./PhoneMock";
import ThemeSwitch from "@/components/shell/ThemeSwitch";
import { DinkaMark, InsightsIcon, MessagesIcon, ExploreIcon, BookmarkIcon } from "@/components/icons";

/**
 * The signed-out page.
 *
 * It shows the product rather than describing it: the three phone frames are
 * the real components at phone width, not screenshots. No user counts, logos or
 * testimonials appear anywhere — none of those exist yet, so none are claimed.
 *
 * Motion is deliberately sparse. One reveal per section, on the section — not
 * on every heading, card and list item inside it. A page where each element
 * arrives separately reads as a page that is still loading.
 */
export default function Landing() {
  const reduce = useReducedMotion();

  const rise = (delay = 0) => ({
    initial: reduce ? {} : { opacity: 0, y: 18 },
    whileInView: reduce ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-50 frost border-b border-line">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2.5 text-ink" aria-label="Dinka">
            <DinkaMark size={26} className="text-glaze dark:text-teal" />
            <span className="wordmark text-[2rem] leading-none">dinka</span>
          </Link>

          {/* At 390px all four controls have to fit beside the wordmark, so the
              primary action shortens rather than wrapping. */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <ThemeSwitch />
            <Link
              href="/login"
              className="press whitespace-nowrap rounded-full px-2.5 py-2 text-[0.875rem] font-semibold text-ink-2 transition-colors hover:text-ink sm:px-4"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="press whitespace-nowrap rounded-full bg-glaze px-3.5 py-2 text-[0.875rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover sm:px-4"
            >
              <span className="sm:hidden">Sign up</span>
              <span className="hidden sm:inline">Create account</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-4 pt-14 sm:pt-20">
        <motion.div {...rise()} className="mx-auto max-w-3xl text-center">
          <h1 className="text-[2.6rem] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink sm:text-[4rem]">
            The feed is the people
            <br />
            <span className="text-ink-3">you actually chose.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[54ch] text-[1.05rem] leading-relaxed text-ink-2 sm:text-[1.15rem]">
            Dinka shows you posts from the accounts you follow — not whatever is loudest. Stories,
            reels, polls and messages in one place, and the numbers on your own posts right there on
            your profile.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="press group inline-flex h-12 items-center gap-2 rounded-full bg-glaze px-7 text-[0.95rem] font-semibold text-glaze-on shadow-[var(--shadow-glaze)] transition-colors hover:bg-glaze-hover"
            >
              Get started — it’s free
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/login"
              className="press inline-flex h-12 items-center rounded-full border border-line bg-tile px-7 text-[0.95rem] font-semibold text-ink transition-colors hover:border-line-strong"
            >
              I already have an account
            </Link>
          </div>

          <p className="meta mt-4">No ads in the feed · Your posts stay yours</p>
        </motion.div>

        {/* Three real phone frames, staggered like the reference layout. */}
        <motion.div
          {...rise(0.12)}
          className="relative mt-14 flex items-end justify-center gap-4 sm:gap-8"
        >
          <div className="hidden w-[240px] shrink-0 translate-y-8 md:block">
            <PhoneMock variant="profile" />
          </div>
          <div className="w-[min(300px,86vw)] shrink-0">
            <PhoneMock variant="feed" />
          </div>
          <div className="hidden w-[240px] shrink-0 translate-y-8 md:block">
            <PhoneMock variant="insights" />
          </div>
        </motion.div>
      </section>

      {/* ── What you get ───────────────────────────────────────────────── */}
      <motion.section {...rise()} className="mx-auto w-full max-w-6xl px-5 py-20">
        <h2 className="max-w-[20ch] text-[1.9rem] font-bold tracking-[-0.03em] text-ink sm:text-[2.6rem]">
          Everything you expect, and the part nobody gives you.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              Icon: ExploreIcon,
              title: "Stories and reels",
              body: "Post a story that clears itself after a day, or a vertical video that plays in a full-screen feed.",
            },
            {
              Icon: MessagesIcon,
              title: "Messages and calls",
              body: "Direct messages, voice and video calls between you and anyone you follow — no separate app.",
            },
            {
              Icon: BookmarkIcon,
              title: "Save and organise",
              body: "Keep posts you want to come back to, sorted into collections you name yourself.",
            },
            {
              Icon: InsightsIcon,
              title: "Your own numbers",
              body: "Reach, engagement rate and your best posts. Attached to your normal account, not an upgrade.",
              highlight: true,
            },
          ].map((f) => (
            <article
              key={f.title}
              className={
                f.highlight
                  ? "rounded-[var(--r-tile)] bg-glaze p-6 text-glaze-on"
                  : "tile p-6"
              }
            >
              <f.Icon
                size={26}
                className={f.highlight ? "text-glaze-on" : "text-glaze dark:text-teal"}
              />
              <h3
                className={`mt-4 text-[1.05rem] font-semibold ${f.highlight ? "text-glaze-on" : "text-ink"}`}
              >
                {f.title}
              </h3>
              <p
                className={`mt-1.5 text-[0.9rem] leading-relaxed ${
                  f.highlight ? "text-glaze-on/80" : "text-ink-2"
                }`}
              >
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </motion.section>

      {/* ── The position ───────────────────────────────────────────────── */}
      <section className="border-y border-line bg-tile">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 lg:grid-cols-2 lg:items-center">
          <motion.div {...rise()}>
            <h2 className="text-[1.9rem] font-bold tracking-[-0.03em] text-ink sm:text-[2.4rem]">
              A feed that does what you told it to.
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-ink-2">
              Following is the default tab, and it contains exactly what its name says: posts from
              the accounts you follow, newest first. Discovery lives in Explore, where you go when
              you want it.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Following is chronological and complete",
                "Explore and Reels are separate destinations",
                "Follower-only posts never leave your circle",
                "AI-written posts are labelled as AI",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-glaze-soft text-glaze dark:text-teal">
                    <Check size={12} strokeWidth={3.5} />
                  </span>
                  <span className="text-[0.95rem] text-ink-2">{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...rise(0.1)} className="mx-auto w-[min(300px,86vw)]">
            <PhoneMock variant="explore" />
          </motion.div>
        </div>
      </section>

      {/* ── Close ──────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-5 py-24">
        <motion.div
          {...rise()}
          className="overflow-hidden rounded-[var(--r-sheet)] bg-ink px-6 py-16 text-center sm:px-16"
        >
          <DinkaMark size={40} className="mx-auto text-ground" />
          <h2 className="mt-6 text-[2rem] font-bold tracking-[-0.03em] text-ground sm:text-[2.6rem]">
            Start with the people you know.
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-[1rem] leading-relaxed text-ground/70">
            Make an account, follow a few people, and post something. That is the whole setup.
          </p>
          <Link
            href="/signup"
            className="press mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-ground px-8 text-[0.95rem] font-semibold text-ink transition-transform"
          >
            Create your account
            <ArrowRight size={17} />
          </Link>
        </motion.div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
          <Link href="/" className="flex items-center gap-2 text-ink">
            <DinkaMark size={20} className="text-glaze dark:text-teal" />
            <span className="wordmark text-[1.5rem] leading-none">dinka</span>
          </Link>
          <p className="meta">© {new Date().getFullYear()} Dinka · To Be Social</p>
          <nav className="flex gap-4">
            <Link href="/login" className="text-[0.85rem] font-medium text-ink-2 hover:text-ink">
              Sign in
            </Link>
            <Link href="/signup" className="text-[0.85rem] font-medium text-ink-2 hover:text-ink">
              Create account
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
