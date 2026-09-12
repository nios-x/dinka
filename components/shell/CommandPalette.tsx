"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Hash, FileText, ArrowRight, Loader2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { compact, handleOf, shortAgo } from "@/lib/format";
import { onPalette, openComposer } from "@/components/composer/composer-bus";
import { useDialog } from "@/lib/use-dialog";
import {
  HomeIcon,
  ExploreIcon,
  ReelsIcon,
  BookmarkIcon,
  InsightsIcon,
  BellIcon,
  ComposeIcon,
} from "@/components/icons";

/**
 * Global search, opened with ⌘K / Ctrl-K or the search control in either
 * chrome. It searches people, posts and hashtags in one pass and doubles as a
 * jump-to-page list, so the fastest path to any surface is the same keystroke.
 */

type Results = {
  people: { id: string; name: string | null; username?: string | null; pic?: string | null }[];
  posts: { id: number; title: string; createdAt: string; author: { name: string | null } }[];
  tags: { tag: string; useCount: number }[];
};

const EMPTY: Results = { people: [], posts: [], tags: [] };

const PAGES = [
  { label: "Home", href: "/", Icon: HomeIcon },
  { label: "Explore", href: "/explore", Icon: ExploreIcon },
  { label: "Reels", href: "/reels", Icon: ReelsIcon },
  { label: "Notifications", href: "/notifications", Icon: BellIcon },
  { label: "Saved", href: "/saved", Icon: BookmarkIcon },
  { label: "Insights", href: "/insights", Icon: InsightsIcon },
];

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Results>(EMPTY);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const panelRef = React.useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);

  // cmdk only supplies Escape inside its own Dialog wrapper, which this is not.
  useDialog(open, close, panelRef);

  React.useEffect(() => onPalette((q) => {
    setQuery(q ?? "");
    setOpen(true);
  }), []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Debounced search; an empty box shows the page list instead of firing a request.
  React.useEffect(() => {
    const q = query.trim();
    if (!open || q.length < 2) {
      setResults(EMPTY);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/v1/search?q=${encodeURIComponent(q)}`);
        const data = res.ok ? await res.json() : EMPTY;
        setResults({
          people: data.people ?? [],
          posts: data.posts ?? [],
          tags: data.tags ?? [],
        });
      } catch {
        setResults(EMPTY);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => clearTimeout(timer);
  }, [query, open]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const hasResults =
    results.people.length > 0 || results.posts.length > 0 || results.tags.length > 0;
  const searching = query.trim().length >= 2;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <button
            aria-label="Close search"
            className="absolute inset-0 bg-[rgb(34_26_21_/_0.32)] backdrop-blur-[3px]"
            onClick={close}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search Dinka"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-[var(--r-sheet)] border border-line bg-tile-raised shadow-[var(--shadow-xl)]"
          >
            <Command shouldFilter={false} loop>
              <div className="flex items-center gap-3 border-b border-line px-4">
                {loading ? (
                  <Loader2 size={18} className="shrink-0 animate-spin text-glaze" />
                ) : (
                  <Search size={18} className="shrink-0 text-ink-3" strokeWidth={2} />
                )}
                <Command.Input
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search people, posts and tags…"
                  className="h-14 flex-1 bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-ink-3"
                />
                <kbd className="meta hidden rounded border border-line bg-tile-sunk px-1.5 py-0.5 sm:block">
                  esc
                </kbd>
              </div>

              <Command.List className="max-h-[min(58vh,26rem)] overflow-y-auto p-2">
                {searching && !loading && !hasResults && (
                  <div className="px-3 py-10 text-center">
                    <p className="text-[0.9rem] font-medium text-ink">No matches for “{query.trim()}”</p>
                    <p className="mt-1 text-[0.82rem] text-ink-3">
                      Try a name, a word from a post, or a #tag.
                    </p>
                  </div>
                )}

                {!searching && (
                  <Group heading="Jump to">
                    {PAGES.map((p) => (
                      <Row key={p.href} onSelect={() => go(p.href)}>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-tile-sunk text-ink-2">
                          <p.Icon size={17} />
                        </span>
                        <span className="flex-1 truncate text-[0.9rem] font-medium text-ink">{p.label}</span>
                        <ArrowRight size={15} className="shrink-0 text-ink-4" />
                      </Row>
                    ))}
                    <Row
                      onSelect={() => {
                        setOpen(false);
                        openComposer();
                      }}
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-glaze-soft text-glaze">
                        <ComposeIcon size={17} />
                      </span>
                      <span className="flex-1 truncate text-[0.9rem] font-medium text-ink">New post</span>
                    </Row>
                  </Group>
                )}

                {results.people.length > 0 && (
                  <Group heading="People">
                    {results.people.map((p) => (
                      <Row key={p.id} onSelect={() => go(`/profile?id=${p.id}`)}>
                        <Avatar src={p.pic} name={p.name} userId={p.id} size="sm" />
                        <span className="min-w-0 flex-1 leading-tight">
                          <span className="block truncate text-[0.9rem] font-medium text-ink">
                            {p.name ?? "Someone"}
                          </span>
                          <span className="meta block truncate">@{handleOf(p)}</span>
                        </span>
                      </Row>
                    ))}
                  </Group>
                )}

                {results.tags.length > 0 && (
                  <Group heading="Tags">
                    {results.tags.map((t) => (
                      <Row key={t.tag} onSelect={() => go(`/tag/${encodeURIComponent(t.tag)}`)}>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-saffron-soft text-saffron">
                          <Hash size={16} strokeWidth={2.2} />
                        </span>
                        <span className="flex-1 truncate text-[0.9rem] font-medium text-ink">#{t.tag}</span>
                        <span className="meta shrink-0">{compact(t.useCount)} posts</span>
                      </Row>
                    ))}
                  </Group>
                )}

                {results.posts.length > 0 && (
                  <Group heading="Posts">
                    {results.posts.map((p) => (
                      <Row key={p.id} onSelect={() => go(`/postid/${p.id}`)}>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-tile-sunk text-ink-2">
                          <FileText size={16} strokeWidth={2} />
                        </span>
                        <span className="min-w-0 flex-1 leading-tight">
                          <span className="block truncate text-[0.9rem] text-ink">{p.title}</span>
                          <span className="meta block truncate">
                            {p.author?.name ?? "Someone"} · {shortAgo(p.createdAt)}
                          </span>
                        </span>
                      </Row>
                    ))}
                  </Group>
                )}
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Group({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:meta [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:uppercase"
    >
      {children}
    </Command.Group>
  );
}

function Row({ onSelect, children }: { onSelect: () => void; children: React.ReactNode }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-[var(--r-field)] px-3 py-2.5 data-[selected=true]:bg-glaze-softer"
    >
      {children}
    </Command.Item>
  );
}
