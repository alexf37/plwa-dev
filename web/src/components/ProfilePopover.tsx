import { Comments } from "./Comments";
import { Likes } from "./Likes";
import { type Post } from "../types";

const posts: Post[] = [
  {
    id: "1",
    author: "EagerBadger3633",
    text: "lowkey might be cool to have a goat",
    location: {
      latitude: 38.035629,
      longitude: -78.503403,
    },
    likes: 91,
    comments: 13,
    timestamp: "12 minutes ago",
    likedByUser: false,
  },
  {
    id: "2",
    author: "AngryBird4119",
    text: "do bald people use shampoo or do they just use body wash up there",
    location: {
      latitude: 38.035629,
      longitude: -78.503403,
    },
    likes: 22,
    comments: 4,
    timestamp: "46 minutes ago",
    likedByUser: false,
  },
  {
    id: "3",
    author: "NotJimRyan",
    text: "god gave me physics 2 at 9am because he knew i was getting too powerful",
    location: {
      latitude: 38.03545,
      longitude: -78.513611,
    },
    likes: 82,
    comments: 51,
    timestamp: "3 hours ago",
    likedByUser: false,
  },
];

export function ProfilePopover() {
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
            <h1 className="text-xl font-bold">ExampleUser123</h1>
            <h2 className="text-sm text-slate-500">12 posts</h2>
          </div>
        </div>
        <button
          type="button"
          onClick={() => (location.href = "/xrk4np/app/create-account")}
          className="rounded-lg bg-blue-400 px-3 py-2 text-sm text-white drop-shadow"
        >
          Edit
        </button>
      </div>
      <div className="no-scrollbar max-h-72 divide-y divide-slate-200 overflow-y-auto">
        {posts.map((post) => (
          <div className="py-3 text-sm" key={post.id}>
            <small className="text-xs text-slate-500">{`${post.timestamp}`}</small>
            <p className="text-slate-900">{post.text}</p>
            <div className="grid grid-cols-6 gap-4 pt-2">
              <Likes likes={post.likes} liked={post.likedByUser} />
              <Comments comments={post.comments} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
