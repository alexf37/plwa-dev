import { useParams, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { type Post } from "./types";
import { Card } from "./components/Card";
import { formatDistanceToNowStrict } from "date-fns";
import { Likes } from "./components/Likes";
import { Comments } from "./components/Comments";
import { CloseIcon } from "./components/icons/CloseIcon";

export function Post() {
  const router = useRouter();
  const { postId } = useParams(router.routeTree.parentRoute);
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Post[]>();
  const [text, setText] = useState("");
  const [error, setError] = useState({
    message: "",
    show: false,
  });

  function fetchPostAndComments() {
    fetch(`/xrk4np/api/posts.php?postId=${encodeURIComponent(postId)}`)
      .then((res) => res.json())
      .then((data: Post[]) => setPost(data[0]))
      .catch((e) => console.log(e));
    fetch(`/xrk4np/api/posts.php?parentId=${encodeURIComponent(postId)}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    fetchPostAndComments();
  }, [postId]);

  async function handleSubmitNewPost() {
    const res = await fetch(`/xrk4np/api/posts.php`, {
      body: JSON.stringify({
        text,
        time: new Date().toISOString(),
        parentId: postId,
      }),
      method: "POST",
      mode: "no-cors",
    });
    if (res.ok) {
      setText("");
      setError((prev) => ({ ...prev, show: false }));
      fetchPostAndComments();
    } else {
      setError({
        message: await res.json().then((data) => data.error),
        show: true,
      });
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-bold">Post</h1>
        <button
          type="button"
          aria-label="Back to All Posts"
          onClick={() => router.navigate({ to: "/xrk4np/app" })}
          className="new-post-button"
        >
          <CloseIcon stroke="currentColor" strokeWidth={2} />
        </button>
      </div>
      {!!post && (
        <div className="border-b border-slate-200 py-4" key={post.id}>
          <small className="text-xs text-slate-500">{`${
            post.author
          } • ${formatDistanceToNowStrict(new Date(post.time))} ago`}</small>
          <p className="text-base text-slate-900">{post.text}</p>
          <div className="grid grid-cols-6 gap-4 pt-2">
            <Likes
              postId={post.id}
              likes={parseInt(post.like_count)}
              liked={!!parseInt(post.user_liked)}
            />
            <Comments
              postId={post.id}
              comments={parseInt(post.comment_count)}
            />
          </div>
        </div>
      )}

      {!!comments && (
        <>
          <h2 className="pt-4 text-lg font-semibold">Comments</h2>
          <div className="no-scrollbar divide-y divide-slate-200 overflow-y-auto pl-6 ">
            {comments.map((post) => (
              <div className="py-4 first:pt-2 last:pb-2" key={post.id}>
                <small className="text-xs text-slate-500">{`${
                  post.author
                } • ${formatDistanceToNowStrict(
                  new Date(post.time),
                )} ago`}</small>
                <p className="text-base text-slate-900">{post.text}</p>
                <div className="grid grid-cols-6 gap-4 pt-2">
                  <Likes
                    postId={post.id}
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
          <div className="space-y-1 pt-2">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitNewPost();
              }}
            >
              <textarea
                name="post"
                id="newcomment"
                value={text}
                maxLength={280}
                minLength={1}
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitNewPost();
                  }
                }}
                onChange={(e) => setText(e.target.value)}
                placeholder="Leave a comment"
                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="submit"
                className=" col-span-3 h-10 rounded-xl bg-blue-400 px-3 py-2 text-sm font-semibold text-white drop-shadow"
              >
                Send
              </button>
            </form>
            {error.show && (
              <p className="text-sm text-red-500">{error.message}</p>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
