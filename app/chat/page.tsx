"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function StickyInput() {
  const searchParams = useSearchParams();
  const toId = searchParams?.get("id");

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!toId) return;

    (async () => {
      try {
        const res = await fetch(`/api/v1/chats/getall?id=${toId}`);
        const body = await res.json();
        setChats(body.reverse());
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [toId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch("/api/v1/chats/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toId, message }),
      });

      if (res.ok) {
        const newChat = await res.json();
        // @ts-ignore
        setChats((prev) => [...prev, newChat.message]);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }

    setMessage("");
  };

  if (loading) return <p className="p-4 text-gray-500">Loading chats...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* CHAT LIST */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto flex flex-col p-3 pb-20"
      >
        {chats.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No messages yet</p>
        ) : (
          chats.map((chat: any) => (
            <div
              key={chat.id}
              className={`p-2 my-1 rounded-lg max-w-[70%] ${
                chat.fromId === toId
                  ? "bg-gray-200 self-start"
                  : "bg-blue-500 text-white self-end"
              }`}
            >
              {chat.message || <i>📎 {chat.mediaUrl}</i>}
            </div>
          ))
        )}
      </div>

      {/* FIXED INPUT BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-2 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
