import { Likes } from "./Likes";
import { PlusIcon } from "./icons/PlusIcon";
import { Comments } from "./Comments";
import { router } from "../routes";
import { Card } from "./Card";
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { type Post } from "../types";
import { PencilSquare } from "./icons/PencilSquare";
import { MinusIcon } from "./icons/MinusIcon";

export function Posts() {
  const [minimised, setMinimised] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch("/xrk4np/api/posts.php")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-bold">Posts</h1>
        <div className="flex gap-4">
          <button
            type="button"
            aria-label="Add Post"
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
            onClick={() => router.navigate({ to: "/xrk4np/app/new-post" })}
            className="new-post-button"
          >
            <PencilSquare stroke="currentColor" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      {!minimised && (
        <div className="no-scrollbar divide-y divide-slate-200 overflow-y-auto">
          {posts.map((post) => (
            <div className="py-4" key={post.id}>
              <small className="text-xs text-slate-500">{`${
                post.author
              } • ${formatDistanceToNowStrict(
                new Date(post.time),
              )} ago`}</small>
              <p className="text-base text-slate-900">{post.text}</p>
              <div className="grid grid-cols-6 gap-4 pt-2">
                <Likes
                  likes={parseInt(post.like_count)}
                  liked={!!parseInt(post.user_liked)}
                />
                <Comments
                  postId={post.id}
                  comments={parseInt(post.comment_count)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
