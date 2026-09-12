import React from "react";

/**
 * The route-level fallback, shown while a surface's code and data arrive.
 *
 * A placeholder shaped like the page that is coming reads as the page loading;
 * a centred spinner reads as the app stalling. The header block matches
 * PageHeader's geometry and the rows match the feed's posts, which run edge to
 * edge with one hairline between them.
 */
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>

      <div className="glass-bar sticky top-14 z-30 border-b border-line lg:top-0">
        <div className="flex items-center gap-2 px-3 py-2.5 sm:px-4">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="skeleton h-4 w-32 rounded-full" />
            <div className="skeleton h-2.5 w-44 rounded-full" />
          </div>
          <div className="skeleton h-9 w-9 shrink-0 rounded-full" />
        </div>
      </div>

      {[0, 1, 2].map((i) => (
        <div key={i} className="card rounded-none border-x-0 border-t-0 p-4 shadow-none">
          <div className="flex items-center gap-3">
            <div className="skeleton h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-3.5 w-32 rounded-full" />
              <div className="skeleton h-2.5 w-20 rounded-full" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="skeleton h-3 w-full rounded-full" />
            <div className="skeleton h-3 w-[82%] rounded-full" />
            {i === 0 && <div className="skeleton h-3 w-[54%] rounded-full" />}
          </div>
        </div>
      ))}
    </div>
  );
}
