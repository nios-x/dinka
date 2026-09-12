"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Hash } from "lucide-react";
import PageHeader from "@/components/shell/PageHeader";
import Feed from "@/components/feed/Feed";
import EmptyState from "@/components/ui/empty-state";
import { compact } from "@/lib/format";
import { openComposer } from "@/components/composer/composer-bus";
import type { FeedPost } from "@/app/Providers/PostsProvider";
import { useLocalPostActions } from "@/components/feed/useLocalPostActions";

/** Every public post carrying one hashtag. */
export default function Page() {
  const params = useParams<{ name: string }>();
  const tag = decodeURIComponent(String(params?.name ?? "")).toLowerCase();

  const [meta, setMeta] = React.useState<{ useCount: number } | null>(null);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const { posts, setPosts, react, bookmark, vote, remove } = useLocalPostActions();
  const busy = React.useRef(false);

  const load = React.useCallback(
    async (p: number) => {
      if (busy.current || !tag) return;
      busy.current = true;
      try {
        const res = await fetch(`/api/v1/tag?tag=${encodeURIComponent(tag)}&page=${p}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          setHasMore(false);
          return;
        }
        const data = await res.json();
        setMeta(data.tag ?? null);
        setPosts((prev: FeedPost[]) => {
          if (p === 0) return data.posts;
          const seen = new Set(prev.map((x) => x.id));
          return [...prev, ...data.posts.filter((x: FeedPost) => !seen.has(x.id))];
        });
        setHasMore(!!data.hasMore);
        setPage(p + 1);
      } catch {
        setHasMore(false);
      } finally {
        busy.current = false;
        setLoading(false);
      }
    },
    [tag, setPosts]
  );

  React.useEffect(() => {
    setLoading(true);
    setPage(0);
    setHasMore(true);
    void load(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  return (
    <>
      <PageHeader
        back
        title={`#${tag}`}
        subtitle={meta ? `${compact(meta.useCount)} ${meta.useCount === 1 ? "post" : "posts"}` : undefined}
        actions={
          <button
            type="button"
            onClick={() => openComposer({ seed: `#${tag} ` })}
            className="press rounded-full bg-glaze px-3.5 py-1.5 text-[0.78rem] font-semibold text-glaze-on"
          >
            Post to tag
          </button>
        }
      />

      <div>
        <Feed
          posts={posts}
          isLoading={loading}
          hasMore={hasMore}
          onLoadMore={() => load(page)}
          onReact={react}
          onBookmark={bookmark}
          onDelete={remove}
          onVote={vote}
          empty={
            <EmptyState
              icon={<Hash size={26} />}
              title={`Nothing tagged #${tag} yet`}
              body="Be the first to use it — the tag page fills up as people post."
              action={{ label: `Post with #${tag}`, onClick: () => openComposer({ seed: `#${tag} ` }) }}
            />
          }
        />
      </div>
    </>
  );
}
