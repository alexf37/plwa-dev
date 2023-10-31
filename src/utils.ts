import z from "zod";
import { postSchema } from "./types";

async function throwErrorFromServer(response: Response, message?: string) {
  let errorData;
  try {
    errorData = await response.json();
  } catch (e) {
    throw new Error(message);
  }
  throw new Error(errorData.error);
}

export async function fetchPosts() {
  const res = await fetch("/xrk4np/api/posts.php");
  if (!res.ok) {
    await throwErrorFromServer(res, "Failed to fetch posts");
  }
  const data = await res.json();
  const parseResult = z.array(postSchema).safeParse(data);
  if (!parseResult.success) {
    throw new Error("Failed to parse posts response");
  }
  return parseResult.data;
}

export async function fetchOwnPosts() {
  const res = await fetch("/xrk4np/api/posts.php?onlyMine=1");
  if (!res.ok) {
    await throwErrorFromServer(res, "Failed to fetch posts");
  }
  const data = await res.json();
  const parseResult = z.array(postSchema).safeParse(data);
  if (!parseResult.success) {
    throw new Error("Failed to parse own posts response");
  }
  return parseResult.data;
}

export async function fetchPost(postId: string) {
  const res = await fetch(
    `/xrk4np/api/posts.php?postId=${encodeURIComponent(postId)}`,
  );
  if (!res.ok) {
    await throwErrorFromServer(res, "Failed to fetch post");
  }
  const data = await res.json();
  const parseResult = z.array(postSchema).nonempty().safeParse(data);
  if (!parseResult.success) {
    throw new Error("Failed to parse post response");
  }
  return parseResult.data[0];
}

export async function fetchPostComments(postId: string) {
  const res = await fetch(
    `/xrk4np/api/posts.php?parentId=${encodeURIComponent(postId)}`,
  );
  if (!res.ok) {
    await throwErrorFromServer(res, "Failed to fetch post");
  }
  const data = await res.json();
  const parseResult = z.array(postSchema).safeParse(data);
  if (!parseResult.success) {
    throw new Error("Failed to parse comments response");
  }
  return parseResult.data;
}

export type NewPostParams = {
  text: string;
  postId?: string;
};

export async function submitNewPost({ text, postId }: NewPostParams) {
  const res = await fetch(`/xrk4np/api/posts.php`, {
    body: JSON.stringify({
      text,
      time: new Date().toISOString(),
      parentId: postId,
    }),
    method: "POST",
    mode: "no-cors",
  });
  if (!res.ok) {
    await throwErrorFromServer(res, "Failed to submit post");
  }
}
