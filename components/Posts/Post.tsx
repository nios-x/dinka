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
import useLongPress from "@/app/hooks/useLongPress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";

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
  const { data: session }: any = useSession();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const longPressProps = useLongPress({
    onLongPress: () => {
      if (session?.user?.id === authorId) {
        setIsDeleteDialogOpen(true);
      }
    },
    delay: 500,
  });

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
    <>
      <div
        {...longPressProps}
        className="group mb-6 overflow-hidden w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all duration-300 select-none cursor-pointer relative"
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {/* Author Info */}
          <Link
            href={`/profile?id=${authorId}`}
            className="flex items-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <Image
                src={profileImg}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col px-3">
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {author.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-zinc-500 font-medium">
                  {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                </span>
                {visibilityIcon}
              </div>
            </div>
          </Link>

          {/* Post Options */}
          <div
            className="flex items-center gap-2 text-zinc-400"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider">{visibility}</span>
            {hidedel && (
              <DialogDemo btnClick={() => handleDelete?.(id)} />
            )}
            <EllipsisVertical className="w-4 h-4 opacity-40" />
          </div>
        </div>

        {/* Caption (Full post view style) */}
        {!redir && (
          <p className="mb-5 text-[16px] leading-relaxed text-zinc-800 dark:text-zinc-200 font-medium px-1">
            {title}
          </p>
        )}

        {/* Media */}
        {isMedia && mediaUrl && (
          <Link
            href={mediaUrl}
            className="block -mx-4 sm:-mx-6 bg-zinc-50 dark:bg-zinc-900 overflow-hidden relative group/media mb-4 border-y border-zinc-100 dark:border-zinc-800"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-square max-h-[600px]">
              <Image
                src={mediaUrl}
                alt="Post media"
                fill
                quality={90}
                className="object-cover lg:object-contain transition-opacity duration-300 group-hover:opacity-95"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </Link>
        )}

        {/* Caption (Feed style) */}
        {redir && (
          <Link
            href={`/postid/${id}`}
            className="block mb-6"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 px-2 line-clamp-3">
              <span className="font-extrabold text-zinc-900 dark:text-zinc-100 mr-2">{author.name}</span>
              {title}
            </p>
          </Link>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-2 px-1">
          <div className="flex items-center gap-6">
            {/* ❤️ Like */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLike(id, !isLiked);
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              className="flex items-center gap-2 transition-all group"
            >
              <Heart
                fill={isLiked ? "currentColor" : "none"}
                strokeWidth={2}
                className={`w-6 h-6 transition-transform duration-200 ${isLiked ? "text-rose-500 scale-110" : "text-zinc-600 dark:text-zinc-400 group-hover:text-rose-500"}`}
              />
              {likes > 0 && (
                <span className={`text-[13px] font-bold ${isLiked ? "text-rose-500" : "text-zinc-600 dark:text-zinc-400"}`}>
                  {likes}
                </span>
              )}
            </button>

            {/* 💬 Comment */}
            <Link
              href={`/postid/${id}`}
              className="flex items-center transition-all group"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <MessageCircle strokeWidth={2} className="w-6 h-6 text-zinc-600 dark:text-zinc-400 group-hover:text-blue-500 transition-colors" />
            </Link>

            {/* 🔗 Share */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                share(id);
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              className="flex items-center transition-all group"
            >
              <Share2 strokeWidth={2} className="w-6 h-6 text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-500 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post and all its comments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete?.(id)} className="bg-red-500 hover:bg-red-600 font-extrabold text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
