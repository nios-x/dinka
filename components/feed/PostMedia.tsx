"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoveGlyph } from "./ReactionGlyph";

/**
 * Post media.
 *
 * The frame is reserved from the stored dimensions before the file arrives, so
 * the feed never jumps while images load. Double-tap likes, as on every phone
 * social app; the burst is the confirmation.
 */
export default function PostMedia({
  url,
  type,
  width,
  height,
  alt,
  onDoubleLike,
  className,
  rounded = true,
}: {
  url: string;
  type?: string | null;
  width?: number | null;
  height?: number | null;
  alt?: string;
  onDoubleLike?: () => void;
  className?: string;
  rounded?: boolean;
}) {
  const [loaded, setLoaded] = React.useState(false);
  const [burst, setBurst] = React.useState(0);
  const [muted, setMuted] = React.useState(true);
  const lastTap = React.useRef(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const isVideo = (type ?? "").startsWith("video") || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);

  // Clamp the reserved box: very tall images get cropped rather than taking
  // over the whole screen, very wide ones keep a readable minimum height.
  const ratio = width && height ? width / height : 4 / 5;
  const safeRatio = Math.min(Math.max(ratio, 0.62), 1.91);

  const tap = () => {
    if (!onDoubleLike) return;
    const now = Date.now();
    if (now - lastTap.current < 320) {
      onDoubleLike();
      setBurst((n) => n + 1);
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  };

  return (
    <div
      onClick={tap}
      className={cn(
        "relative w-full overflow-hidden bg-tile-sunk",
        rounded && "rounded-[var(--r-tile)]",
        className
      )}
      style={{ aspectRatio: String(safeRatio) }}
    >
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden />}

      {isVideo ? (
        <>
          <video
            ref={videoRef}
            src={url}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setLoaded(true)}
            onClick={(e) => {
              e.stopPropagation();
              const v = videoRef.current;
              if (!v) return;
              if (v.paused) void v.play();
              else v.pause();
            }}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMuted((m) => !m);
            }}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          {videoRef.current?.paused !== false && (
            <span className="pointer-events-none absolute inset-0 grid place-items-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm">
                <Play size={24} fill="currentColor" />
              </span>
            </span>
          )}
        </>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={url}
          alt={alt || "Post image"}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          onContextMenu={(e) => e.preventDefault()}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      <AnimatePresence>
        {burst > 0 && (
          <motion.span
            key={burst}
            className="pointer-events-none absolute inset-0 grid place-items-center"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 1.25, 1], opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, times: [0, 0.35, 1], ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setBurst(0)}
          >
            <LoveGlyph size={96} className="drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
