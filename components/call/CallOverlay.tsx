"use client";

import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Phone, Maximize2, Minimize2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/**
 * The in-call screen.
 *
 * Full-screen over everything else, with the three controls a call actually
 * needs within thumb reach: mute, camera, and hang up. Hang up is red, wider
 * than the others and set apart — it is the one control you reach for in a
 * hurry and must never be mistaken for the others.
 */

export type CallPeer = { id: string; name?: string | null; pic?: string | null } | null;

export function CallScreen({
  localStream,
  remoteStream,
  peer,
  micOn,
  camOn,
  onToggleMic,
  onToggleCam,
  onEnd,
}: {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  peer: CallPeer;
  micOn: boolean;
  camOn: boolean;
  onToggleMic: () => void;
  onToggleCam: () => void;
  onEnd: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const localRef = React.useRef<HTMLVideoElement>(null);
  const remoteRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (localRef.current && localStream) localRef.current.srcObject = localStream;
  }, [localStream]);

  React.useEffect(() => {
    if (remoteRef.current && remoteStream) remoteRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  // The timer starts when the other side's media actually arrives.
  React.useEffect(() => {
    if (!remoteStream) return;
    const started = Date.now();
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 1000);
    return () => clearInterval(t);
  }, [remoteStream]);

  // Hanging up with a keyboard should work too.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEnd();
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

  const mmss = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#08070a]"
      role="dialog"
      aria-modal="true"
      aria-label={`Call with ${peer?.name ?? "someone"}`}
    >
      {/* Remote video, or their avatar while we wait for it. */}
      <div className="relative flex-1 overflow-hidden">
        {remoteStream ? (
          <video
            ref={remoteRef}
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
              <p className="mt-1 text-[0.9rem] text-white/60">Ringing…</p>
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
            <p className="text-[0.75rem] tabular-nums text-white/65">
              {remoteStream ? mmss : "Connecting…"}
            </p>
          </div>
        </header>

        {/* Your own camera, draggable out of the way by tapping to resize. */}
        {localStream && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Shrink your camera" : "Enlarge your camera"}
            className={cn(
              "absolute overflow-hidden rounded-[var(--r-tile)] border-2 border-white/20 bg-black shadow-[var(--shadow-xl)] transition-all duration-300",
              expanded ? "bottom-4 right-4 h-56 w-40" : "bottom-4 right-4 h-36 w-26"
            )}
            style={{ width: expanded ? 160 : 104, height: expanded ? 224 : 144 }}
          >
            <video
              ref={localRef}
              autoPlay
              muted
              playsInline
              className={cn("h-full w-full object-cover", !camOn && "opacity-0")}
            />
            {!camOn && (
              <span className="absolute inset-0 grid place-items-center text-white/70">
                <VideoOff size={22} />
              </span>
            )}
            <span className="absolute left-1.5 top-1.5 text-white/70">
              {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </span>
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="safe-b flex items-center justify-center gap-4 bg-[#08070a] px-6 py-7">
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
