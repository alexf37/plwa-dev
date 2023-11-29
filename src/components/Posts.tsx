import { Likes } from "./Likes";
import { PlusIcon } from "./icons/PlusIcon";
import { Comments } from "./Comments";
import { router } from "../routes";
import { Card } from "./Card";
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { PencilSquare } from "./icons/PencilSquare";
import { MinusIcon } from "./icons/MinusIcon";
import { RefreshIcon } from "./icons/RefreshIcon";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../utils";
import { Post } from "../types";
import { LoadingSpinner } from "./LoadingSpinner";
import $ from "jquery";

function sortPostsByTime(posts: Post[]) {
  return posts.sort((a, b) => b.time.getTime() - a.time.getTime());
}

export function Posts() {
  const [minimised, setMinimised] = useState(false);
  const { data, isSuccess, isError, error, refetch } = useQuery({
    queryKey: ["fetchPosts"],
    queryFn: fetchPosts,
  });
  if (isError) console.log(error);

  useEffect(() => {
    $("#addpost").on("mouseover", () => {
      $("#addpost").css("background-color", "#e5e7eb");
    });
  }, []);

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-bold">Posts</h1>
        <div className="flex gap-4">
          <button
            type="button"
            aria-label="Refresh Posts"
            onClick={() => refetch()}
            className="new-post-button"
          >
            <RefreshIcon stroke="currentColor" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label={minimised ? "Expand Posts" : "Minimise Posts"}
            onClick={() => setMinimised(!minimised)}
            className="new-post-button"
          >
            {minimised ? (
              <PlusIcon stroke="currentColor" strokeWidth={0.5} />
            ) : (
              <MinusIcon stroke="currentColor" strokeWidth={2} />
            )}
          </button>
          <button
            type="button"
            aria-label="Add Post"
            id="addpost"
            onClick={() =>
              router.navigate({
                to: "/xrk4np/app/new-post",
                search: (prev) => prev,
              })
            }
            className="new-post-button hover:bg-slate-300"
          >
            <PencilSquare stroke="currentColor" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      {!minimised && (
        <div className="no-scrollbar divide-y divide-slate-200 overflow-y-auto">
          {isSuccess ? (
            sortPostsByTime(data).map((post) => (
              <div className="py-4" key={post.id}>
                <small className="text-xs text-slate-500">{`${
                  post.author
                } • ${formatDistanceToNowStrict(post.time)} ago`}</small>
                <p className="text-base text-slate-900">{post.text}</p>
                <div className="grid grid-cols-6 gap-4 pt-2">
                  <Likes
                    postId={post.id}
                    likes={post.like_count}
                    liked={post.user_liked}
                  />
                  <Comments postId={post.id} comments={post.comment_count} />
                </div>
              </div>
            ))
          ) : isError ? (
            <div className="py-4">
              <p className="text-base text-slate-900">Error loading posts</p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 py-4">
              <LoadingSpinner />
              <p className="text-base text-slate-900">Loading posts...</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
