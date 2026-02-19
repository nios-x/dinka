"use client";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../Loader/Loader";

export default function Posts({
  posts,
  handleLike,
  fetchPost,
  handleDelete
}: {
  posts: any;
  handleLike: any;
  fetchPost: any;
  handleDelete: any;
}) {
  return (
    <div className='w-full max-w-2xl mx-auto'>
      <InfiniteScroll
        next={fetchPost} // Pass query param to your fetch function if needed
        dataLength={posts.length}
        hasMore={true}
        loader={<Loader />}
        endMessage={
          <p className="text-center text-zinc-500 py-8 text-sm">
            <b>You have seen it all</b>
          </p>
        }
        refreshFunction={() => { }}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={<></>}
        releaseToRefreshContent={<></>}>

        <div className="flex flex-col gap-6 pb-20">
          {posts?.map((e: any, index: number) => (
            <div
              key={e.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Post
                hidedel={false}
                handleLike={handleLike}
                handleDelete={handleDelete}
                redir={true}
                isLiked={e.isLiked}
                likes={e.likes}
                id={e.id}
                title={e.title}
                visibility={e.visiblity}
                author={{
                  name: e.author.name ? e.author.name : "Unknown",
                  image: e.author.pic,
                  id: e.authorId
                }}
                createdAt={e.createdAt}
                isMedia={e.isMedia}
                mediaUrl={e.mediaurl}
                authorId={e.authorId}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
