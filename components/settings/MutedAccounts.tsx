"use client";

import React from "react";
import Link from "next/link";
import { Loader2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";

type Muted = {
  id: string;
  name: string | null;
  username: string | null;
  pic: string | null;
  image: string | null;
  mutedAt: string;
};

/**
 * The accounts you have muted, and the way back.
 *
 * A mute with no list to undo it from is a one-way door: the whole point of
 * muting rather than blocking is that it is a small, reversible adjustment to
 * your own feed, and that only holds if you can find it again. Muting is
 * invisible to the other person, which also means it is invisible to you
 * unless it is written down somewhere.
 */
export default function MutedAccounts() {
  const [muted, setMuted] = React.useState<Muted[] | null>(null);
  const [working, setWorking] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/v1/users/mute")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setMuted(Array.isArray(d?.mutes) ? d.mutes : []);
      })
      .catch(() => {
        if (!cancelled) setMuted([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const unmute = async (id: string, name: string | null) => {
    setWorking(id);
    try {
      const res = await fetch("/api/v1/users/mute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId: id, muted: false }),
      });
      if (!res.ok) throw new Error();
      setMuted((prev) => prev?.filter((m) => m.id !== id) ?? null);
      toast.success(`Unmuted ${name ?? "that account"}`);
    } catch {
      toast.error("Could not unmute that account");
    } finally {
      setWorking(null);
    }
  };

  if (muted === null) {
    return (
      <div className="flex items-center gap-2 px-3.5 py-3 text-ink-3">
        <Loader2 size={15} className="animate-spin" />
        <span className="text-[0.875rem]">Loading…</span>
      </div>
    );
  }

  if (muted.length === 0) {
    return (
      <p className="px-3.5 py-3 text-[0.875rem] leading-relaxed text-ink-3">
        You haven't muted anyone. Muting hides someone's posts from your feed without
        unfollowing them, and they are never told.
      </p>
    );
  }

  return (
    <ul className="space-y-1">
      {muted.map((m) => (
        <li key={m.id} className="flex items-center gap-3 rounded-[var(--r-field)] px-3.5 py-2.5">
          <Avatar src={m.pic ?? m.image} name={m.name} userId={m.id} size="md" />

          <Link href={`/profile?id=${m.id}`} className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[0.9rem] font-semibold text-ink hover:underline">
              {m.name ?? "Someone"}
            </span>
            {m.username && <span className="meta block truncate">@{m.username}</span>}
          </Link>

          <button
            type="button"
            onClick={() => unmute(m.id, m.name)}
            disabled={working === m.id}
            className="press inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line px-3.5 text-[0.82rem] font-semibold text-ink transition-colors hover:border-line-strong disabled:opacity-50"
          >
            {working === m.id ? <Loader2 size={14} className="animate-spin" /> : <VolumeX size={14} />}
            Unmute
          </button>
        </li>
      ))}
    </ul>
  );
}
