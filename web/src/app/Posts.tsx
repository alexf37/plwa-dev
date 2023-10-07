import { Likes } from "./Likes";
import { PlusIcon } from "./PlusIcon";
import { Comments } from "./Comments";

import { type Post } from "./types";

const posts: Post[] = [
  {
    id: "1",
    author: "EagerBadger3633",
    text: "grillology tastes like doodoo today ngl, i say we boycott",
    location: {
      latitude: 38.035629,
      longitude: -78.503403,
    },
    likes: 12,
    comments: 3,
    timestamp: "30s ago",
    likedByUser: false,
  },
  {
    id: "2",
    author: "AngryBird4119",
    text: "got hit in the head by a frisbee on the lawn :/",
    location: {
      latitude: 38.035629,
      longitude: -78.503403,
    },
    likes: 19,
    comments: 1,
    timestamp: "8min ago",
    likedByUser: false,
  },
  {
    id: "3",
    author: "NotJimRyan",
    text: "the spanish language lowkey went off with biblioteca ngl",
    location: {
      latitude: 38.03545,
      longitude: -78.513611,
    },
    likes: 64,
    comments: 13,
    timestamp: "14min ago",
    likedByUser: false,
  },
  {
    id: "4",
    author: "trashhhdev",
    text: "i feel so bad when i take over an older professor on the sidewalk like man i really didn't mean to flex on you with my youthful stride",
    location: {
      latitude: 38.03599,
      longitude: -78.49643,
    },
    likes: 54,
    comments: 21,
    timestamp: "47min ago",
    likedByUser: true,
  },
  {
    id: "5",
    author: "elizabeth12",
    text: "how do they milk the almonds tho",
    location: {
      latitude: 38.03599,
      longitude: -78.49643,
    },
    likes: 8,
    comments: 3,
    timestamp: "48min ago",
    likedByUser: false,
  },
];

export function Posts() {
  return (
    <div className="pointer-events-auto flex h-full w-96 flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-bold">Posts</h1>
        <button
          type="button"
          aria-label="Add Post"
          onClick={() => (location.href = "/xrk4np/app/new-post")}
          className="new-post-button"
        >
          <PlusIcon stroke="currentColor" strokeWidth={0.5} />
        </button>
      </div>
      <div className="no-scrollbar divide-y divide-slate-200 overflow-y-auto">
        {posts.map((post) => (
          <div className="py-4" key={post.id}>
            <small className="text-xs text-slate-500">{`${post.author} • ${post.timestamp}`}</small>
            <p className="text-base text-slate-900">{post.text}</p>
            <div className="grid grid-cols-6 gap-4 pt-2">
              <Likes likes={post.likes} liked={post.likedByUser} />
              <Comments comments={post.comments} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
