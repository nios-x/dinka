"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSocket } from "../hooks/videosocket";
import { useSession } from "next-auth/react";
import { Send } from "lucide-react";

export default function StickyInput() {
  const searchParams = useSearchParams();
  const toId = searchParams?.get("id");
  const { data: session }: any = useSession();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { socketMessages, send_message, setSocketMessages } = useSocket();

  // 🔹 Fetch chat history
  useEffect(() => {
    if (!toId) return;
    (async () => {
      try {
        const res = await fetch(`/api/v1/chats/getall?id=${toId}`);
        const body = await res.json();
        setSocketMessages(body.reverse());
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [toId, setSocketMessages]);

  // 🔹 Auto-scroll to latest
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [socketMessages]);

  // 🔹 Send message
  const handleSend = async () => {
    if (!message.trim() || !toId) return;
    try {
      const res = await fetch("/api/v1/chats/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toId, message }),
      });

      send_message(toId, message, session?.user?.id);

      if (res.ok) {
        const newChat = await res.json();
        setSocketMessages((prev: any) => [...prev, newChat.message]);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setMessage("");
    }
  };

  if (loading)
    return (
      <p className="p-4 text-center text-gray-500 dark:text-gray-400">
        Loading chats...
      </p>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-100 to-white dark:from-[#0a0a0f] dark:to-[#1a1a24] transition-colors duration-300">
      {/* 💬 Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto flex flex-col px-4 pb-24 pt-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
      >
        {socketMessages.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No messages yet 👀 — start the conversation!
          </p>
        ) : (
          socketMessages.map((chat: any, i: number) => {
            const isMe = chat.fromId === session?.user?.id;
            return (
              <div
                key={chat.id || `socket-${i}`}
                className={`flex w-full ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative break-words  px-4 py-2 rounded-2xl text-sm sm:text-base max-w-[75%] shadow-md animate-fadeIn
                    ${
                      isMe
                        ? "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white rounded-tr-none"
                        : "bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 dark:text-gray-100 rounded-tl-none"
                    }`}
                >
                  {chat.message || <i>📎 {chat.mediaUrl}</i>}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 📝 Input bar */}
      <div className="fixed bottom-0 left-0 right-0 px-3 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 flex items-center gap-2 shadow-lg">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2.5 text-sm sm:text-base rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 outline-none bg-gray-50 dark:bg-gray-800 dark:text-gray-100 transition-all"
        />
        <button
          onClick={handleSend}
          className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
