import { Comments } from "./Comments";
import { Likes } from "./Likes";
import { router } from "../routes";
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import { Input } from "./Input";
import { fetchOwnPosts } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "./LoadingSpinner";

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
  const {
    data: posts,
    isSuccess: postsIsSuccess,
    isError: postsIsError,
    error: postsError,
  } = useQuery({
    queryKey: ["fetchOwnPosts"],
    queryFn: fetchOwnPosts,
  });

  if (postsIsError) console.log(postsError);

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
      method: "POST",
      body: JSON.stringify({
        username: tempUsername,
      }),
      mode: "no-cors",
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
              minLength={4}
              maxLength={50}
              pattern="[a-zA-Z0-9]+"
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="off"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
            />
            {error.show && inEditMode && (
              <p className="text-sm text-red-500">{error.message}</p>
            )}
            <h2 className="text-sm text-slate-500">
              {postsIsSuccess && `${posts.length} posts`}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white drop-shadow"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setInEditMode(false)}
              className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white drop-shadow"
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
              <h2 className="text-sm text-slate-500">
                {postsIsSuccess && `${posts.length} posts`}
              </h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setInEditMode(true)}
              className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white drop-shadow"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white drop-shadow"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      <div className="no-scrollbar max-h-72 divide-y divide-slate-200 overflow-y-auto">
        {postsIsSuccess ? (
          posts.map((post) => (
            <div className="py-3 text-sm" key={post.id}>
              <small className="text-xs text-slate-500">{`${formatDistanceToNowStrict(
                new Date(post.time),
              )} ago`}</small>
              <p className="text-slate-900">{post.text}</p>
              <div className="grid grid-cols-6 gap-4 pt-2">
                <Likes
                  postId={post.id}
                  likes={post.like_count}
                  liked={post.user_liked}
                />
                <Comments comments={post.comment_count} postId={post.id} />
              </div>
            </div>
          ))
        ) : postsIsError ? (
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
    </>
  );
}
