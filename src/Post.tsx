import { useParams, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { type Post } from "./types";
import { Card } from "./components/Card";
import { formatDistanceToNowStrict } from "date-fns";
import { Likes } from "./components/Likes";
import { Comments } from "./components/Comments";
import { CloseIcon } from "./components/icons/CloseIcon";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  NewPostParams,
  deletePost,
  fetchPost,
  fetchPostComments,
  submitNewPost,
} from "./utils";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { RefreshIcon } from "./components/icons/RefreshIcon";
import { TrashIcon } from "./components/icons/TrashIcon";

export function Post() {
  const router = useRouter();
  const { postId } = useParams(router.routeTree.parentRoute);
  const [text, setText] = useState("");

  const {
    data: post,
    isSuccess: postIsSuccess,
    isError: postIsError,
    refetch: refetchPost,
  } = useQuery({
    queryKey: ["fetchPost", postId],
    queryFn: () => fetchPost(postId),
  });

  const {
    data: comments,
    isSuccess: commentsIsSuccess,
    isError: commentsIsError,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["fetchPostComments", postId],
    queryFn: () => fetchPostComments(postId),
  });

  const newPostMutation = useMutation({
    mutationFn: ({ text, postId }: NewPostParams) =>
      submitNewPost({ text, postId }),
    onSuccess: () => {
      setText("");
      refetchPost();
      refetchComments();
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      router.navigate({ to: "/xrk4np/app", search: (prev) => prev });
    },
    onError: (e: Error) => {
      console.log(e.message);
    },
  });

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-bold">Post</h1>
        <div className="flex gap-4">
          <button
            type="button"
            aria-label="Refresh Posts"
            onClick={() => {
              refetchPost();
              refetchComments();
            }}
            className="new-post-button"
          >
            <RefreshIcon stroke="currentColor" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Back to All Posts"
            onClick={() =>
              router.navigate({ to: "/xrk4np/app", search: (prev) => prev })
            }
            className="new-post-button"
          >
            <CloseIcon stroke="currentColor" strokeWidth={2} />
          </button>
        </div>
      </div>
      {postIsSuccess ? (
        <div className="border-b border-slate-200 py-4" key={post.id}>
          <div className="flex justify-between">
            <small className="text-xs text-slate-500">{`${
              post.author
            } • ${formatDistanceToNowStrict(post.time)} ago`}</small>
            {postIsSuccess && post.is_own && (
              <button
                type="button"
                aria-disabled={deletePostMutation.isPending}
                className=" aria-disabled:opacity-50"
                onClick={() => deletePostMutation.mutate({ postId })}
              >
                <TrashIcon className="h-4 w-4 text-slate-500 hover:text-red-600" />
              </button>
            )}
          </div>
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
      ) : postIsError ? (
        <p className="text-sm text-red-600">Error loading post</p>
      ) : (
        <div className="flex items-center justify-center gap-2 py-4">
          <LoadingSpinner />
          <p className="text-base text-slate-900">Loading post...</p>
        </div>
      )}

      <h2 className="pt-4 text-lg font-semibold">Comments</h2>
      <div className="no-scrollbar divide-y divide-slate-200 overflow-y-auto pl-6 ">
        {commentsIsSuccess ? (
          comments.map((post) => (
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
                  likes={post.like_count}
                  liked={post.user_liked}
                />
                <Comments postId={post.id} comments={post.comment_count} />
              </div>
            </div>
          ))
        ) : commentsIsError ? (
          <p className="text-sm text-red-600">Error loading comments</p>
        ) : (
          <div className="flex items-center justify-center gap-2 py-4">
            <svg
              className="h-5 w-5 animate-spin text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-base text-slate-900">Loading comments...</p>
          </div>
        )}
      </div>
      <div className="space-y-1 pt-2">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            newPostMutation.mutate({ text, postId });
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
                newPostMutation.mutate({ text, postId });
              }
            }}
            onChange={(e) => setText(e.target.value)}
            placeholder="Leave a comment"
            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            type="submit"
            aria-disabled={newPostMutation.isPending}
            className="col-span-3 h-10 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white drop-shadow aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          >
            Send
          </button>
        </form>
        {newPostMutation.isError && (
          <p className="text-sm text-red-600">
            {newPostMutation.error.message}
          </p>
        )}
      </div>
    </Card>
  );
}
