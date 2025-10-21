"use client";

import React, { useEffect, useState } from "react";
import {  Loader2 } from "lucide-react"; // spinner icon
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
    <div className="max-w-2xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-100 mb-4">Chats</h1>

      <div className="space-y-3">
        {peoples.map((chat: any) => {
          //@ts-ignore
          const contact =   session.data.user.id !== chat.toId
              ? chat.to
              : chat.from;

          return (
            <Link href={`/chat?id=${contact.id}`}>
          
            <div
              key={chat.id}
              className="flex items-center gap-4 p-3 mb-3 rounded-2xl   hover:bg-zinc-100 transition-all cursor-pointer  "
              >
              <img
                src={contact?.pic ||"https://imgs.search.brave.com/q-QoMPyZHgH3putURkfCdIQMa5Bg8luup8qs3GjbpQs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdXNlci1wcm9m/aWxlLWljb24tY2ly/Y2xlXzEyNTYwNDgt/MTI0OTkuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw"}
                alt={contact?.name || "User"}
                className="w-12 h-12  rounded-full object-cover border border-zinc-300"
                />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
                    {contact?.name || contact?.username || "Unknown"}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    {new Date(chat.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <p className="text-sm text-zinc-500 truncate max-w-xs dark:text-zinc-300">
                  {chat.message || (chat.mediaUrl ? "📎 Media" : "No message")}
                </p>
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
