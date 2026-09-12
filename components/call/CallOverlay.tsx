"use client";

import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Phone,
  Maximize2,
  Minimize2,
  Expand,
  Shrink,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/**
 * The in-call screen.
 *
 * Full-screen over everything else, with the three controls a call actually
 * needs within thumb reach: mute, camera, and hang up. Hang up is red, wider
 * than the others and set apart — it is the one control you reach for in a
 * hurry and must never be mistaken for the others.
 *
 * The header carries who you are talking to, how long you have been talking,
 * and the fullscreen toggle. Your own camera sits in a corner tile you can
 * drag to any other corner and tap to resize, so it never covers the face you
 * came here to look at.
 */

export type CallPeer = { id: string; name?: string | null; pic?: string | null } | null;

type Corner = "tl" | "tr" | "bl" | "br";

/** Top corners clear the header; bottom corners clear the control bar. */
const CORNER_POSITION: Record<Corner, string> = {
  tl: "left-3 top-[4.75rem]",
  tr: "right-3 top-[4.75rem]",
  bl: "left-3 bottom-3",
  br: "right-3 bottom-3",
};

/**
 * Document fullscreen, including the prefixed spelling older WebKit still
 * needs. iOS Safari cannot put an arbitrary element fullscreen — only a
 * <video> — so the caller hands us that as a fallback.
 */
function useFullscreen(
  shellRef: React.RefObject<HTMLElement | null>,
  fallbackVideoRef: React.RefObject<HTMLVideoElement | null>
) {
  const [isFull, setIsFull] = React.useState(false);
  const [supported, setSupported] = React.useState(false);

  React.useEffect(() => {
    const d = document as any;
    setSupported(
      Boolean(d.fullscreenEnabled || d.webkitFullscreenEnabled) ||
        "webkitEnterFullscreen" in document.createElement("video")
    );

    const sync = () => setIsFull(Boolean(d.fullscreenElement || d.webkitFullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    sync();
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  const toggle = React.useCallback(async () => {
    const d = document as any;
    const shell = shellRef.current as any;
    try {
      if (d.fullscreenElement || d.webkitFullscreenElement) {
        await (d.exitFullscreen?.() ?? d.webkitExitFullscreen?.());
        return;
      }
      if (shell?.requestFullscreen) {
        await shell.requestFullscreen();
      } else if (shell?.webkitRequestFullscreen) {
        await shell.webkitRequestFullscreen();
      } else {
        // iPhone: the video itself is the only thing allowed to go fullscreen.
        (fallbackVideoRef.current as any)?.webkitEnterFullscreen?.();
      }
    } catch {
      /* The browser refused — stay put rather than break the call. */
    }
  }, [shellRef, fallbackVideoRef]);

  return { isFull, supported, toggle };
}

export function CallScreen({
  localStream,
  remoteStream,
  peer,
  micOn,
  camOn,
  connected,
  onToggleMic,
  onToggleCam,
  onEnd,
}: {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  peer: CallPeer;
  micOn: boolean;
  camOn: boolean;
  /** True once the peer connection is up, even before any video arrives. */
  connected?: boolean;
  onToggleMic: () => void;
  onToggleCam: () => void;
  onEnd: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [corner, setCorner] = React.useState<Corner>("br");
  const [drag, setDrag] = React.useState<{ x: number; y: number } | null>(null);

  const shellRef = React.useRef<HTMLDivElement>(null);
  const remoteRef = React.useRef<HTMLVideoElement>(null);
  const dragRef = React.useRef<{ id: number; sx: number; sy: number; moved: boolean } | null>(null);

  const {
    isFull,
    supported: canFullscreen,
    toggle: toggleFullscreen,
  } = useFullscreen(shellRef, remoteRef);

  React.useEffect(() => setMounted(true), []);

  /**
   * The streams are attached through callback refs rather than effects: these
   * tiles mount and unmount as the call progresses, and this way the stream
   * lands on the element the moment it exists, in whatever order that happens.
   */
  const attachLocal = React.useCallback(
    (node: HTMLVideoElement | null) => {
      if (!node || !localStream) return;
      if (node.srcObject !== localStream) node.srcObject = localStream;
      node.play?.().catch(() => {});
    },
    [localStream]
  );

  const attachRemote = React.useCallback(
    (node: HTMLVideoElement | null) => {
      remoteRef.current = node;
      if (!node || !remoteStream) return;
      if (node.srcObject !== remoteStream) node.srcObject = remoteStream;
      node.play?.().catch(() => {});
    },
    [remoteStream]
  );

  // The timer starts when the call is actually up — which on a voice call is
  // before, or instead of, any video arriving.
  const live = Boolean(connected || remoteStream);
  React.useEffect(() => {
    if (!live) return;
    const started = Date.now();
    setElapsed(0);
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 1000);
    return () => clearInterval(t);
  }, [live]);

  // Escape leaves fullscreen first — the browser does that itself — and only
  // hangs up once we are back to the normal view.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) onEnd();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onEnd]);

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!mounted) return null;

  const mmss = (() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const h = Math.floor(elapsed / 3600);
    const m = Math.floor((elapsed % 3600) / 60);
    const s = elapsed % 60;
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  })();

  const tile = expanded ? { width: 168, height: 236 } : { width: 108, height: 150 };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    // A few pixels of slop so a tap is never read as a drag.
    if (!d.moved && Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
    d.moved = true;
    setDrag({ x: dx, y: dy });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }

    if (!d.moved) {
      setExpanded((v) => !v);
      setDrag(null);
      return;
    }

    // Snap to whichever corner the tile was left nearest.
    const r = e.currentTarget.getBoundingClientRect();
    const vertical = r.top + r.height / 2 < window.innerHeight / 2 ? "t" : "b";
    const horizontal = r.left + r.width / 2 < window.innerWidth / 2 ? "l" : "r";
    setCorner(`${vertical}${horizontal}` as Corner);
    setDrag(null);
  };

  return createPortal(
    <motion.div
      ref={shellRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex h-[100dvh] w-screen flex-col bg-[#08070a] [&:fullscreen]:h-full [&:fullscreen]:w-full"
      role="dialog"
      aria-modal="true"
      aria-label={`Call with ${peer?.name ?? "someone"}`}
    >
      {/* Remote video, or their avatar while we wait for it. */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {remoteStream ? (
          <video
            ref={attachRemote}
            autoPlay
            playsInline
            className="h-full w-full bg-black object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="animate-pulse">
              <Avatar src={peer?.pic} name={peer?.name} userId={peer?.id} size="3xl" />
            </span>
            <div>
              <p className="text-[1.3rem] font-semibold text-white">
                {peer?.name ?? "Connecting"}
              </p>
              <p className="mt-1 text-[0.9rem] text-white/60">{live ? "Connected" : "Ringing…"}</p>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />

        <header className="absolute inset-x-0 top-0 flex items-center gap-3 px-4 pt-5">
          <Avatar src={peer?.pic} name={peer?.name} userId={peer?.id} size="sm" />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[0.95rem] font-semibold text-white">
              {peer?.name ?? "In a call"}
            </p>
            <p
              className="text-[0.75rem] tabular-nums text-white/65"
              aria-live="polite"
              aria-label={live ? `Call duration ${mmss}` : "Connecting"}
            >
              {live ? mmss : "Connecting…"}
            </p>
          </div>

          {canFullscreen && (
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFull ? "Leave fullscreen" : "Go fullscreen"}
              aria-pressed={isFull}
              className="press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
            >
              {isFull ? <Shrink size={18} /> : <Expand size={18} />}
            </button>
          )}
        </header>

        {/* Your own camera: drag it to any corner, tap it to resize. A tap is
            resolved in onPointerUp, so there is no click handler to fire a
            second time behind it. */}
        {localStream && (
          <div
            role="button"
            tabIndex={0}
            aria-label={
              expanded
                ? "Your camera — tap to shrink, drag to move"
                : "Your camera — tap to enlarge, drag to move"
            }
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setExpanded((v) => !v);
              }
            }}
            style={{
              width: tile.width,
              height: tile.height,
              transform: drag ? `translate3d(${drag.x}px, ${drag.y}px, 0)` : undefined,
            }}
            className={cn(
              "absolute touch-none select-none overflow-hidden rounded-[var(--r-tile)] border-2 border-white/20 bg-black shadow-[var(--shadow-xl)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
              CORNER_POSITION[corner],
              drag ? "cursor-grabbing" : "cursor-grab transition-all duration-300"
            )}
          >
            {/* Mirrored, the way you expect to see yourself. */}
            <video
              ref={attachLocal}
              autoPlay
              muted
              playsInline
              className={cn("h-full w-full -scale-x-100 object-cover", !camOn && "opacity-0")}
            />

            {!camOn && (
              <span className="absolute inset-0 grid place-items-center text-white/70">
                <VideoOff size={20} />
              </span>
            )}

            {!micOn && (
              <span className="absolute bottom-1.5 right-1.5 grid h-6 w-6 place-items-center rounded-full bg-[#e0463c] text-white">
                <MicOff size={12} />
              </span>
            )}

            <span className="pointer-events-none absolute left-1.5 top-1.5 text-white/70">
              {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="safe-b flex shrink-0 items-center justify-center gap-4 bg-[#08070a] px-6 py-7">
        <ControlButton
          label={micOn ? "Mute your microphone" : "Unmute your microphone"}
          onClick={onToggleMic}
          active={!micOn}
        >
          {micOn ? <Mic size={22} /> : <MicOff size={22} />}
        </ControlButton>

        <button
          type="button"
          onClick={onEnd}
          aria-label="End call"
          className="press grid h-16 w-24 place-items-center rounded-full bg-[#e0463c] text-white shadow-[0_8px_28px_-6px_rgba(224,70,60,0.7)] transition-colors hover:bg-[#c9382f]"
        >
          <PhoneOff size={25} />
        </button>

        <ControlButton
          label={camOn ? "Turn your camera off" : "Turn your camera on"}
          onClick={onToggleCam}
          active={!camOn}
        >
          {camOn ? <Video size={22} /> : <VideoOff size={22} />}
        </ControlButton>
      </div>
    </motion.div>,
    document.body
  );
}

function ControlButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  /** "active" means the thing is switched off — the state worth showing. */
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "press grid h-14 w-14 place-items-center rounded-full transition-colors",
        active ? "bg-white text-[#08070a]" : "bg-white/12 text-white hover:bg-white/20"
      )}
    >
      {children}
    </button>
  );
}

/** The sheet that appears when somebody rings you. */
export function IncomingCall({
  peer,
  onAccept,
  onDecline,
}: {
  peer: CallPeer;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-4 backdrop-blur-sm sm:items-center"
      >
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
          className="w-full max-w-sm rounded-[var(--r-sheet)] border border-line bg-tile-raised p-6 text-center shadow-[var(--shadow-xl)]"
          role="dialog"
          aria-modal="true"
          aria-label="Incoming call"
        >
          <span className="mx-auto block w-fit animate-pulse">
            <Avatar src={peer?.pic} name={peer?.name} userId={peer?.id} size="3xl" />
          </span>

          <h2 className="mt-4 text-[1.25rem] font-bold text-ink">{peer?.name ?? "Someone"}</h2>
          <p className="meta mt-0.5">Incoming call</p>

          <div className="mt-7 flex items-center justify-center gap-5">
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={onDecline}
                aria-label="Decline call"
                className="press grid h-16 w-16 place-items-center rounded-full bg-[#e0463c] text-white shadow-[0_8px_24px_-8px_rgba(224,70,60,0.7)]"
              >
                <PhoneOff size={24} />
              </button>
              <span className="text-[0.78rem] font-medium text-ink-3">Decline</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={onAccept}
                aria-label="Accept call"
                className="press grid h-16 w-16 place-items-center rounded-full bg-[#12b39f] text-white shadow-[0_8px_24px_-8px_rgba(18,179,159,0.7)]"
              >
                <Phone size={24} />
              </button>
              <span className="text-[0.78rem] font-medium text-ink-3">Accept</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
