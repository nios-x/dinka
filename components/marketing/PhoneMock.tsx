"use client";

import React from "react";
import { BadgeCheck, Search, TrendingUp } from "lucide-react";
import {
  HomeIcon,
  ExploreIcon,
  MessagesIcon,
  ComposeIcon,
  BellIcon,
  DinkaMark,
  CommentIcon,
  ShareIcon,
} from "@/components/icons";
import { LoveGlyph, FireGlyph } from "@/components/feed/ReactionGlyph";

/**
 * Phone frames for the landing page.
 *
 * These are built from the product's own tokens and icon set rather than
 * screenshots, so they stay correct in both themes and never go stale against
 * the app. The content inside is clearly synthetic sample data.
 */

type Variant = "feed" | "profile" | "insights" | "explore";

export default function PhoneMock({ variant }: { variant: Variant }) {
  return (
    <div
      className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.2rem] border-[7px] border-ink bg-ground shadow-[var(--shadow-xl)]"
      role="img"
      aria-label={`Dinka ${variant} screen — sample content`}
    >
      {/* Status strip */}
      <div className="flex items-center justify-between px-5 pt-2.5 text-[8px] font-semibold text-ink">
        <span>9:41</span>
        <span className="absolute left-1/2 top-1 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-3 rounded-[1px] border border-ink" />
        </span>
      </div>

      <div className="h-full overflow-hidden">
        {variant === "feed" && <FeedScreen />}
        {variant === "profile" && <ProfileScreen />}
        {variant === "insights" && <InsightsScreen />}
        {variant === "explore" && <ExploreScreen />}
      </div>

      <Dock active={variant === "explore" ? "explore" : variant === "feed" ? "home" : "profile"} />
    </div>
  );
}

function Dock({ active }: { active: "home" | "explore" | "profile" }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-center pb-2.5">
      <div className="flex items-center gap-0.5 rounded-full border border-line bg-tile/90 p-1 shadow-[var(--shadow-md)] backdrop-blur">
        <span
          className={`grid h-7 w-7 place-items-center rounded-full ${active === "home" ? "bg-glaze-soft text-glaze dark:text-teal" : "text-ink-4"}`}
        >
          <HomeIcon size={14} filled={active === "home"} />
        </span>
        <span
          className={`grid h-7 w-7 place-items-center rounded-full ${active === "explore" ? "bg-glaze-soft text-glaze dark:text-teal" : "text-ink-4"}`}
        >
          <ExploreIcon size={14} filled={active === "explore"} />
        </span>
        <span className="mx-0.5 grid h-8 w-8 place-items-center rounded-full bg-glaze text-glaze-on">
          <ComposeIcon size={15} />
        </span>
        <span className="grid h-7 w-7 place-items-center rounded-full text-ink-4">
          <MessagesIcon size={14} />
        </span>
        <span
          className={`h-6 w-6 rounded-full ${active === "profile" ? "ring-2 ring-glaze" : ""}`}
          style={{ background: "linear-gradient(145deg,#D9C7A8,#B89A70)" }}
        />
      </div>
    </div>
  );
}

function TopStrip() {
  return (
    <div className="flex items-center justify-between border-b border-line px-3 py-2">
      <span className="flex items-center gap-1 text-ink">
        <DinkaMark size={12} className="text-glaze dark:text-teal" />
        <span className="wordmark text-[15px] leading-none">dinka</span>
      </span>
      <span className="flex items-center gap-1.5 text-ink-3">
        <Search size={11} />
        <span className="relative">
          <BellIcon size={12} />
          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-ember" />
        </span>
      </span>
    </div>
  );
}

const RING = "conic-gradient(from 210deg, var(--glaze), var(--saffron), var(--ember), var(--glaze))";

function FeedScreen() {
  const swatches = [
    "linear-gradient(145deg,#D9C7A8,#B89A70)",
    "linear-gradient(145deg,#A8C4D9,#6E92B8)",
    "linear-gradient(145deg,#D9A8B8,#B8707F)",
    "linear-gradient(145deg,#B5D9A8,#79B870)",
    "linear-gradient(145deg,#C9A8D9,#9270B8)",
  ];

  return (
    <div className="flex h-full flex-col">
      <TopStrip />

      {/* Stories */}
      <div className="flex gap-2 overflow-hidden border-b border-line px-3 py-2.5">
        {swatches.map((bg, i) => (
          <div key={i} className="flex w-[34px] shrink-0 flex-col items-center gap-1">
            <span
              className="grid h-9 w-9 place-items-center rounded-full p-[1.5px]"
              style={{ background: i < 3 ? RING : "var(--line-strong)" }}
            >
              <span className="grid h-full w-full place-items-center rounded-full p-[1.5px]" style={{ background: "var(--ground)" }}>
                <span className="h-full w-full rounded-full" style={{ background: bg }} />
              </span>
            </span>
            <span className="h-1 w-5 rounded-full bg-line-strong" />
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-line px-3 py-1.5">
        <span className="rounded-full bg-tile-sunk px-2 py-0.5 text-[8px] font-bold text-ink">Following</span>
        <span className="px-2 py-0.5 text-[8px] font-semibold text-ink-4">Latest</span>
      </div>

      {/* Post */}
      <div className="flex-1 px-2.5 pt-2.5">
        <div className="tile overflow-hidden p-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-6 w-6 rounded-full" style={{ background: swatches[1] }} />
            <span className="flex-1">
              <span className="flex items-center gap-0.5">
                <span className="block text-[8.5px] font-bold text-ink">Nadia Rey</span>
                <BadgeCheck size={7} className="text-glaze dark:text-teal" />
              </span>
              <span className="block text-[6.5px] text-ink-3">@nadiarey · 2h</span>
            </span>
          </div>

          <p className="mt-1.5 text-[7.5px] leading-relaxed text-ink-2">
            Test roll from the darkroom this morning —{" "}
            <span className="font-semibold text-glaze dark:text-teal">#filmphotography</span>
          </p>

          <div
            className="mt-1.5 w-full rounded-lg"
            style={{
              aspectRatio: "4/3",
              background:
                "linear-gradient(155deg,#8FA89B 0%,#C4B49A 45%,#6F7F85 100%)",
            }}
          />

          <div className="mt-2 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="flex items-center gap-0.5">
                <LoveGlyph size={11} />
                <FireGlyph size={11} />
                <span className="ml-0.5 text-[7px] font-bold text-ink-2">1.2k</span>
              </span>
              <span className="flex items-center gap-0.5 text-ink-3">
                <CommentIcon size={9} />
                <span className="text-[7px] font-bold">86</span>
              </span>
            </span>
            <ShareIcon size={9} className="text-ink-3" />
          </div>
        </div>

        <div className="tile mt-2 p-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-6 w-6 rounded-full" style={{ background: swatches[3] }} />
            <span className="flex-1">
              <span className="block text-[8.5px] font-bold text-ink">Theo Mensah</span>
              <span className="block text-[6.5px] text-ink-3">@theom · 5h</span>
            </span>
          </div>
          <p className="mt-1.5 text-[7.5px] leading-relaxed text-ink-2">
            Which one for the cover?
          </p>
          <div className="mt-1.5 space-y-1">
            <span className="relative block overflow-hidden rounded-md border border-glaze px-1.5 py-1">
              <span className="absolute inset-y-0 left-0 w-[62%] bg-glaze-soft" />
              <span className="relative flex justify-between text-[7px] font-bold text-ink">
                <span>The blue one</span>
                <span>62%</span>
              </span>
            </span>
            <span className="relative block overflow-hidden rounded-md border border-line px-1.5 py-1">
              <span className="absolute inset-y-0 left-0 w-[38%] bg-tile-sunk" />
              <span className="relative flex justify-between text-[7px] font-medium text-ink-2">
                <span>The green one</span>
                <span>38%</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="flex h-full flex-col">
      <div
        className="h-16 w-full"
        style={{ background: "linear-gradient(140deg,#8FA89B,#C4B49A 60%,#A8917A)" }}
      />
      <div className="-mt-5 px-3">
        <span
          className="block h-12 w-12 rounded-full ring-[3px]"
          style={{
            background: "linear-gradient(145deg,#D9C7A8,#B89A70)",
            ["--tw-ring-color" as never]: "var(--ground)",
          }}
        />
        <div className="mt-1.5 flex items-center gap-0.5">
          <span className="text-[11px] font-extrabold text-ink">Luna Vega</span>
          <BadgeCheck size={9} className="text-glaze dark:text-teal" />
        </div>
        <p className="text-[7px] text-ink-3">@lunavega</p>
        <p className="mt-1 text-[7.5px] leading-relaxed text-ink-2">
          Ceramics, film photos and slow mornings. Studio in Lisbon.
        </p>

        <div className="mt-2 flex gap-3">
          {[
            ["167", "Posts"],
            ["12k", "Followers"],
            ["284", "Following"],
          ].map(([n, l]) => (
            <span key={l} className="leading-tight">
              <span className="block text-[10px] font-extrabold tabular-nums text-ink">{n}</span>
              <span className="block text-[6.5px] text-ink-3">{l}</span>
            </span>
          ))}
        </div>

        <div className="mt-2 flex gap-1.5">
          <span className="flex-1 rounded-full bg-glaze py-1 text-center text-[7.5px] font-bold text-glaze-on">
            Follow
          </span>
          <span className="flex-1 rounded-full border border-line py-1 text-center text-[7.5px] font-bold text-ink">
            Message
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-[3px]">
          {[
            "linear-gradient(145deg,#8FA89B,#5F7168)",
            "linear-gradient(145deg,#C4B49A,#93836A)",
            "linear-gradient(145deg,#A8917A,#77624E)",
            "linear-gradient(145deg,#9BA8C4,#6C7894)",
            "linear-gradient(145deg,#C4A89B,#946F62)",
            "linear-gradient(145deg,#B4C49A,#83936A)",
          ].map((bg, i) => (
            <span key={i} className="block aspect-square rounded-sm" style={{ background: bg }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function InsightsScreen() {
  const bars = [38, 52, 44, 68, 58, 82, 74];
  return (
    <div className="flex h-full flex-col px-3 pt-2">
      <p className="text-[11px] font-extrabold text-ink">Insights</p>
      <p className="text-[6.5px] text-ink-3">Last 30 days</p>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {[
          ["Followers", "48.2k", "+2.4%", true],
          ["Engagement", "6.4%", "+0.8%", true],
          ["Reach", "12.1k", "+4.1%", true],
          ["Impressions", "34.8k", "−1.2%", false],
        ].map(([label, value, delta, up]) => (
          <span key={label as string} className="stat block p-1.5">
            <span className="block text-[6.5px] text-ink-3">{label}</span>
            <span className="block text-[12px] font-extrabold tabular-nums leading-tight text-ink">
              {value}
            </span>
            <span
              className="block text-[6px] font-bold tabular-nums"
              style={{ color: up ? "var(--teal)" : "var(--ember)" }}
            >
              {delta}
            </span>
          </span>
        ))}
      </div>

      <div className="tile mt-2 p-2">
        <span className="block text-[6.5px] font-bold text-ink-3">Engagement</span>
        <span className="mt-1.5 flex h-12 items-end gap-[3px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: i === bars.length - 1 ? "var(--glaze)" : "var(--glaze-soft)",
              }}
            />
          ))}
        </span>
      </div>

      <div className="tile mt-2 p-2">
        <span className="block text-[6.5px] font-bold text-ink-3">Top post</span>
        <span className="mt-1.5 flex items-center gap-1.5">
          <span
            className="h-7 w-7 shrink-0 rounded-md"
            style={{ background: "linear-gradient(145deg,#8FA89B,#5F7168)" }}
          />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[7.5px] font-bold text-ink">Kiln day, finally</span>
            <span className="block text-[6px] text-ink-3">Image · 23 Jan</span>
          </span>
          <span className="text-[8px] font-extrabold tabular-nums text-ink">8.9%</span>
        </span>
      </div>
    </div>
  );
}

function ExploreScreen() {
  const tiles = [
    "linear-gradient(145deg,#8FA89B,#5F7168)",
    "linear-gradient(145deg,#C4B49A,#93836A)",
    "linear-gradient(145deg,#A8917A,#77624E)",
    "linear-gradient(145deg,#9BA8C4,#6C7894)",
    "linear-gradient(145deg,#C4A89B,#946F62)",
    "linear-gradient(145deg,#B4C49A,#83936A)",
    "linear-gradient(145deg,#9AC4BE,#6A9390)",
    "linear-gradient(145deg,#C49AB8,#936A86)",
    "linear-gradient(145deg,#AFA8C4,#7C7694)",
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 pt-2">
        <span className="flex items-center gap-1.5 rounded-full border border-line bg-tile px-2 py-1">
          <Search size={9} className="text-ink-3" />
          <span className="text-[7px] text-ink-3">Search people, posts and tags</span>
        </span>

        <span className="mt-2 flex items-center gap-1 overflow-hidden">
          <span className="flex shrink-0 items-center gap-0.5 rounded-full bg-saffron-soft px-1.5 py-0.5 text-[6.5px] font-bold text-saffron">
            <TrendingUp size={7} />
            Trending
          </span>
          {["#ceramics", "#filmphoto", "#lisbon"].map((t) => (
            <span
              key={t}
              className="shrink-0 rounded-full bg-tile-sunk px-1.5 py-0.5 text-[6.5px] font-semibold text-ink-2"
            >
              {t}
            </span>
          ))}
        </span>
      </div>

      <div className="mt-2 grid flex-1 grid-cols-3 gap-[3px] px-1.5">
        {tiles.map((bg, i) => (
          <span
            key={i}
            className={`block rounded-sm ${i === 1 ? "row-span-2 aspect-[1/2]" : "aspect-square"}`}
            style={{ background: bg }}
          />
        ))}
      </div>

    </div>
  );
}
