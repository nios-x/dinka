import Link from "next/link";
import { DinkaMark } from "@/components/icons";

/**
 * A page that is not there.
 *
 * Next's stock 404 is unbranded and offers nothing to do. This one says what
 * happened in one line and gives the two routes back into the product that
 * actually help: the feed, and search.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <DinkaMark size={34} className="text-ink-4" />

      <p className="meta mt-6">Error 404</p>
      <h1 className="mt-2 text-[1.6rem] font-extrabold tracking-[-0.025em] text-ink sm:text-[2rem]">
        This page isn’t here
      </h1>
      <p className="mt-2 max-w-[42ch] text-[0.95rem] leading-relaxed text-ink-2">
        The link may be wrong, or whatever was here has been deleted. Nothing is broken on your end.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
        <Link
          href="/"
          className="press inline-flex h-11 items-center rounded-full bg-glaze px-6 text-[0.9rem] font-semibold text-glaze-on transition-colors hover:bg-glaze-hover"
        >
          Go to your feed
        </Link>
        <Link
          href="/explore"
          className="press inline-flex h-11 items-center rounded-full border border-line px-6 text-[0.9rem] font-semibold text-ink transition-colors hover:border-line-strong"
        >
          Explore
        </Link>
      </div>
    </main>
  );
}
