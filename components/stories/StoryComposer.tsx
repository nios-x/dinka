"use client";

import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X, ImagePlus, Type, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { STORY_GRADIENTS } from "./types";

/**
 * Story composer.
 *
 * Two kinds: a photo or video with an optional caption, or a text card on a
 * gradient. The preview is the real thing at story proportions, so what you
 * approve is what gets posted.
 */
export default function StoryComposer({
  onClose,
  onPosted,
}: {
  onClose: () => void;
  onPosted: () => void;
}) {
  const [mode, setMode] = React.useState<"media" | "text">("text");
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [caption, setCaption] = React.useState("");
  const [gradient, setGradient] = React.useState(0);
  const [posting, setPosting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Object URLs must be released or the blob stays in memory for the session.
  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 25 * 1024 * 1024) {
      toast.error("That file is over 25MB — pick a smaller one");
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setMode("media");
  };

  const post = async () => {
    if (mode === "text" && !caption.trim()) {
      toast.error("Write something first");
      return;
    }
    if (mode === "media" && !file) {
      toast.error("Pick a photo or video first");
      return;
    }

    setPosting(true);
    try {
      const body = new FormData();
      if (file) body.append("file", file);
      body.append(
        "data",
        JSON.stringify({
          kind: mode === "text" ? "Text" : file?.type.startsWith("video") ? "Video" : "Image",
          caption: caption.trim() || null,
          bgFrom: mode === "text" ? STORY_GRADIENTS[gradient].from : null,
          bgTo: mode === "text" ? STORY_GRADIENTS[gradient].to : null,
        })
      );

      const res = await fetch("/api/v1/stories/create", { method: "POST", body });
      if (!res.ok) throw new Error();
      toast.success("Story posted — it disappears in 24 hours");
      onPosted();
    } catch {
      toast.error("Could not post that story");
    } finally {
      setPosting(false);
    }
  };

  if (!mounted) return null;

  const g = STORY_GRADIENTS[gradient];
  const isVideo = file?.type.startsWith("video");

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <header className="flex items-center justify-between px-3 py-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cancel"
          className="press grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/15"
        >
          <X size={22} />
        </button>
        <p className="text-[0.95rem] font-semibold text-white">New story</p>
        <button
          type="button"
          onClick={post}
          disabled={posting}
          className="press flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-[0.875rem] font-semibold text-black disabled:opacity-60"
        >
          {posting && <Loader2 size={15} className="animate-spin" />}
          Share
        </button>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 pb-4">
        <div
          className="relative flex w-full max-w-[400px] items-center justify-center overflow-hidden rounded-[var(--r-sheet)]"
          style={{
            aspectRatio: "9 / 16",
            maxHeight: "72svh",
            background: mode === "text" ? `linear-gradient(155deg, ${g.from}, ${g.to})` : "#111",
          }}
        >
          {mode === "media" && preview ? (
            isVideo ? (
              <video src={preview} className="h-full w-full object-contain" autoPlay loop muted playsInline />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={preview} alt="Story preview" className="h-full w-full object-contain" />
            )
          ) : (
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Say something…"
              maxLength={240}
              aria-label="Story text"
              className={cn(
                "h-full w-full resize-none bg-transparent p-8 text-center text-[1.6rem] font-semibold leading-snug outline-none",
                g.label === "Bone" ? "text-[#17130F] placeholder:text-black/35" : "text-white placeholder:text-white/45"
              )}
              style={{ fontFamily: "var(--font-display)" }}
            />
          )}

          {mode === "media" && preview && (
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption…"
              maxLength={240}
              aria-label="Story caption"
              className="absolute inset-x-4 bottom-4 h-11 rounded-full border border-white/30 bg-black/40 px-4 text-[0.9rem] text-white outline-none backdrop-blur-md placeholder:text-white/60"
            />
          )}
        </div>
      </div>

      <footer className="px-4 pb-8">
        {mode === "text" && (
          <div className="mb-4 flex justify-center gap-2.5">
            {STORY_GRADIENTS.map((grad, i) => (
              <button
                key={grad.label}
                type="button"
                onClick={() => setGradient(i)}
                aria-label={`${grad.label} background`}
                aria-pressed={i === gradient}
                className={cn(
                  "press h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-stage transition-all",
                  i === gradient ? "ring-white" : "ring-transparent"
                )}
                style={{ background: `linear-gradient(155deg, ${grad.from}, ${grad.to})` }}
              />
            ))}
          </div>
        )}

        <div className="mx-auto flex max-w-xs items-center gap-2">
          <label
            className={cn(
              "press flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full text-[0.875rem] font-semibold transition-colors",
              mode === "media" ? "bg-white text-black" : "bg-white/15 text-white hover:bg-white/25"
            )}
          >
            <ImagePlus size={17} />
            Photo or video
            <input type="file" accept="image/*,video/*" onChange={pick} className="hidden" />
          </label>

          <button
            type="button"
            onClick={() => {
              setMode("text");
              setFile(null);
              if (preview) URL.revokeObjectURL(preview);
              setPreview(null);
            }}
            className={cn(
              "press flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-[0.875rem] font-semibold transition-colors",
              mode === "text" ? "bg-white text-black" : "bg-white/15 text-white hover:bg-white/25"
            )}
          >
            <Type size={17} />
            Text
          </button>
        </div>
      </footer>
    </motion.div>,
    document.body
  );
}
