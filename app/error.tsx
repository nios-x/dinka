"use client";

import React from "react";
import Link from "next/link";
import { RotateCw } from "lucide-react";

/**
 * A surface that threw.
 *
 * Retrying is the first thing worth trying and the first thing offered, because
 * most of what fails here is a request that can simply be made again. The digest
 * is shown quietly — it is the only handle anyone has when reporting this.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <h1 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-ink sm:text-[2rem]">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-[44ch] text-[0.95rem] leading-relaxed text-ink-2">
        This screen failed to load. Trying again usually fixes it — nothing you posted has been
        lost.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={reset}
          className="press inline-flex h-11 items-center gap-2 rounded-full bg-glaze px-6 text-[0.9rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover"
        >
          <RotateCw size={16} />
          Try again
        </button>
        <Link
          href="/"
          className="press inline-flex h-11 items-center rounded-full border border-line px-6 text-[0.9rem] font-semibold text-ink transition-colors hover:border-line-strong"
        >
          Go to your feed
        </Link>
      </div>

      {error.digest && <p className="meta mt-8">Reference {error.digest}</p>}
    </main>
  );
}
