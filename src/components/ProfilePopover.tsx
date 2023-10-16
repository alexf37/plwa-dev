import { Comments } from "./Comments";
import { Likes } from "./Likes";
import { router } from "../routes";
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import { type Post } from "../types";
import { Input } from "./Input";

type User = {
  username: string;
  image: string;
};

export function ProfilePopover() {
  const [user, setUser] = useState<User>();
  const [inEditMode, setInEditMode] = useState(false);
  const [tempUsername, setTempUsername] = useState("");
  const [error, setError] = useState({
    message: "",
    show: false,
  });
  useEffect(() => {
    fetch("/xrk4np/api/account.php")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((data) => {
        setUser(data.user);
        setTempUsername(data.user.username);
      });
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

  async function handleProfileEdit() {
    if (tempUsername == user?.username) {
      setInEditMode(false);
      return;
    }
    const res = await fetch("/xrk4np/api/account.php", {
      method: "PATCH",
      body: JSON.stringify({
        username: tempUsername,
      }),
    });
    if (!res.ok) {
      if (user) setTempUsername(user.username);
      setError({
        message: await res.json().then((data) => data.error),
        show: true,
      });
      return;
    }
    const data = await res.json();
    if (data.user) {
      setUser(data.user);
      setInEditMode(false);
      setError({
        message: "",
        show: false,
      });
    }
  }

  return (
    <>
      {inEditMode ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleProfileEdit();
          }}
          className="flex items-center justify-between gap-4 border-b border-slate-200 pb-6"
        >
          <div className="space-y-2">
            <Input
              placeholder="Username"
              className="rounded-md border border-input bg-background px-3 py-2 text-lg font-semibold shadow ring-offset-background"
              name="username"
              id="username"
              type="text"
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="off"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
            />
            {error.show && inEditMode && (
              <p className="text-sm text-red-500">{error.message}</p>
            )}
            <h2 className="text-sm text-slate-500">{posts.length} posts</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-blue-400 px-3 py-2 text-sm text-white drop-shadow"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setInEditMode(false)}
              className="rounded-lg bg-red-400 px-3 py-2 text-sm text-white drop-shadow"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <div className="flex gap-2">
            <div>
              <h1 className="text-xl font-bold">{user?.username}</h1>
              <h2 className="text-sm text-slate-500">{posts.length} posts</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setInEditMode(true)}
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
      )}
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
