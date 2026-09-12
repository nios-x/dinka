"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { ArrowDownRight, ArrowUpRight, BarChart3, Table2, Minus } from "lucide-react";
import PageHeader from "@/components/shell/PageHeader";
import EmptyState from "@/components/ui/empty-state";
import { compact, delta, pct } from "@/lib/format";
import { cn } from "@/lib/utils";
import { InsightsIcon } from "@/components/icons";
import MediaThumb from "@/components/ui/media-thumb";

/**
 * Creator insights.
 *
 * Every figure here is counted from real rows — nothing is modelled or
 * estimated. Two series (reactions and comments) share one axis because they
 * are the same unit; they stack into total engagement.
 *
 * Series colors are validated for colorblind separation against each mode's
 * surface (light #0E8F80/#6355C8, dark #12A08F/#7B6CDC).
 */

type Insights = {
  days: number;
  totals: {
    followers: number;
    followersDelta: number;
    engagementRate: number;
    engagementRateDelta: number;
    reach: number;
    reachDelta: number;
    impressions: number;
    impressionsDelta: number;
    posts: number;
    engagements: number;
  };
  series: { date: string; reactions: number; comments: number }[];
  topPosts: {
    id: number;
    title: string;
    kind: string;
    mediaurl: string | null;
    isMedia: boolean;
    createdAt: string;
    views: number;
    reactions: number;
    comments: number;
    rate: number;
  }[];
};

/* The charting library is a third of this route's JavaScript. It loads when a
   chart is actually drawn, so the table view and a brand-new account with
   nothing to plot never pay for it. */
const EngagementChart = dynamic(() => import("@/components/insights/EngagementChart"), {
  ssr: false,
  loading: () => <div className="skeleton h-56 w-full rounded-[var(--r-field)]" />,
});

const RANGES = [7, 30, 90] as const;

const SERIES = [
  { key: "reactions" as const, label: "Reactions", light: "#0E8F80", dark: "#12A08F" },
  { key: "comments" as const, label: "Comments", light: "#6355C8", dark: "#7B6CDC" },
];

export default function Page() {
  const [days, setDays] = React.useState<number>(30);
  const [data, setData] = React.useState<Insights | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [view, setView] = React.useState<"chart" | "table">("chart");
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  React.useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/insights?days=${days}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [days]);

  const colorOf = (s: (typeof SERIES)[number]) => (dark ? s.dark : s.light);
  const hasActivity = !!data && data.totals.engagements > 0;

  return (
    <>
      <PageHeader title="Insights" subtitle="Counted from your real posts — nothing estimated">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setDays(r)}
                aria-pressed={days === r}
                className={cn(
                  "press rounded-full px-3.5 py-1.5 text-[0.8rem] font-semibold transition-colors",
                  days === r ? "bg-glaze text-glaze-on" : "bg-tile-sunk text-ink-2 hover:text-ink"
                )}
              >
                {r}d
              </button>
            ))}
          </div>

          <div className="flex gap-0.5 rounded-full bg-tile-sunk p-0.5">
            <button
              type="button"
              onClick={() => setView("chart")}
              aria-pressed={view === "chart"}
              aria-label="Chart view"
              className={cn(
                "press grid h-8 w-8 place-items-center rounded-full transition-colors",
                view === "chart" ? "bg-tile text-ink shadow-[var(--shadow-xs)]" : "text-ink-3"
              )}
            >
              <BarChart3 size={15} />
            </button>
            <button
              type="button"
              onClick={() => setView("table")}
              aria-pressed={view === "table"}
              aria-label="Table view"
              className={cn(
                "press grid h-8 w-8 place-items-center rounded-full transition-colors",
                view === "table" ? "bg-tile text-ink shadow-[var(--shadow-xs)]" : "text-ink-3"
              )}
            >
              <Table2 size={15} />
            </button>
          </div>
        </div>
      </PageHeader>

      {loading && !data ? (
        <div className="space-y-3 p-4">
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-[92px] rounded-[var(--r-tile)]" />
            ))}
          </div>
          <div className="skeleton h-56 rounded-[var(--r-tile)]" />
        </div>
      ) : !data ? (
        <EmptyState
          icon={<InsightsIcon size={26} />}
          title="Insights aren’t available"
          body="We couldn’t load your numbers just now. Try again in a moment."
        />
      ) : (
        <div className="space-y-3 p-3 sm:p-4">
          {/* Stat tiles — hero numbers, not charts. */}
          <div className="grid grid-cols-2 gap-2.5">
            <Stat label="Followers" value={compact(data.totals.followers)} change={data.totals.followersDelta} note="total" />
            <Stat
              label="Engagement"
              value={pct(data.totals.engagementRate)}
              change={data.totals.engagementRateDelta}
              note="per person reached"
              unit="pt"
            />
            <Stat label="Reach" value={compact(data.totals.reach)} change={data.totals.reachDelta} note={`people · ${days}d`} />
            <Stat label="Impressions" value={compact(data.totals.impressions)} change={data.totals.impressionsDelta} note="total views" />
          </div>

          {/* Engagement over time */}
          <section className="tile p-4">
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <h2 className="text-[0.95rem] font-semibold text-ink">Engagement over time</h2>
              <span className="meta">
                {compact(data.totals.engagements)} in {days} days
              </span>
            </div>

            {/* A legend is always present for two series. */}
            <div className="mb-3 flex items-center gap-4">
              {SERIES.map((s) => (
                <span key={s.key} className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: colorOf(s) }}
                    aria-hidden
                  />
                  <span className="text-[0.78rem] font-medium text-ink-2">{s.label}</span>
                </span>
              ))}
            </div>

            {!hasActivity ? (
              <p className="py-10 text-center text-[0.875rem] text-ink-3">
                No reactions or comments in this period yet.
              </p>
            ) : view === "chart" ? (
              <EngagementChart data={data.series} series={SERIES} colorOf={colorOf} />
            ) : (
              <div className="max-h-56 overflow-auto">
                <table className="w-full text-left text-[0.82rem]">
                  <caption className="sr-only">Daily reactions and comments</caption>
                  <thead className="sticky top-0 bg-tile">
                    <tr className="text-ink-3">
                      <th scope="col" className="py-1.5 font-medium">Date</th>
                      <th scope="col" className="py-1.5 text-right font-medium">Reactions</th>
                      <th scope="col" className="py-1.5 text-right font-medium">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.series.map((row) => (
                      <tr key={row.date} className="border-t border-line">
                        <td className="py-1.5 text-ink-2">
                          {new Date(row.date).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-1.5 text-right tabular-nums text-ink">{row.reactions}</td>
                        <td className="py-1.5 text-right tabular-nums text-ink">{row.comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Top posts */}
          <section className="tile p-1.5">
            <h2 className="px-3 pb-1 pt-3 text-[0.95rem] font-semibold text-ink">Top performing posts</h2>

            {data.topPosts.length === 0 ? (
              <p className="px-3 py-8 text-center text-[0.875rem] text-ink-3">
                Post something and it will be ranked here.
              </p>
            ) : (
              <ul>
                {data.topPosts.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/postid/${p.id}`}
                      className="flex items-center gap-3 rounded-[var(--r-field)] px-3 py-2.5 transition-colors hover:bg-tile-sunk"
                    >
                      {p.isMedia && p.mediaurl ? (
                        <MediaThumb
                          url={p.mediaurl}
                          alt=""
                          width={160}
                          className="h-12 w-12 shrink-0 rounded-[var(--r-chip)]"
                        />
                      ) : (
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[var(--r-chip)] bg-tile-sunk text-[0.62rem] font-bold uppercase tracking-wide text-ink-3">
                          {p.kind}
                        </span>
                      )}

                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-1 text-[0.875rem] font-medium text-ink">
                          {p.title || "Untitled post"}
                        </span>
                        <span className="meta block">
                          {compact(p.reactions)} reactions · {compact(p.comments)} comments ·{" "}
                          {compact(p.views)} views
                        </span>
                      </span>

                      <span className="shrink-0 text-right">
                        <span className="block text-[0.95rem] font-bold tabular-nums text-ink">
                          {pct(p.rate)}
                        </span>
                        <span className="meta block">eng. rate</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <p className="meta px-2 pb-2">
            Reach counts distinct people who opened a post. Impressions counts every view. Both are
            recorded when someone actually loads the post.
          </p>
        </div>
      )}
    </>
  );
}

function Stat({
  label,
  value,
  change,
  note,
  unit,
}: {
  label: string;
  value: string;
  change: number;
  note: string;
  unit?: string;
}) {
  const flat = Math.abs(change) < 0.05;
  const up = change > 0;

  return (
    <div className="stat">
      <p className="text-[0.78rem] font-medium text-ink-3">{label}</p>
      <p className="mt-0.5 text-[1.7rem] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-ink">
        {value}
      </p>
      <p className="mt-1.5 flex items-center gap-1">
        <span
          className="flex items-center gap-0.5 text-[0.75rem] font-bold tabular-nums"
          style={{ color: flat ? "var(--ink-3)" : up ? "var(--teal)" : "var(--ember)" }}
        >
          {flat ? <Minus size={12} /> : up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {flat ? "no change" : `${delta(change)}${unit ?? ""}`}
        </span>
        <span className="meta truncate">{note}</span>
      </p>
    </div>
  );
}

