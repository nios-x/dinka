"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { StoryGroup } from "./types";
import StoryViewer from "./StoryViewer";
import StoryComposer from "./StoryComposer";

/**
 * The story rail.
 *
 * Rings carry state, as in the references: a live gradient ring means unseen, a
 * flat gray ring means already watched, and your own slot carries an add
 * control. The rail is a real horizontal scroller with snap points rather than
 * a row that overflows.
 */
export default function StoryRail() {
  const { data: session } = useSession();
  const [groups, setGroups] = React.useState<StoryGroup[] | null>(null);
  const [openAt, setOpenAt] = React.useState<number | null>(null);
  const [composing, setComposing] = React.useState(false);

  const me = session?.user as { id?: string; name?: string | null; image?: string | null } | undefined;

  const load = React.useCallback(async () => {
    try {
      const res = await fetch("/api/v1/stories", { cache: "no-store" });
      if (!res.ok) {
        setGroups([]);
        return;
      }
      const data = await res.json();
      setGroups(data.groups ?? []);
    } catch {
      setGroups([]);
    }
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  const mine = groups?.find((g) => g.isMe);
  const others = groups?.filter((g) => !g.isMe) ?? [];
  // Unseen first: the rail should put what is new closest to the thumb.
  const ordered = [...others].sort((a, b) => Number(a.allSeen) - Number(b.allSeen));
  const openable = mine && mine.stories.length > 0 ? [mine, ...ordered] : ordered;

  if (groups === null) {
    return (
      <div className="rail flex gap-3.5 px-4 py-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex w-[72px] shrink-0 flex-col items-center gap-2">
            <div className="skeleton h-[68px] w-[68px] rounded-full" />
            <div className="skeleton h-2.5 w-12 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="rail flex gap-3.5 border-b border-line px-4 py-4">
        {/* Your slot: opens your story if you have one, otherwise the composer. */}
        <div className="flex w-[72px] shrink-0 scroll-ml-4 flex-col items-center gap-1.5" style={{ scrollSnapAlign: "start" }}>
          <button
            type="button"
            onClick={() => {
              if (mine && mine.stories.length > 0) setOpenAt(0);
              else setComposing(true);
            }}
            className="press relative"
            aria-label={mine?.stories.length ? "View your story" : "Add to your story"}
          >
            <Avatar
              src={me?.image}
              name={me?.name}
              userId={me?.id}
              size="xl"
              ring={mine && mine.stories.length > 0 ? (mine.allSeen ? "seen" : "unseen") : "self"}
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 grid h-[22px] w-[22px] place-items-center rounded-full bg-glaze text-glaze-on ring-[3px]"
              style={{ ["--tw-ring-color" as never]: "var(--ground)" }}
              onClick={(e) => {
                e.stopPropagation();
                setComposing(true);
              }}
            >
              <Plus size={14} strokeWidth={3} />
            </span>
          </button>
          <span className="w-full truncate text-center text-[0.7rem] font-medium text-ink-2">
            Your story
          </span>
        </div>

        {ordered.map((group) => {
          const index = openable.findIndex((g) => g.user.id === group.user.id);
          return (
            <div
              key={group.user.id}
              className="flex w-[72px] shrink-0 scroll-ml-4 flex-col items-center gap-1.5"
              style={{ scrollSnapAlign: "start" }}
            >
              <button
                type="button"
                onClick={() => setOpenAt(index)}
                className="press"
                aria-label={`View ${group.user.name ?? "their"} story`}
              >
                <Avatar
                  src={group.user.pic}
                  name={group.user.name}
                  userId={group.user.id}
                  size="xl"
                  ring={group.allSeen ? "seen" : "unseen"}
                />
              </button>
              <span
                className={cn(
                  "w-full truncate text-center text-[0.7rem]",
                  group.allSeen ? "font-normal text-ink-3" : "font-semibold text-ink"
                )}
              >
                {group.user.name?.split(" ")[0] ?? "Someone"}
              </span>
            </div>
          );
        })}

        {ordered.length === 0 && (
          <div className="flex items-center px-1">
            <p className="max-w-[20ch] text-[0.8rem] leading-snug text-ink-3">
              Stories from people you follow show up here.
            </p>
          </div>
        )}
      </div>

      {openAt !== null && openable.length > 0 && (
        <StoryViewer
          groups={openable}
          startIndex={openAt}
          onClose={() => {
            setOpenAt(null);
            void load();
          }}
        />
      )}

      {composing && (
        <StoryComposer
          onClose={() => setComposing(false)}
          onPosted={() => {
            setComposing(false);
            void load();
          }}
        />
      )}
    </>
  );
}
