import React from "react";
import Link from "next/link";
import { DinkaMark } from "@/components/icons";

/**
 * The frame for the two documents linked from sign-up.
 *
 * A single reading column, no app chrome, no cards: these are pages you read
 * once, and the only jobs are a comfortable measure and a way back. Headings
 * carry the structure; nothing here is decorative.
 */
export default function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh">
      <header className="frost sticky top-0 z-40 border-b border-line">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2.5 text-ink" aria-label="Dinka home">
            <DinkaMark size={24} className="text-glaze dark:text-teal" />
            <span className="wordmark text-[1.8rem] leading-none">dinka</span>
          </Link>
          <Link
            href="/signup"
            className="press rounded-full bg-glaze px-4 py-2 text-[0.85rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover"
          >
            Create account
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 pb-24 pt-12 sm:pt-16">
        <p className="meta">Last updated {updated}</p>
        <h1 className="mt-2 text-[2rem] font-extrabold tracking-[-0.03em] text-ink sm:text-[2.6rem]">
          {title}
        </h1>
        <p className="mt-4 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-2">{intro}</p>

        <div className="mt-10 max-w-[68ch] space-y-9">{children}</div>

        <p className="mt-14 border-t border-line pt-6 text-[0.9rem] text-ink-3">
          Questions about any of this? Write to us and we will answer in plain language.
        </p>
      </main>
    </div>
  );
}

/** One numbered section. The heading is the contract; the body explains it. */
export function Clause({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[1.15rem] font-bold tracking-[-0.02em] text-ink">{title}</h2>
      <div className="mt-2.5 space-y-3 text-[0.95rem] leading-[1.7] text-ink-2">{children}</div>
    </section>
  );
}

/** A plain list. Markers are hairlines, not decoration. */
export function Points({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-line-strong" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
