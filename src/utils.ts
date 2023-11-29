import z from "zod";
import { postSchema } from "./types";
import $ from "jquery";

function xhrFetch(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ ok: boolean; json: () => Promise<any> }> {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      success: (data) => {
        resolve({
          ok: true,
          json: () => Promise.resolve(data),
        });
      },
      error: (_str, textStatus, errorThrown) => {
        reject(new Error(textStatus || errorThrown));
      },
    });
  });
}

function jsonAsMultipartFormData(json: Record<string, string | undefined>) {
  const data = new URLSearchParams();
  for (const [key, value] of Object.entries(json)) {
    if (value === undefined) continue;
    data.append(key, value);
  }
  return data;
}

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
  const res = await xhrFetch("/xrk4np/api/posts.php");
  if (!res.ok) {
    await throwErrorFromServer(
      await res.json().catch(() => console.log("error")),
      "Failed to fetch posts",
    );
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
    body: jsonAsMultipartFormData({
      text,
      time: new Date().toISOString(),
      parentId: postId,
    }),
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (!res.ok) {
    await throwErrorFromServer(res, "Failed to submit post");
  }
}

type DeletePostParams = {
  postId: string;
};

export async function deletePost({ postId }: DeletePostParams) {
  const res = await fetch(`/xrk4np/api/posts.php`, {
    body: JSON.stringify({
      postId,
    }),
    method: "DELETE",
  });
  if (!res.ok) {
    await throwErrorFromServer(res, "Failed to delete post");
  }
}
