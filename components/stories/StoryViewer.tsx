"use client";

import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Eye, Trash2, Pause } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";
import { compact, shortAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { StoryGroup } from "./types";

/**
 * The story viewer.
 *
 * Full-screen, one group at a time, advancing on a timer with a progress bar
 * per story. Tap the right two-thirds to go forward, the left third to go back,
 * hold anywhere to pause — the gestures people already have muscle memory for.
 */

const IMAGE_MS = 5200;
const TEXT_MS = 4600;

export default function StoryViewer({
  groups,
  startIndex,
  onClose,
}: {
  groups: StoryGroup[];
  startIndex: number;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const me = (session?.user as { id?: string } | undefined)?.id;

  const [gi, setGi] = React.useState(startIndex);
  const [si, setSi] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [reply, setReply] = React.useState("");
  const [mounted, setMounted] = React.useState(false);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const group = groups[gi];
  const story = group?.stories[si];

  React.useEffect(() => setMounted(true), []);

  // The page behind must not scroll while the viewer owns the screen.
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const advance = React.useCallback(() => {
    setProgress(0);
    if (!group) return onClose();
    if (si < group.stories.length - 1) {
      setSi((s) => s + 1);
    } else if (gi < groups.length - 1) {
      setGi((g) => g + 1);
      setSi(0);
    } else {
      onClose();
    }
  }, [group, si, gi, groups.length, onClose]);

  const back = React.useCallback(() => {
    setProgress(0);
    if (si > 0) setSi((s) => s - 1);
    else if (gi > 0) {
      const prevGroup = groups[gi - 1];
      setGi((g) => g - 1);
      setSi(Math.max(0, prevGroup.stories.length - 1));
    }
  }, [si, gi, groups]);

  // Mark as seen once, when the story first appears.
  React.useEffect(() => {
    if (!story || story.seen) return;
    void fetch("/api/v1/stories/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storyId: story.id }),
    }).catch(() => {});
  }, [story]);

  // The progress timer. Video stories follow the file's own duration instead.
  React.useEffect(() => {
    if (!story || paused) return;
    if (story.kind === "Video") return;

    const total = story.kind === "Text" ? TEXT_MS : IMAGE_MS;
    const started = Date.now();
    const tick = setInterval(() => {
      const ratio = Math.min(1, (Date.now() - started) / total);
      setProgress(ratio);
      if (ratio >= 1) {
        clearInterval(tick);
        advance();
      }
    }, 40);

    return () => clearInterval(tick);
  }, [story, paused, advance]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") advance();
      if (e.key === "ArrowLeft") back();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [advance, back, onClose]);

  if (!mounted || !group || !story) return null;

  const isMine = me === group.user.id;

  const sendReply = async () => {
    const message = reply.trim();
    if (!message) return;
    setReply("");
    try {
      const res = await fetch("/api/v1/stories/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId: story.id, message }),
      });
      if (!res.ok) throw new Error();
      toast.success("Reply sent");
    } catch {
      toast.error("Could not send that reply");
    }
  };

  const remove = async () => {
    try {
      const res = await fetch("/api/v1/stories/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId: story.id }),
      });
      if (!res.ok) throw new Error();
      toast.success("Story deleted");
      onClose();
    } catch {
      toast.error("Could not delete that story");
    }
  };

  const background =
    story.kind === "Text"
      ? `linear-gradient(155deg, ${story.bgFrom ?? "#17130F"}, ${story.bgTo ?? "#4A3F35"})`
      : undefined;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center bg-[#08070a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          key={`${group.user.id}-${story.id}`}
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full w-full overflow-hidden bg-black sm:h-[min(92svh,860px)] sm:w-[min(94vw,480px)] sm:rounded-[var(--r-sheet)]"
          style={{ background }}
        >
          {/* Media */}
          {story.kind === "Video" && story.mediaUrl ? (
            <video
              ref={videoRef}
              src={story.mediaUrl}
              autoPlay
              playsInline
              onEnded={advance}
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (v.duration) setProgress(v.currentTime / v.duration);
              }}
              className="h-full w-full object-contain"
            />
          ) : story.mediaUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={story.mediaUrl} alt={story.caption ?? "Story"} className="h-full w-full object-contain" />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-10">
              <p
                className="text-balance text-center text-[1.7rem] font-semibold leading-snug text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {story.caption}
              </p>
            </div>
          )}

          {/* A scrim so the chrome stays legible over any image. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/65 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Progress bars — one segment per story in the group. */}
          <div className="absolute inset-x-0 top-0 flex gap-1 p-3">
            {group.stories.map((s, i) => (
              <div key={s.id} className="h-[2.5px] flex-1 overflow-hidden rounded-full bg-white/30">
                {/* Scaled, not resized: the bar updates ~25×/s and animating
                    width would relayout on every frame. */}
                <div
                  className="h-full origin-left rounded-full bg-white"
                  style={{
                    transform: `scaleX(${i < si ? 1 : i === si ? progress : 0})`,
                    transition: i === si ? "transform 60ms linear" : "none",
                  }}
                />
              </div>
            ))}
          </div>

          <header className="absolute inset-x-0 top-0 flex items-center gap-2.5 px-3 pt-7">
            <Avatar src={group.user.pic} name={group.user.name} userId={group.user.id} size="sm" />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[0.85rem] font-semibold text-white">
                {group.user.name ?? "Someone"}
              </p>
              <p className="text-[0.7rem] text-white/70">{shortAgo(story.createdAt)}</p>
            </div>

            {paused && <Pause size={16} className="text-white/80" />}

            {isMine && (
              <button
                type="button"
                onClick={remove}
                aria-label="Delete this story"
                className="press grid h-9 w-9 place-items-center rounded-full text-white/85 hover:bg-white/15"
              >
                <Trash2 size={18} />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close stories"
              className="press grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/15"
            >
              <X size={21} />
            </button>
          </header>

          {/* Tap zones sit under the chrome and above the media. */}
          <button
            type="button"
            aria-label="Previous story"
            className="absolute inset-y-16 left-0 w-1/3 cursor-default"
            onClick={back}
            onPointerDown={() => setPaused(true)}
            onPointerUp={() => setPaused(false)}
            onPointerCancel={() => setPaused(false)}
          />
          <button
            type="button"
            aria-label="Next story"
            className="absolute inset-y-16 right-0 w-2/3 cursor-default"
            onClick={advance}
            onPointerDown={() => setPaused(true)}
            onPointerUp={() => setPaused(false)}
            onPointerCancel={() => setPaused(false)}
          />

          <footer className="absolute inset-x-0 bottom-0 p-3">
            {story.caption && story.kind !== "Text" && (
              <p className="mb-3 px-1 text-[0.95rem] leading-snug text-white drop-shadow">
                {story.caption}
              </p>
            )}

            {isMine ? (
              <div className="flex items-center gap-1.5 px-1 text-white/85">
                <Eye size={16} />
                <span className="text-[0.82rem] font-medium tabular-nums">
                  {compact(story.viewCount ?? 0)} {story.viewCount === 1 ? "view" : "views"}
                </span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void sendReply();
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onFocus={() => setPaused(true)}
                  onBlur={() => setPaused(false)}
                  placeholder={`Reply to ${group.user.name?.split(" ")[0] ?? "them"}…`}
                  aria-label="Reply to this story"
                  className="h-11 flex-1 rounded-full border border-white/30 bg-white/10 px-4 text-[0.9rem] text-white outline-none backdrop-blur-md placeholder:text-white/60 focus:border-white/60"
                />
                <button
                  type="submit"
                  disabled={!reply.trim()}
                  aria-label="Send reply"
                  className={cn(
                    "press grid h-11 w-11 place-items-center rounded-full transition-colors",
                    reply.trim() ? "bg-white text-black" : "bg-white/15 text-white/50"
                  )}
                >
                  <Send size={18} />
                </button>
              </form>
            )}
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
