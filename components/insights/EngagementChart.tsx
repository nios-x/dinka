"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * Reactions and comments per day, stacked.
 *
 * This lives in its own file so the chart library loads only when the chart is
 * actually shown. Insights opens on the chart, but the table view — and the
 * empty state, which is what a new account sees — never pull it in.
 *
 * Series colours are validated for colourblind separation against each mode's
 * surface. They are passed in rather than read here so the page owns one
 * definition of the palette.
 */

export type Series = { key: "reactions" | "comments"; label: string; light: string; dark: string };
export type Point = { date: string; reactions: number; comments: number };

const shortDate = (d: string) =>
  new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });

export default function EngagementChart({
  data,
  series,
  colorOf,
}: {
  data: Point[];
  series: Series[];
  colorOf: (s: Series) => string;
}) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key} id={`fill-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colorOf(s)} stopOpacity={0.34} />
                <stop offset="100%" stopColor={colorOf(s)} stopOpacity={0.04} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={28}
            tick={{ fill: "var(--ink-3)", fontSize: 10 }}
            tickFormatter={shortDate}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={44}
            allowDecimals={false}
            tick={{ fill: "var(--ink-3)", fontSize: 10 }}
          />
          <Tooltip
            cursor={{ stroke: "var(--line-strong)", strokeWidth: 1 }}
            content={<ChartTooltip series={series} colorOf={colorOf} />}
          />

          {/* Stacked: both series are engagements, so they sum. */}
          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stackId="engagement"
              stroke={colorOf(s)}
              strokeWidth={2}
              fill={`url(#fill-${s.key})`}
              activeDot={{ r: 4.5, strokeWidth: 2, stroke: "var(--tile)" }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* Recharts hands its tooltip untyped props; the shape is the payload rows. */
function ChartTooltip({ active, payload, label, series, colorOf }: any) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((sum: number, p: any) => sum + (p.value ?? 0), 0);

  return (
    <div className="rounded-[var(--r-field)] border border-line bg-tile-raised p-2.5 shadow-[var(--shadow-lg)]">
      <p className="mb-1.5 text-[0.75rem] font-semibold text-ink">
        {new Date(label).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </p>
      {payload.map((p: any) => {
        const s = series.find((x: Series) => x.key === p.dataKey);
        return (
          <p key={p.dataKey} className="flex items-center gap-2 text-[0.75rem]">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: s ? colorOf(s) : p.color }}
              aria-hidden
            />
            <span className="flex-1 text-ink-2">{p.name}</span>
            <span className="font-bold tabular-nums text-ink">{p.value}</span>
          </p>
        );
      })}
      <p className="mt-1.5 flex items-center gap-2 border-t border-line pt-1.5 text-[0.75rem]">
        <span className="flex-1 font-medium text-ink-2">Total</span>
        <span className="font-bold tabular-nums text-ink">{total}</span>
      </p>
    </div>
  );
}
