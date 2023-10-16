import { Comments } from "./Comments";
import { Likes } from "./Likes";
import { router } from "../routes";
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import { type Post } from "../types";

export function ProfilePopover() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    fetch("/xrk4np/api/account.php")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((data) => setUsername(data.user.username));
  }, []);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch("/xrk4np/api/posts.php?onlyMine=1")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((e) => console.log(e));
  }, []);

  function logout() {
    fetch("/xrk4np/api/auth/logout.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          router.navigate({ to: "/xrk4np/app/login" });
        }
      });
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex gap-2">
          <img
            src="https://avatars.githubusercontent.com/u/122472971?v=4"
            alt="Profile Picture"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">{username}</h1>
            <h2 className="text-sm text-slate-500">12 posts</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg bg-blue-400 px-3 py-2 text-sm text-white drop-shadow"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => logout()}
            className="rounded-lg bg-red-400 px-3 py-2 text-sm text-white drop-shadow"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="no-scrollbar max-h-72 divide-y divide-slate-200 overflow-y-auto">
        {posts.map((post) => (
          <div className="py-3 text-sm" key={post.id}>
            <small className="text-xs text-slate-500">{`${formatDistanceToNowStrict(
              new Date(post.time),
            )} ago`}</small>
            <p className="text-slate-900">{post.text}</p>
            <div className="grid grid-cols-6 gap-4 pt-2">
              <Likes
                likes={parseInt(post.like_count)}
                liked={!!parseInt(post.user_liked)}
              />
              <Comments
                comments={parseInt(post.comment_count)}
                postId={post.id}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
