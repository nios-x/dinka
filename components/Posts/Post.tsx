"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import {
  Heart,
  MessageCircle,
  Share2,
  Globe,
  Users,
  Calendar,
  EllipsisVertical,
} from "lucide-react";
import { DialogDemo } from "./Options";
import share from "@/components/Posts/sharecall";
import { Toaster } from "../ui/sonner";

type PostProps = {
  id: number;
  likes: number;
  title: string;
  isMedia?: boolean;
  mediaUrl?: string | null;
  visibility: "Public" | "Followers";
  isLiked: boolean;
  author: {
    name: string;
    image?: string;
    pic?: string;
  };
  createdAt: string;
  falserounded?: boolean;
  handleDelete?: (postId: number) => void;
};

export default function Post({
  id,
  title,
  isMedia,
  likes,
  mediaUrl,
  visibility = "Public",
  author,
  createdAt,
  handleLike,
  handleDelete,
  isLiked,
  redir,
  authorId,
  hidedel = true,
}: PostProps & {
  hidedel?: boolean;
  handleLike: (id: number, like: boolean) => void;
  redir?: boolean;
  authorId: string;
}) {
  const visibilityIcon =
    visibility === "Public" ? (
      <Globe className="w-4 h-4 text-blue-500" />
    ) : (
      <Users className="w-4 h-4 text-green-500" />
    );

  const profileImg =
    author.image ||
    author.pic ||
    "https://imgs.search.brave.com/iiL6FIsWn1W2fHExlUdzmEXVolOVkj4jfy06SrdfTf8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/LnZlY3RvcnN0b2Nr/LmNvbS9pL3RodW1i/LWxhcmdlLzk3Lzcw/L3B1cnBsZS11c2Vy/LWljb24taW4tdGhl/LWNpcmNsZS1hLXNv/bGlkLWdyYWRpZW50/LXZlY3Rvci0yMzUx/OTc3MC5qcGc";

  return (
    <div className="mb-6 w-full max-w-xl mx-auto p-4 bg-white dark:bg-black rounded-lg border border-zinc-100 dark:border-zinc-800 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between">
        {/* Author Info */}
        <Link href={`/profile?id=${authorId}`} className="flex items-center">
          <div className="bg-gradient-to-tr from-rose-500 via-purple-500 to-cyan-500 p-[1.8px] rounded-full">
            <div className="p-[2px] bg-white dark:bg-black rounded-full">
              <div className="relative w-9 h-9 rounded-full overflow-hidden">
                <Toaster />
                <Image
                  src={profileImg}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col px-3">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {author.name}
            </p>
            <p className="text-xs flex items-center gap-1 text-zinc-500">
              <Calendar size={10} />{" "}
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </p>
          </div>
        </Link>

        {/* Post Options */}
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-xs rounded-full px-4 py-2 text-zinc-600 dark:text-zinc-300">
          {visibilityIcon}
          <span>{visibility}</span>
          {hidedel && (
            <DialogDemo btnClick={() => handleDelete?.(id)} />
          )}
          <EllipsisVertical className="w-4 h-4 opacity-70" />
        </div>
      </div>

      {/* Media */}
      {isMedia && mediaUrl && (
        <Link href={mediaUrl}>
          <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] mt-4 bg-black overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
              <Image
                src={mediaUrl}
                alt="Post media"
                fill
                quality={80}
                priority={false}
                className="object-cover sm:object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </Link>
      )}

     {/* Action Buttons */}
<div className="flex items-center justify-between pt-4 px-2 text-zinc-600 dark:text-zinc-300">
  <div className="flex items-center gap-6">
    {/* ❤️ Like */}
    <button
      onClick={() => handleLike(id, !isLiked)}
      aria-label="Like"
      className="flex items-center gap-2 transition-all group"
    >
      <Heart
        fill={isLiked ? "currentColor" : "none"}
        strokeWidth={2.4}
        className={`w-6 h-6 transition-all ${
          isLiked
            ? "text-rose-500 scale-110"
            : "group-hover:text-rose-500 group-hover:scale-105"
        }`}
      />
      <span className="text-sm font-medium select-none">
        {likes > 0 ? likes : ""}
      </span>
    </button>

    {/* 💬 Comment */}
    <Link
      href={`/postid/${id}`}
      aria-label="Comment"
      className="flex items-center gap-2 transition-all group"
    >
      <MessageCircle
        strokeWidth={2.4}
        className="w-6 h-6 group-hover:text-blue-500 group-hover:scale-105 transition-all"
      />
    </Link>

    {/* 🔗 Share */}
    <button
      onClick={() => share(id)}
      aria-label="Share"
      className="flex items-center gap-2 transition-all group"
    >
      <Share2
        strokeWidth={2.4}
        className="w-6 h-6 group-hover:text-green-500 group-hover:scale-105 transition-all"
      />
    </button>
  </div>
</div>


      {/* Caption */}
      {redir ? (
        <Link href={`/postid/${id}`}>
          <p className="mt-2 text-[14.6px] px-2 text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
            {title}
          </p>
        </Link>
      ) : (
        <p className="mt-2 text-[14.6px] px-2 text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
          {title}
        </p>
      )}
    </div>
  );
}
