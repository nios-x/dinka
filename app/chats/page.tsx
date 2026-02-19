"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // spinner icon
import Link from "next/link";
import { useSession } from "next-auth/react"

export default function Page() {
  const [peoples, setPeoples] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();
  console.log(session)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/v1/contacts");
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch");
        setPeoples(data.data || []); // backend returns { data: [...] }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-zinc-600">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading chats...
      </div>
    );

  if (!peoples.length)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-zinc-500">
        <p className="text-lg font-medium">No chats yet 😅</p>
        <p className="text-sm text-zinc-400">Start a conversation to see it here.</p>
      </div>
    );

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-slate-100 to-white dark:from-[#0a0a0f] dark:to-[#1a1a24] transition-colors duration-300'>
      <div className="max-w-2xl mx-auto py-8 px-4 w-full">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">Chats</h1>

        <div className="flex flex-col space-y-4">
          {peoples.map((chat: any) => {
            //@ts-ignore
            const contact = session.data.user.id !== chat.toId
              ? chat.to
              : chat.from;

            return (
              <Link key={chat.id} href={`/chat?id=${contact?.id}`}>
                <div
                  className="group flex items-center gap-4 p-4 rounded-[2rem] bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-100 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800/80 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/20 transition-all cursor-pointer active:scale-[0.98]"
                >
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                    <img
                      src={contact?.pic || "https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder"}
                      alt={contact?.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h2 className="text-lg font-bold text-zinc-900 dark:text-white truncate">
                        {contact?.name || contact?.username || "Unknown"}
                      </h2>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800/50 px-2 py-1 rounded-full group-hover:text-blue-500 transition-colors">
                        {new Date(chat.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate font-medium">
                      {chat.message || (chat.mediaUrl ? "📎 Media" : "No message")}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
