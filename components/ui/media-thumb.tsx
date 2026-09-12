"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { isVideo, still } from "@/lib/media";

/**
 * A post's media, shown small: a grid tile, a notification row, a ranked list.
 *
 * Every one of these used to be a bare `<img src={post.mediaurl}>`, which
 * renders as a broken image for a video post — and there is no way to tell from
 * the column alone, since images and video share one field. This resolves a
 * still frame instead, falls back to a muted `<video>` when no still can be
 * made, and asks for only as many pixels as the box needs.
 */
export default function MediaThumb({
  url,
  type,
  alt,
  width,
  className,
}: {
  url: string;
  /** The stored MIME type, when the caller has one. */
  type?: string | null;
  alt: string;
  /** Roughly the widest this is drawn, in device pixels. */
  width: number;
  className?: string;
}) {
  const [failed, setFailed] = React.useState(false);
  const video = isVideo(url, type);
  const poster = still(url, width);

  // A video with no still, or a still that would not load: the video element
  // paints its own first frame once the metadata arrives.
  if (video && (!poster || failed)) {
    return (
      <video
        src={url}
        muted
        playsInline
        preload="metadata"
        aria-label={alt}
        className={cn("bg-tile-sunk object-cover", className)}
      />
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={poster ?? url}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("bg-tile-sunk object-cover", className)}
    />
  );
}
