import z from "zod";
import { postSchema } from "./types";

export async function fetchPosts() {
  const res = await fetch("/xrk4np/api/posts.php");
  if (!res.ok) {
    // could throw error response from server here if wanted
    throw new Error("Failed to fetch posts");
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
    // could throw error response from server here if wanted
    throw new Error("Failed to fetch posts");
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
    // could throw error response from server here if wanted
    throw new Error("Failed to fetch post");
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
    // could throw error response from server here if wanted
    throw new Error("Failed to fetch post");
  }
  const data = await res.json();
  const parseResult = z.array(postSchema).safeParse(data);
  if (!parseResult.success) {
    throw new Error("Failed to parse comments response");
  }
  return parseResult.data;
}
