"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "./ui/sonner";
export default function ChatPage({ id, addComment }: any) {
  const [message, setMessage] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const handlePost = async (e: any) => {
    e.preventDefault();
    scrollToBottom();
    const res = await fetch("/api/v1/comment", { method: "POST", body: JSON.stringify({ comment: message, postid: id }) })
    const data = await res.json()
    addComment(data.data)
    setMessage("");

  }
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };
  return (
    <div className="w-full mt-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl p-1.5 border border-zinc-100 dark:border-zinc-800/50 transition-all">
      <form
        className="w-full flex items-center gap-2"
        onSubmit={handlePost}
      >
        <Input
          type="text"
          placeholder="Add a comment..."
          value={message}
          onFocus={scrollToBottom}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-5 text-sm sm:text-base rounded-lg border-none focus-visible:ring-0 outline-none bg-transparent dark:text-zinc-100 transition-all"
        />
        <Button
          type="submit"
          disabled={!message.trim()}
          className="p-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:opacity-90 transition-all flex items-center justify-center h-9 w-9 flex-shrink-0"
        >
          <Send size={16} />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
