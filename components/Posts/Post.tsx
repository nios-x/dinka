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
  EllipsisVertical,
  MoreHorizontal,
} from "lucide-react";
import { DialogDemo } from "./Options";
import share from "@/components/Posts/sharecall";
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
import { cn } from "@/lib/utils";

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
    id?: string;
  };
  createdAt: string;
  falserounded?: boolean;
  handleDelete?: (postId: number) => void;
  handleLike: (id: number, like: boolean) => void;
  redir?: boolean;
  authorId: string;
  hidedel?: boolean;
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
}: PostProps) {
  const { data: session }: any = useSession();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  // Determine if the current user is the author
  const isAuthor = session?.user?.id === authorId;
  const canDelete = isAuthor || hidedel;

  const longPressProps = useLongPress({
    onLongPress: () => {
      if (isAuthor) {
        setIsDeleteDialogOpen(true);
      }
    },
    delay: 500,
  });

  const visibilityIcon =
    visibility === "Public" ? (
      <Globe className="w-3.5 h-3.5 text-zinc-400" />
    ) : (
      <Users className="w-3.5 h-3.5 text-zinc-400" />
    );

  const profileImg =
    author.image ||
    author.pic ||
    "https://imgs.search.brave.com/iiL6FIsWn1W2fHExlUdzmEXVolOVkj4jfy06SrdfTf8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/LnZlY3RvcnN0b2Nr/LmNvbS9pL3RodW1i/LWxhcmdlLzk3Lzcw/L3B1cnBsZS11c2Vy/LWljb24taW4tdGhl/LWNpcmNsZS1hLXNv/bGlkLWdyYWRpZW50/LXZlY3Rvci0yMzUx/OTc3MC5qcGc";

  return (
    <>
      <div
        {...longPressProps}
        className={cn(
          "group relative w-full mx-auto mb-4 bg-white/60 dark:bg-zinc-900/40",
          "backdrop-blur-xl border border-zinc-100 dark:border-zinc-800/50",
          "rounded-2xl overflow-hidden transition-all duration-300",
          "hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]",
          "hover:border-zinc-200 dark:hover:border-zinc-700/50"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 pb-3">
          <Link
            href={`/profile?id=${authorId}`}
            className="flex items-center gap-3 group/author"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-transparent group-hover/author:ring-zinc-200 dark:group-hover/author:ring-zinc-700 transition-all">
              <Image
                src={profileImg}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-[15px] text-zinc-900 dark:text-zinc-100 leading-tight group-hover/author:text-blue-600 dark:group-hover/author:text-blue-400 transition-colors">
                {author.name}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-zinc-500 font-medium">
                <span>
                  {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                {visibilityIcon}
              </div>
            </div>
          </Link>

          <div
            className="flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {canDelete && (
              <div className="transition-opacity">
                <DialogDemo btnClick={() => handleDelete?.(id)} />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-5 pb-3">
          {!redir ? (
            <p className="text-[16px] leading-[1.6] text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
              {title}
            </p>
          ) : (
            <Link
              href={`/postid/${id}`}
              onClick={(e) => e.stopPropagation()}
              className="block"
            >
              <p className="text-[15px] leading-[1.6] text-zinc-700 dark:text-zinc-300 line-clamp-3 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                {/* Removed Author name prefix here for cleaner look, as it's already in header */}
                {title}
              </p>
            </Link>
          )}
        </div>

        {/* Media */}
        {isMedia && mediaUrl && (
          <div
            className="w-full bg-zinc-50 dark:bg-zinc-950/50"
            onClick={(e) => e.stopPropagation()}
          >
            <Link href={mediaUrl} target="_blank" className="block relative group/media cursor-pointer">
              <div className="relative w-full max-h-[600px] overflow-hidden">
                {/* Improved aspect ratio handling or simpler container */}
                <Image
                  src={mediaUrl}
                  alt="Post media"
                  width={800} // providing width/height helps next/image or use fill with a sized container
                  height={800}
                  className="w-full h-auto object-contain max-h-[600px] bg-zinc-100 dark:bg-zinc-900"
                />
              </div>
            </Link>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 mt-1 border-t border-zinc-50 dark:border-white/5">
          <div className="flex items-center gap-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike(id, !isLiked);
              }}
              className="group/like flex items-center gap-2"
            >
              <div className={cn(
                "p-2 rounded-full transition-all duration-200",
                isLiked
                  ? "text-rose-500 bg-rose-50 dark:bg-rose-500/10"
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 group-hover/like:text-rose-500"
              )}>
                <Heart
                  className={cn("w-5 h-5 transition-transform", isLiked && "fill-current scale-110")}
                  strokeWidth={2}
                />
              </div>
              {likes > 0 && (
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  isLiked
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-zinc-500 dark:text-zinc-400 group-hover/like:text-rose-500"
                )}>
                  {likes}
                </span>
              )}
            </button>

            <Link
              href={`/postid/${id}`}
              onClick={(e) => e.stopPropagation()}
              className="group/comment flex items-center gap-2"
            >
              <div className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all group-hover/comment:text-blue-500">
                <MessageCircle className="w-5 h-5" strokeWidth={2} />
              </div>
            </Link>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                share(id);
              }}
              className="group/share flex items-center gap-2"
            >
              <div className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all group-hover/share:text-emerald-500">
                <Share2 className="w-5 h-5" strokeWidth={2} />
              </div>
            </button>
          </div>
        </div>

      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete?.(id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
