"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

/**
 * Unread counts for the nav badges.
 *
 * One poll for both badges instead of a request per surface, paused while the
 * tab is hidden so a backgrounded PWA is not making requests all day.
 */

type Counts = { notifications: number; messages: number; requests: number };

type Ctx = Counts & {
  refresh: () => void;
  /** Clears a badge locally the moment its surface is opened. */
  clear: (key: keyof Counts) => void;
};

const CountsContext = createContext<Ctx>({
  notifications: 0,
  messages: 0,
  requests: 0,
  refresh: () => {},
  clear: () => {},
});

export const useCounts = () => useContext(CountsContext);

const POLL_MS = 45_000;

export function CountsProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [counts, setCounts] = useState<Counts>({ notifications: 0, messages: 0, requests: 0 });

  const refresh = useCallback(async () => {
    if (status !== "authenticated") return;
    try {
      // The same tick doubles as the presence heartbeat: it already runs only
      // while the tab is visible, and its interval is inside the online window.
      void fetch("/api/v1/presence", { method: "POST" }).catch(() => {});

      const res = await fetch("/api/v1/counts", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setCounts({
        notifications: Number(data.notifications ?? 0),
        messages: Number(data.messages ?? 0),
        requests: Number(data.requests ?? 0),
      });
    } catch {
      // Badges are ambient; a failed poll simply leaves the last known value.
    }
  }, [status]);

  useEffect(() => {
    if (status !== "authenticated") return;
    refresh();
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer) return;
      timer = setInterval(refresh, POLL_MS);
    };
    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else {
        refresh();
        start();
      }
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [status, refresh]);

  const clear = useCallback((key: keyof Counts) => {
    setCounts((c) => ({ ...c, [key]: 0 }));
  }, []);

  return (
    <CountsContext.Provider value={{ ...counts, refresh, clear }}>{children}</CountsContext.Provider>
  );
}
