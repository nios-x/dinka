"use client";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../Loader/Loader";

export default function Posts({
  posts,
  handleLike,
  fetchPost,
}: {
  posts: any;
  handleLike: any;
  fetchPost: any;
}) {
  return (
    <div className=''>
      <InfiniteScroll
        next={fetchPost} // Pass query param to your fetch function if needed
        dataLength={posts.length}
        hasMore={true}
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You have seen it all</b>
          </p>
        }
        refreshFunction={() => {}}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={<></>}
        releaseToRefreshContent={<></>}>
        {posts?.map((e: any) => (
          <Post
            hidedel={false}
            handleLike={handleLike}
            redir={true}
            isLiked={e.isLiked}
            likes={e.likes}
            id={e.id}
            key={e.id}
            title={e.title}
            visibility={e.visiblity}
            author={{
              name: e.author.name ? e.author.name : "Unknown",
              image: e.author.pic,
            }}
            createdAt={e.createdAt}
            isMedia={e.isMedia}
            mediaUrl={e.mediaurl}
            authorId={e.authorId}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
