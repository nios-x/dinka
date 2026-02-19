"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import type { PostType } from "@/lib/types";
import { useSession } from "next-auth/react";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
type PostContextType = {
  posts: PostType[];
  addPost: (post: PostType) => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  handleLike: (id: number, whatToDo: boolean) => void;
  fetchPost: () => void;
  handleDelete: (id: number) => void;
};
const PostContext = createContext<PostContextType | null>(null);

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePostContext must be used within PostProvider");
  return context;
};

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const { status } = useSession();

  const fetchPost = async () => {
    if (status !== "authenticated") {
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`/api/v1/get-posts?page=${page}`);
      const data = await response.json();
      if (!response.ok) {
        setTimeout(fetchPost, 2500);
        return
      }
      data.posts && setPosts([...posts, ...data.posts]);
      setPage(page + 1)
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchPost();
    }
  }, [status]);

  const addPost = (post: PostType) => {
    setPosts((prev) => [post, ...prev]);
  };
  const handleDelete = async (postid: number) => {
    const res = await fetch("/api/v1/deletepost", {
      method: "POST",
      body: JSON.stringify({ postid: postid }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const body = await res.json();
    if (body.error) {
      toast.error(body.error)
      return;
    }
    if (body.message) {
      toast.success(body.message)
      setPosts((posts) => posts.filter(e => e.id !== postid))

    }
  }


  const useDebouncedLike = (delay = 300) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleLike = async (id: number, whatToDo: boolean) => {
      // Clear previous timeout if any
      setPosts((prev) =>
        prev.map((e) =>
          e.id === id
            ? {
              ...e,
              isLiked: whatToDo,
              likes: Math.max(0, e.likes + (whatToDo ? 1 : -1)),
            }
            : e
        )
      );
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        try {


          const res = await fetch(`/api/v1/togglelike`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, whatToDo }),
          });

          if (!res.ok) throw new Error("Like failed");
        } catch (err) {
          // Revert state if API fails
          setPosts((prev) =>
            prev.map((e) =>
              e.id === id
                ? {
                  ...e,
                  isLiked: !whatToDo,
                  likes: Math.max(0, e.likes + (whatToDo ? -1 : 1)),
                }
                : e
            )
          );
        }
      }, delay);
    };

    return handleLike;
  };
  const handleLike = useDebouncedLike(800);
  return (
    <PostContext.Provider value={{ posts, addPost, isLoading, setIsLoading, handleLike, fetchPost, handleDelete }}>
      <Toaster />
      {children}
      <Footer addpost={addPost} setIsLoading={setIsLoading} />
    </PostContext.Provider>
  );
};
