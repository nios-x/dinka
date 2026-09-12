"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Send,
  Paperclip,
  X,
  Phone,
  Video,
  BadgeCheck,
  Loader2,
  Check,
  CheckCheck,
} from "lucide-react";
import { useSocket } from "../hooks/videosocket";
import useLongPress from "../hooks/useLongPress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar } from "@/components/ui/avatar";
import { useCounts } from "@/app/Providers/CountsProvider";
import { clock, dayLabel, handleOf } from "@/lib/format";
import { isOnline, presenceLabel } from "@/lib/presence";
import { cn } from "@/lib/utils";

/**
 * A conversation.
 *
 * Full-height with its own header and composer — the app dock is hidden here,
 * because a thread wants the whole screen. Messages group by day, and
 * consecutive messages from the same person lose their repeated avatar so the
 * thread reads as speech rather than a list of rows.
 */
export default function Page() {
  return (
    <Suspense fallback={<ThreadSkeleton />}>
      <Thread />
    </Suspense>
  );
}

function Thread() {
  const params = useSearchParams();
  const router = useRouter();
  const toId = params?.get("id") ?? null;
  const { data: session } = useSession();
  const me = (session?.user as { id?: string } | undefined)?.id;
  const counts = useCounts();

  const [partner, setPartner] = React.useState<any>(null);
  const [message, setMessage] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [sending, setSending] = React.useState(false);
  const [selected, setSelected] = React.useState<any>(null);

  const fileInput = React.useRef<HTMLInputElement>(null);
  const endRef = React.useRef<HTMLDivElement>(null);
  const { socketMessages, send_message, setSocketMessages, createCall } = useSocket();

  const messages = toId ? socketMessages[toId] || [] : [];

  React.useEffect(() => {
    if (!toId) return;
    setLoading(true);
    fetch(`/api/v1/chats/messages?id=${toId}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return;
        setPartner(d.partner);
        setSocketMessages((prev: any) => ({ ...prev, [toId]: d.messages ?? [] }));
        counts.refresh();
      })
      .catch(() => toast.error("Could not load this conversation"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toId, setSocketMessages]);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: messages.length > 30 ? "auto" : "smooth" });
  }, [messages.length]);

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const send = async () => {
    if ((!message.trim() && !file) || !toId || sending) return;
    setSending(true);
    const body = message;

    try {
      let res: Response;
      if (file) {
        const form = new FormData();
        form.append("toId", toId);
        form.append("message", body);
        form.append("file", file);
        res = await fetch("/api/v1/chats/create", { method: "POST", body: form });
      } else {
        res = await fetch("/api/v1/chats/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toId, message: body }),
        });
      }

      if (!res.ok) throw new Error();
      const created = await res.json();

      send_message(
        toId,
        JSON.stringify({ text: body, mediaUrl: created.message?.mediaUrl }),
        me ?? ""
      );
      setSocketMessages((prev: any) => ({
        ...prev,
        [toId]: [...(prev[toId] || []), created.message],
      }));

      setMessage("");
      setFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
    } catch {
      toast.error("Message not sent");
    } finally {
      setSending(false);
    }
  };

  const remove = async () => {
    if (!selected || !toId) return;
    const target = selected;
    setSelected(null);
    try {
      const res = await fetch("/api/v1/chats/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: target.id }),
      });
      if (!res.ok) throw new Error();
      setSocketMessages((prev: any) => ({
        ...prev,
        [toId]: (prev[toId] ?? []).filter((m: any) => m.id !== target.id),
      }));
      toast.success("Deleted for you");
    } catch {
      toast.error("Could not delete that message");
    }
  };

  if (!toId) {
    return (
      <div className="grid min-h-svh place-items-center p-6 text-center">
        <p className="text-[0.95rem] text-ink-3">
          Pick a conversation from{" "}
          <Link href="/chats" className="font-semibold text-glaze dark:text-teal">
            Messages
          </Link>
          .
        </p>
      </div>
    );
  }

  if (loading) return <ThreadSkeleton />;

  return (
    <div className="flex h-svh flex-col lg:h-[100svh]">
      {/* The thread scrolls underneath its own header rather than beside it.
          A frosted bar with nothing passing behind it has nothing to blur, so
          it reads as a plain translucent rectangle; sticking it inside the
          scroller is what turns it back into glass. */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <header className="frost sticky top-0 z-20 flex shrink-0 items-center gap-2.5 border-b border-line px-2 py-2.5">
          <button
            type="button"
            onClick={() => router.push("/chats")}
            aria-label="Back to messages"
            className="press grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-2 transition-colors hover:bg-tile-sunk"
          >
            <ArrowLeft size={20} />
          </button>

          <Link href={`/profile?id=${toId}`} className="flex min-w-0 flex-1 items-center gap-2.5">
            <Avatar
              src={partner?.pic ?? partner?.image}
              name={partner?.name}
              userId={toId}
              size="md"
              online={isOnline(partner?.lastSeenAt)}
            />
            <span className="min-w-0 leading-tight">
              <span className="flex items-center gap-1">
                <span className="truncate text-[0.95rem] font-semibold text-ink">
                  {partner?.name ?? "Someone"}
                </span>
                {partner?.isVerified && (
                  <BadgeCheck size={14} className="shrink-0 text-glaze dark:text-teal" />
                )}
              </span>
              <span className="meta block truncate">
                {partner?.lastSeenAt ? presenceLabel(partner.lastSeenAt) : `@${handleOf(partner)}`}
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => createCall(toId)}
            aria-label="Start a voice call"
            className="press grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-2 transition-colors hover:bg-tile-sunk"
          >
            <Phone size={18} />
          </button>
          <button
            type="button"
            onClick={() => createCall(toId)}
            aria-label="Start a video call"
            className="press grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-2 transition-colors hover:bg-tile-sunk"
          >
            <Video size={18} />
          </button>
        </header>

        <div className="flex flex-1 flex-col px-3 py-4">
          {messages.length === 0 ? (
            <div className="grid flex-1 place-items-center px-8 text-center">
              <div>
                <Avatar src={partner?.pic} name={partner?.name} userId={toId} size="3xl" />
                <p className="mt-4 text-[1.05rem] font-semibold text-ink">
                  {partner?.name ?? "Someone"}
                </p>
                <p className="mt-1 text-[0.875rem] text-ink-3">
                  This is the start of your conversation. Say hello.
                </p>
              </div>
            </div>
          ) : (
            <ul className="space-y-0.5">
              {messages.map((chat: any, i: number) => {
                const isMe = chat.fromId === me;
                const prev = messages[i - 1];
                const newDay =
                  !prev || new Date(prev.createdAt).toDateString() !== new Date(chat.createdAt).toDateString();
                // Group runs from the same sender within five minutes.
                const grouped =
                  !newDay &&
                  prev?.fromId === chat.fromId &&
                  new Date(chat.createdAt).getTime() - new Date(prev.createdAt).getTime() < 300_000;

                return (
                  <li key={chat.id ?? `live-${i}`}>
                    {newDay && (
                      <p className="meta py-4 text-center uppercase">{dayLabel(chat.createdAt)}</p>
                    )}
                    <Bubble
                      chat={chat}
                      isMe={isMe}
                      grouped={grouped}
                      onLongPress={() => isMe && setSelected(chat)}
                    />
                  </li>
                );
              })}
            </ul>
          )}
          <div ref={endRef} />
        </div>
      </div>

      <footer className="safe-b shrink-0 border-t border-line bg-tile px-3 py-2.5">
        {preview && (
          <div className="relative mb-2 inline-block">
            {file?.type.startsWith("video") ? (
              <video src={preview} className="h-20 rounded-[var(--r-chip)] object-cover" />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={preview} alt="Attachment preview" className="h-20 rounded-[var(--r-chip)] object-cover" />
            )}
            <button
              type="button"
              onClick={() => {
                setFile(null);
                URL.revokeObjectURL(preview);
                setPreview(null);
              }}
              aria-label="Remove attachment"
              className="press absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-ink text-ground"
            >
              <X size={13} />
            </button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
          className="flex items-end gap-2"
        >
          <input
            type="file"
            accept="image/*,video/*"
            hidden
            ref={fileInput}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              if (f.size > 25 * 1024 * 1024) {
                toast.error("That file is over 25MB");
                return;
              }
              if (preview) URL.revokeObjectURL(preview);
              setFile(f);
              setPreview(URL.createObjectURL(f));
            }}
          />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            aria-label="Attach a photo or video"
            className="press grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink-2 transition-colors hover:bg-tile-sunk"
          >
            <Paperclip size={19} />
          </button>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message…"
            aria-label="Your message"
            maxLength={2000}
            className="h-11 min-w-0 flex-1 rounded-full border border-line bg-tile-sunk px-4 text-[0.95rem] text-ink outline-none transition-colors focus:border-glaze"
          />

          <button
            type="submit"
            disabled={(!message.trim() && !file) || sending}
            aria-label="Send message"
            className={cn(
              "press grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors",
              message.trim() || file ? "bg-glaze text-glaze-on" : "bg-tile-sunk text-ink-4"
            )}
          >
            {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </form>
      </footer>

      <AlertDialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              It disappears from your side of the conversation. The other person keeps their copy.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction onClick={remove} className="bg-ember text-white hover:bg-ember/90">
              Delete for me
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Bubble({
  chat,
  isMe,
  grouped,
  onLongPress,
}: {
  chat: any;
  isMe: boolean;
  grouped: boolean;
  onLongPress: () => void;
}) {
  const longPress = useLongPress({ onLongPress, delay: 450 });
  const isVideo = chat.mediaUrl?.includes("/video/") || /\.(mp4|webm|mov)(\?|$)/i.test(chat.mediaUrl ?? "");

  if (chat.type === "Call" || chat.type === "VideoCall") {
    return (
      <p className="meta py-2 text-center">
        {isMe ? "You started" : "They started"} a {chat.type === "VideoCall" ? "video" : "voice"} call
        · {clock(chat.createdAt)}
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex w-full", isMe ? "justify-end" : "justify-start", grouped ? "mt-0.5" : "mt-2.5")}
      {...longPress}
    >
      <div
        className={cn(
          // A minimum width keeps the timestamp on the same footing as a
          // one-word message instead of squeezing the bubble to nothing.
          "group relative min-w-[5.5rem] max-w-[78%] select-none overflow-hidden px-4 py-2.5 text-[0.925rem] leading-relaxed sm:max-w-[68%]",
          isMe
            ? "rounded-[20px] bg-glaze text-glaze-on"
            : "rounded-[20px] border border-line bg-tile text-ink",
          // The tail corner marks who is speaking without drawing a tail.
          !grouped && (isMe ? "rounded-br-[7px]" : "rounded-bl-[7px]")
        )}
      >
        {chat.mediaUrl && (
          <div className="-mx-4 -mt-2.5 mb-2.5">
            {isVideo ? (
              <video src={chat.mediaUrl} controls playsInline className="max-h-72 w-full object-cover" />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={chat.mediaUrl} alt="Attachment" className="max-h-72 w-full object-cover" />
            )}
          </div>
        )}

        {chat.message && <p className="whitespace-pre-wrap break-words">{chat.message}</p>}

        <span
          className={cn(
            "mt-1 flex items-center justify-end gap-1 text-[0.68rem] tabular-nums",
            isMe ? "text-glaze-on/65" : "text-ink-4"
          )}
        >
          {clock(chat.createdAt)}
          {isMe && (chat.isSeen ? <CheckCheck size={12} /> : <Check size={12} />)}
        </span>
      </div>
    </motion.div>
  );
}

function ThreadSkeleton() {
  return (
    <div className="flex h-svh flex-col">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="skeleton h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <div className="skeleton h-3.5 w-32 rounded-full" />
          <div className="skeleton h-2.5 w-20 rounded-full" />
        </div>
      </div>
      <div className="flex-1 space-y-3 p-4">
        {[70, 45, 60, 38, 55].map((w, i) => (
          <div key={i} className={cn("flex", i % 2 ? "justify-end" : "justify-start")}>
            <div className="skeleton h-9 rounded-[18px]" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
