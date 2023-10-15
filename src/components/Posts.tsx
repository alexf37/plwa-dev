import { Likes } from "./Likes";
import { PlusIcon } from "./icons/PlusIcon";
import { Comments } from "./Comments";
import { router } from "../routes";
import { Card } from "./Card";
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { type Post } from "../types";

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch("/xrk4np/api/posts.php?onlyMine=0")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-bold">Posts</h1>
        <button
          type="button"
          aria-label="Add Post"
          onClick={() => router.navigate({ to: "/xrk4np/app/new-post" })}
          className="new-post-button"
        >
          <PlusIcon stroke="currentColor" strokeWidth={0.5} />
        </button>
      </div>
      <div className="no-scrollbar divide-y divide-slate-200 overflow-y-auto">
        {posts.map((post) => (
          <div className="py-4" key={post.id}>
            <small className="text-xs text-slate-500">{`${
              post.author
            } • ${formatDistanceToNowStrict(new Date(post.time))} ago`}</small>
            <p className="text-base text-slate-900">{post.text}</p>
            <div className="grid grid-cols-6 gap-4 pt-2">
              <Likes
                likes={parseInt(post.like_count)}
                liked={!!parseInt(post.user_liked)}
              />
              <Comments comments={0} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
