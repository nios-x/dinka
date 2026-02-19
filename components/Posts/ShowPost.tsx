"use client";
import React, { useState } from 'react';
import Post from './Post';
import Comment from "@/components/Comment"
import GoBack from '../GoBack';
import { toast } from 'sonner'
import { useSession } from "next-auth/react"

type PostProps = any

export default function ShowPost({
  id,
  title,
  isMedia,
  likes,
  mediaUrl,
  visibility = "Public",
  author,
  createdAt,
  isLiked,
  comments
}: PostProps) {
  const data1: any = useSession()
  const userid = data1.data?.user?.id;
  const [likeCount, setLikeCount] = useState(likes);
  const [isPostLiked, setIsPostLiked] = useState(isLiked);
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
      window.location.href = "/"
    }
  }

  const handleLike = async (postId: number) => {
    try {
      const res = await fetch(`/api/v1/togglelike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId, whatToDo: !isPostLiked }),
      });

      if (!res.ok) throw new Error("Like failed");
      //@ts-ignore
      setLikeCount(prev => isPostLiked ? prev - 1 : prev + 1);
      //@ts-ignore
      setIsPostLiked(prev => !prev);

      console.log("Toggled like for post", postId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-slate-100 to-white dark:from-[#0a0a0f] dark:to-[#1a1a24] transition-colors duration-300'>
      <div className='flex-1 w-full max-w-2xl mx-auto px-0 sm:px-4 pt-4 pb-16'>
        <div className='px-4 mb-4'>
          <GoBack />
        </div>

        <div className='space-y-8'>
          <section className="px-0 sm:px-0">
            <Post
              falserounded={true}
              hidedel={userid == author.id}
              id={id}
              likes={likeCount}
              isLiked={isPostLiked}
              title={title}
              author={author}
              authorId={author.id}
              createdAt={createdAt}
              isMedia={isMedia}
              mediaUrl={mediaUrl}
              visibility={visibility}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          </section>

          <section className='px-4'>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                Comments
                <span className="text-xs font-normal bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-500">
                  {comments?.length || 0}
                </span>
              </h2>
            </div>

            <div className='bg-white/40 dark:bg-zinc-900/20 backdrop-blur-md rounded-[2.5rem] p-2 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm'>
              <Comment id={id} comments={comments} postAuthorId={author.id} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
