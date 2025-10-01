"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams, useRouter } from "next/navigation";
import Post from "@/components/Posts/Post";
import { useSocket } from "@/app/hooks/videosocket";
import { toast } from "sonner";
export default function Page() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userposts, setUserPosts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const router = useSearchParams();
  const [hasMore, setHasMore] = useState(true);
  const linkrouter = useRouter();
  const id = router?.get("id");
  const { createCall } = useSocket();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/v1/getuserdetails", {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
      });
      const data = await res.json();
      if (!data.error) {
        setData(data);
        setLoading(false);
      }
    })();
  }, [id]);

  const fetchPost = async (isRefresh: boolean = false) => {
    try {
      let currentPage = isRefresh ? 0 : page;

      if (isRefresh) {
        setUserPosts([]);
        setPage(0);
        setLoading(true);
      }

      const response = await fetch(`/api/v1/getuserposts?page=${currentPage}`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        setTimeout(() => fetchPost(isRefresh), 2500); // retry on fail
        return;
      }

      if (data.posts && data.posts.length > 0) {
        setUserPosts((prev) => [...(isRefresh ? [] : prev), ...data.posts]);
        setPage(currentPage + 1);
      } else {
        // No more posts
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: number, whatToDo: boolean) => {
    try {
      const res = await fetch(`/api/v1/togglelike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, whatToDo }),
      });
      if (!res.ok) throw new Error("Like failed");
      setUserPosts((prev) =>
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
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (postid: number) => {
    console.log(postid);
    const res = await fetch("/api/v1/deletepost", {
      method: "POST",
      body: JSON.stringify({ postid: postid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await res.json();
    if (body.error) {
      toast.error(body.error);
      return;
    }
    if (body.message) {
      toast.success(body.message);
      setUserPosts((posts) => posts.filter((e) => e.id !== postid));
    }
  };
  useEffect(() => {
    fetchPost(true);
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center py-10 gap-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-48" />
        <div className="flex gap-4 mt-4">
          <Skeleton className="w-28 h-16 rounded-lg" />
          <Skeleton className="w-28 h-16 rounded-lg" />
        </div>
      </div>
    );
  }
  const { user, followersCount, followingCount } = data || {};
  return (
    <div className="w-full max-w-md mx-auto px-4 py-10">
      <div className="flex flex-col items-center">
        <div className="relative h-24 w-24 rounded-full overflow-hidden bg-zinc-200">
          {user?.image ? (
            <Image
              src={user.image}
              alt="User"
              fill
              style={{ objectFit: "cover" }}
            />
          ) : null}
        </div>

        <h1 className="mt-4 text-xl font-semibold text-zinc-800 text-center">
          {user?.name || "Unnamed User"}
        </h1>

        {id && (
          <div className="flex gap-3 m-2 ">
            <Link href={`/chat?id=${id}`}>Message</Link>
            <button
              onClick={() => {
                createCall(id);
              }}
              className="bg-zinc-400 rounded-full text-white text-xs py-1  px-2"
            >
              Voice Call
            </button>
            <button
              onClick={() => {
                createCall(id);
              }}
              className="bg-zinc-400 rounded-full text-white text-xs py-1  px-2"
            >
              Video Call
            </button>
          </div>
        )}

        <p className="mt-1 text-sm text-zinc-500 text-center">
          {user?.bio || "No bio available."}
        </p>

        <div className="flex justify-between w-full mt-6 gap-4">
          <div className="flex-1 bg-zinc-100 rounded-lg py-3 text-center">
            <Link href={"/people"}>
              <div className="text-lg font-medium text-zinc-800">
                {followersCount ?? 0}
              </div>
              <div className="text-xs text-zinc-500">Following</div>
            </Link>
          </div>
          <div className="flex-1 bg-zinc-100 rounded-lg py-3 text-center">
            <Link href={"/people"}>
              <div className="text-lg font-medium text-zinc-800">
                {followingCount ?? 0}
              </div>
              <div className="text-xs text-zinc-500"> Followers</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 sticky top-[77px] z-10 bg-zinc-100 my-2 rounded-b-xl font-bold text-zinc-600 text-xl">
        <div>Recent Posts</div>
      </div>
      <div className="">
        <div className="">
          <InfiniteScroll
            next={() => fetchPost(false)}
            dataLength={userposts.length}
            hasMore={hasMore} // depends on state
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>You have seen it all</b>
              </p>
            }
            refreshFunction={() => fetchPost(true)}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={<></>}
            releaseToRefreshContent={<></>}
          >
            {userposts.map((e: any) => (
              <Post
                handleDelete={handleDelete}
                handleLike={handleLike}
                redir={true}
                isLiked={e.isLiked}
                likes={e.likes}
                id={e.id}
                key={e.id}
                authorId={id ? id : ""}
                title={e.title}
                visibility={e.visibility} // fixed typo
                author={{ name: e.author.name, pic: e.author.pic }}
                createdAt={e.createdAt}
                isMedia={e.isMedia}
                mediaUrl={e.mediaurl}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
