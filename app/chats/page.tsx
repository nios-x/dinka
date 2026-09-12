"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import PageHeader from "@/components/shell/PageHeader";
import EmptyState from "@/components/ui/empty-state";
import { Avatar } from "@/components/ui/avatar";
import { useCounts } from "@/app/Providers/CountsProvider";
import { shortAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import { MessagesIcon } from "@/components/icons";

/**
 * The conversation list.
 *
 * One row per person, showing the last thing either of you said. Unread threads
 * are weighted heavier and carry a dot; read ones recede.
 */

type Chat = {
  id: number;
  fromId: string;
  toId: string;
  message: string | null;
  mediaUrl: string | null;
  type: string;
  isSeen: boolean | null;
  createdAt: string;
  from: { id: string; name: string | null; username: string | null; pic: string | null };
  to: { id: string; name: string | null; username: string | null; pic: string | null };
};

export default function Page() {
  const { data: session } = useSession();
  const me = (session?.user as { id?: string } | undefined)?.id;
  const [chats, setChats] = React.useState<Chat[] | null>(null);
  const [query, setQuery] = React.useState("");
  const counts = useCounts();

  React.useEffect(() => {
    fetch("/api/v1/contacts", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setChats(d?.data ?? []))
      .catch(() => setChats([]));
  }, []);

  const rows = (chats ?? [])
    .map((chat) => {
      const contact = chat.fromId === me ? chat.to : chat.from;
      const unread = chat.toId === me && !chat.isSeen;
      return { chat, contact, unread };
    })
    .filter(({ contact }) =>
      query.trim()
        ? (contact?.name ?? "").toLowerCase().includes(query.trim().toLowerCase())
        : true
    );

  return (
    <>
      <PageHeader
        title="Messages"
        subtitle={counts.messages > 0 ? `${counts.messages} unread` : undefined}
      >
        <div className="flex items-center gap-2 rounded-full border border-line bg-tile px-4">
          <Search size={16} className="shrink-0 text-ink-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your conversations"
            aria-label="Search conversations"
            className="h-10 flex-1 bg-transparent text-[0.875rem] text-ink outline-none"
          />
        </div>
      </PageHeader>

      {chats === null ? (
        <div className="divide-y divide-line">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4">
              <div className="skeleton h-14 w-14 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-3.5 w-1/3 rounded-full" />
                <div className="skeleton h-3 w-3/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          icon={<MessagesIcon size={26} />}
          title={query ? "No conversations match" : "No messages yet"}
          body={
            query
              ? "Try a different name."
              : "Open someone's profile and tap the message button to start talking."
          }
          action={query ? undefined : { label: "Find people", href: "/people/find" }}
        />
      ) : (
        <ul className="divide-y divide-line">
          {rows.map(({ chat, contact, unread }, i) => (
            <motion.li
              key={chat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.03, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/chat?id=${contact?.id}`}
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-tile-sunk"
              >
                <Avatar src={contact?.pic} name={contact?.name} userId={contact?.id} size="xl" />

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p
                      className={cn(
                        "truncate text-[0.95rem]",
                        unread ? "font-bold text-ink" : "font-semibold text-ink"
                      )}
                    >
                      {contact?.name ?? "Someone"}
                    </p>
                    <time
                      className={cn(
                        "meta shrink-0",
                        unread && "font-bold text-glaze dark:text-teal"
                      )}
                      dateTime={new Date(chat.createdAt).toISOString()}
                    >
                      {shortAgo(chat.createdAt)}
                    </time>
                  </div>

                  <p
                    className={cn(
                      "mt-0.5 truncate text-[0.85rem]",
                      unread ? "font-medium text-ink-2" : "text-ink-3"
                    )}
                  >
                    {chat.fromId === me && "You: "}
                    {chat.type === "Call"
                      ? "Voice call"
                      : chat.type === "VideoCall"
                        ? "Video call"
                        : chat.message || (chat.mediaUrl ? "Sent an attachment" : "No message")}
                  </p>
                </div>

                {unread && (
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-glaze dark:bg-teal" aria-label="Unread" />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </>
  );
}
