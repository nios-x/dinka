"use client";

import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  X,
  ImagePlus,
  MapPin,
  Globe,
  Users,
  Loader2,
  Plus,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { extractTags } from "@/lib/richtext";
import { usePostContext } from "@/app/Providers/PostsProvider";
import { onComposer, type ComposerIntent } from "./composer-bus";
import { PollIcon } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * The composer.
 *
 * One sheet handles text, media, and polls. It is mounted once at the app root
 * and opened through the composer bus, so the dock, the rail, an empty state
 * and ⌘K all reach the same instance with its draft intact.
 */

const MAX = 2000;
const POLL_DAYS = [1, 3, 7] as const;

export default function Composer() {
  const { data: session } = useSession();
  const { addPost } = usePostContext();

  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [body, setBody] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [visibility, setVisibility] = React.useState<"Public" | "Followers">("Public");
  const [location, setLocation] = React.useState("");
  const [showLocation, setShowLocation] = React.useState(false);
  const [pollOn, setPollOn] = React.useState(false);
  const [options, setOptions] = React.useState(["", ""]);
  const [pollDays, setPollDays] = React.useState<number>(3);
  const [quote, setQuote] = React.useState<ComposerIntent["quoteOf"] | null>(null);
  const [posting, setPosting] = React.useState(false);

  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const me = session?.user as { id?: string; name?: string | null; image?: string | null } | undefined;

  React.useEffect(() => setMounted(true), []);

  React.useEffect(
    () =>
      onComposer((intent) => {
        setOpen(true);
        if (intent.seed) setBody((b) => (b ? b : intent.seed!));
        if (intent.quoteOf) setQuote(intent.quoteOf);
        if (intent.mode === "poll") setPollOn(true);
        // Give the sheet its entrance before stealing focus.
        setTimeout(() => textRef.current?.focus(), 260);
      }),
    []
  );

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Grow the textarea with its content instead of scrolling inside a fixed box.
  React.useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 340)}px`;
  }, [body, open]);

  const reset = () => {
    setBody("");
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setLocation("");
    setShowLocation(false);
    setPollOn(false);
    setOptions(["", ""]);
    setQuote(null);
    setVisibility("Public");
  };

  const close = () => {
    setOpen(false);
    // Keep the draft if there is one; clear a finished or untouched composer.
    if (!body.trim() && !file) reset();
  };

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
    setPollOn(false);
  };

  const validOptions = options.map((o) => o.trim()).filter(Boolean);
  const canPost =
    !posting &&
    (body.trim().length > 0 || !!file) &&
    (!pollOn || validOptions.length >= 2) &&
    body.length <= MAX;

  const submit = async () => {
    if (!canPost) return;
    setPosting(true);
    try {
      const form = new FormData();
      if (file) form.append("file", file);
      form.append(
        "data",
        JSON.stringify({
          title: body.trim(),
          visiblity: visibility,
          location: location.trim() || null,
          quoteOf: quote?.id ?? null,
          poll: pollOn
            ? {
                options: validOptions,
                endsAt: new Date(Date.now() + pollDays * 86_400_000).toISOString(),
              }
            : null,
        })
      );

      const res = await fetch("/api/v1/create-post", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "failed");

      addPost(data.data);
      toast.success(quote ? "Reposted" : "Posted");
      reset();
      setOpen(false);
    } catch {
      toast.error("Could not publish that post");
    } finally {
      setPosting(false);
    }
  };

  if (!mounted) return null;

  const tags = extractTags(body);
  const over = body.length > MAX;
  const isVideo = file?.type.startsWith("video");

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-start sm:pt-[8vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            aria-label="Close composer"
            onClick={close}
            className="absolute inset-0 bg-[rgb(23_19_15_/_0.4)] backdrop-blur-[3px]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Create a post"
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.6 }}
            transition={{ type: "spring", stiffness: 340, damping: 36 }}
            className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[var(--r-sheet)] border border-line bg-tile-raised shadow-[var(--shadow-xl)] sm:max-h-[84svh] sm:w-[min(94vw,588px)] sm:rounded-[var(--r-sheet)]"
          >
            <header className="flex items-center justify-between border-b border-line px-3 py-2.5">
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="press grid h-9 w-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-tile-sunk"
              >
                <X size={20} />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="press flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[0.8rem] font-semibold text-ink-2 transition-colors hover:border-line-strong"
                  >
                    {visibility === "Public" ? <Globe size={14} /> : <Users size={14} />}
                    {visibility === "Public" ? "Everyone" : "Followers"}
                    <ChevronDown size={14} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem onClick={() => setVisibility("Public")}>
                    <Globe size={15} />
                    Everyone
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setVisibility("Followers")}>
                    <Users size={15} />
                    Followers only
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                type="button"
                onClick={submit}
                disabled={!canPost}
                className={cn(
                  "press flex h-9 items-center gap-1.5 rounded-full px-4 text-[0.85rem] font-semibold transition-colors",
                  canPost
                    ? "bg-glaze text-glaze-on hover:bg-glaze-hover"
                    : "bg-tile-sunk text-ink-4"
                )}
              >
                {posting && <Loader2 size={14} className="animate-spin" />}
                {quote ? "Repost" : "Post"}
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              <div className="flex gap-3 p-4">
                <Avatar src={me?.image} name={me?.name} userId={me?.id} size="lg" />

                <div className="min-w-0 flex-1">
                  <textarea
                    ref={textRef}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    onKeyDown={(e) => {
                      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
                    }}
                    placeholder={quote ? "Add a comment…" : "What's happening?"}
                    aria-label="Post text"
                    rows={3}
                    className="w-full resize-none bg-transparent text-[1.05rem] leading-relaxed text-ink outline-none placeholder:text-ink-3"
                  />

                  {tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-glaze-softer px-2 py-0.5 text-[0.72rem] font-semibold text-glaze dark:text-teal"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {preview && (
                    <div className="relative mt-3 overflow-hidden rounded-[var(--r-tile)] border border-line">
                      {isVideo ? (
                        <video src={preview} controls playsInline className="max-h-[340px] w-full bg-black object-contain" />
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={preview} alt="Attachment preview" className="max-h-[340px] w-full object-cover" />
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          URL.revokeObjectURL(preview);
                          setPreview(null);
                        }}
                        aria-label="Remove attachment"
                        className="press absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/75"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  {quote && (
                    <div className="mt-3 rounded-[var(--r-tile)] border border-line p-3">
                      <p className="meta mb-1">Reposting {quote.authorName ?? "a post"}</p>
                      <p className="line-clamp-3 text-[0.875rem] text-ink-2">{quote.title}</p>
                      <button
                        type="button"
                        onClick={() => setQuote(null)}
                        className="mt-2 text-[0.78rem] font-medium text-ember"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {pollOn && (
                    <div className="mt-3 space-y-2 rounded-[var(--r-tile)] border border-line p-3">
                      {options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            value={opt}
                            onChange={(e) =>
                              setOptions((o) => o.map((v, j) => (j === i ? e.target.value : v)))
                            }
                            placeholder={`Option ${i + 1}`}
                            maxLength={60}
                            aria-label={`Poll option ${i + 1}`}
                            className="h-10 flex-1 rounded-[var(--r-field)] border border-line bg-tile px-3 text-[0.9rem] text-ink outline-none focus:border-glaze"
                          />
                          {options.length > 2 && (
                            <button
                              type="button"
                              onClick={() => setOptions((o) => o.filter((_, j) => j !== i))}
                              aria-label={`Remove option ${i + 1}`}
                              className="press grid h-9 w-9 place-items-center rounded-full text-ink-3 hover:bg-tile-sunk hover:text-ember"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      ))}

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        {options.length < 4 && (
                          <button
                            type="button"
                            onClick={() => setOptions((o) => [...o, ""])}
                            className="press flex items-center gap-1.5 rounded-full bg-tile-sunk px-3 py-1.5 text-[0.78rem] font-semibold text-ink-2"
                          >
                            <Plus size={13} strokeWidth={3} />
                            Add option
                          </button>
                        )}

                        <div className="flex items-center gap-1">
                          <span className="meta">Runs for</span>
                          {POLL_DAYS.map((d) => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setPollDays(d)}
                              aria-pressed={pollDays === d}
                              className={cn(
                                "press rounded-full px-2.5 py-1 text-[0.75rem] font-semibold transition-colors",
                                pollDays === d ? "bg-glaze text-glaze-on" : "bg-tile-sunk text-ink-2"
                              )}
                            >
                              {d}d
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setPollOn(false)}
                        className="text-[0.78rem] font-medium text-ember"
                      >
                        Remove poll
                      </button>
                    </div>
                  )}

                  {showLocation && (
                    <div className="mt-3 flex items-center gap-2 rounded-[var(--r-field)] border border-line px-3">
                      <MapPin size={15} className="shrink-0 text-ink-3" />
                      <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Add a place"
                        maxLength={60}
                        aria-label="Location"
                        className="h-10 flex-1 bg-transparent text-[0.9rem] text-ink outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <footer className="flex items-center justify-between gap-2 border-t border-line px-3 py-2.5">
              <div className="flex items-center gap-0.5">
                <label
                  className="press grid h-10 w-10 cursor-pointer place-items-center rounded-full text-glaze transition-colors hover:bg-glaze-softer dark:text-teal"
                  title="Add a photo or video"
                >
                  <ImagePlus size={20} />
                  <span className="sr-only">Add a photo or video</span>
                  <input type="file" accept="image/*,video/*" onChange={pick} className="hidden" />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setPollOn((v) => !v);
                    if (!pollOn) {
                      setFile(null);
                      if (preview) URL.revokeObjectURL(preview);
                      setPreview(null);
                    }
                  }}
                  aria-pressed={pollOn}
                  title="Add a poll"
                  className={cn(
                    "press grid h-10 w-10 place-items-center rounded-full transition-colors",
                    pollOn ? "bg-glaze-softer text-glaze dark:text-teal" : "text-glaze hover:bg-glaze-softer dark:text-teal"
                  )}
                >
                  <PollIcon size={20} />
                  <span className="sr-only">Add a poll</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowLocation((v) => !v)}
                  aria-pressed={showLocation}
                  title="Add a place"
                  className={cn(
                    "press grid h-10 w-10 place-items-center rounded-full transition-colors",
                    showLocation ? "bg-glaze-softer text-glaze dark:text-teal" : "text-glaze hover:bg-glaze-softer dark:text-teal"
                  )}
                >
                  <MapPin size={20} />
                  <span className="sr-only">Add a place</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-[0.75rem] font-semibold tabular-nums",
                    over ? "text-ember" : body.length > MAX * 0.9 ? "text-saffron" : "text-ink-3"
                  )}
                >
                  {MAX - body.length}
                </span>
                <kbd className="meta hidden rounded border border-line bg-tile-sunk px-1.5 py-0.5 sm:block">
                  ⌘↵
                </kbd>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
