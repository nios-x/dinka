"use client";

import { DialogDemo } from "./Options";
import React from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Globe,
  Users,
} from "lucide-react";

import share from "@/components/Posts/sharecall";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
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
    pic?:string
  };
  createdAt: string;
  falserounded?: boolean;
  handleDelete?: (postid:number)=>void;
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
  hidedel=true,
  falserounded,
}: PostProps & {hidedel?:boolean, handleLike: any; redir?: boolean;authorId:string }) {
  const visibilityIcon = {
    Public: <Globe className="w-4 h-4 text-blue-500" />,
    Followers: <Users className="w-4 h-4 text-green-500" />,
  }[visibility];
  console.log(author)
  return (
    <div className=" mb-5   p-4 w-full max-w-xl mx-auto x transition-all duration-300 bg-[#ffffff]">
      <div className="flex items-start justify-between">
          <Link href={`/profile?id=${authorId}`}>
        <div className="w-max flex items-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
            <Toaster />
            <Image
              alt="author"
              src={
                author.image ||author.pic||
                "https://imgs.search.brave.com/iiL6FIsWn1W2fHExlUdzmEXVolOVkj4jfy06SrdfTf8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/LnZlY3RvcnN0b2Nr/LmNvbS9pL3RodW1i/LWxhcmdlLzk3Lzcw/L3B1cnBsZS11c2Vy/LWljb24taW4tdGhl/LWNpcmNsZS1hLXNv/bGlkLWdyYWRpZW50/LXZlY3Rvci0yMzUx/OTc3MC5qcGc"
              }
              fill
              style={{ objectFit: "cover",  }}
              />
          </div>
          <div className="flex-1 flex flex-col px-2 pb-2">
            <div className="font-semibold text-lg text-zinc-700 dark:text-zinc-200">
              {author.name}
            </div>
            <div className="text-xs text-zinc-500">
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
              </Link>

        <div className="flex items-center space-x-1 text-xs text-zinc-500 px-5 py-3">
          {visibilityIcon}
          <span>{visibility}</span>
          {hidedel && <DialogDemo btnClick={()=>{ handleDelete && handleDelete(id)}} />}
        </div>
      </div>

      {redir ? (
        <Link href={`/postid/${id}`}>
          <div className="text-[14.6px] px-2 text-zinc-800 whitespace-pre-wrap">
            {title}
          </div>
        </Link>
      ) : (
        <div className="text-[14.6px] px-2 text-zinc-800 whitespace-pre-wrap">
          {title}
        </div>
      )}

      {/* Media */}
      {isMedia && mediaUrl && (
        <Link href={mediaUrl}>
          <div className="w-full h-[400px] relative mt-5 overflow-hidden">
            <Image
              src={mediaUrl}
              alt="post media"
              fill
              quality={30}
              priority={false}
              className="object-contain w-full h-full rounded-md overflow-hidden"
            />
          </div>
        </Link>
      )}

      {/* Buttons */}
<div className="flex items-center justify-evenly w-1/2 gap-2 pt-3 px-1.5 text-zinc-600">
  {/* Like Button */}
  <button
    onClick={() => handleLike(id, !isLiked)}
    type="button"
    aria-label="Love"
    className={`flex items-center gap-1 transition-all duration-150 rounded-md px-3 py-2 ${
      isLiked ? "text-rose-500 bg-rose-100" : "text-zinc-600 hover:text-rose-400 hover:bg-zinc-100"
    }`}
  >
    <Heart
      fill={isLiked ? "currentColor" : "none"}
      className="w-5 h-5"
      strokeWidth={2.4}
    />
    <span className="text-sm">{likes ? likes : ""}</span>
  </button>

  {/* Comment Button */}
  <Link href={`/postid/${id}`} aria-label="Comment">
    <MessageCircle
      fill="none"
      className="w-5 h-5 hover:text-blue-500 transition-colors"
      strokeWidth={2.4}
    />
  </Link>

  {/* Share Button */}
  <button
    onClick={() => share(id)}
    type="button"
    aria-label="Share"
    className="hover:text-green-500 transition-colors"
  >
    <Share2 className="w-5 h-5" strokeWidth={2.4} />
  </button>
</div>

    </div>
  );
}
