import { Marker } from "react-map-gl";
import { Post, type Location } from "../types";
import { Likes } from "./Likes";
import { Comments } from "./Comments";
import { formatDistanceToNowStrict } from "date-fns";

type PostMarkerProps = {
  post: Post;
} & Location;

export function PostMarker({ latitude, longitude, post }: PostMarkerProps) {
  console.log(post);
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      anchor="bottom-left"
      aria-label="Expand Popular Post"
    >
      <div className="group rounded-xl border bg-white px-4 py-3 shadow-sm">
        <div className=" text-left">
          <small className="text-xs text-slate-500">{`${
            post.author
          } • ${formatDistanceToNowStrict(post.time)} ago`}</small>
          <div className="w-0 overflow-hidden transition-all duration-200 group-hover:w-56">
            <p className="h-min max-h-0 w-56 text-base text-slate-900 opacity-100 transition-all duration-200 group-hover:max-h-96 group-hover:opacity-100">
              {post.text}
            </p>
          </div>
          <div className="flex gap-4 pt-2 ">
            <Likes
              postId={post.id}
              likes={post.like_count}
              liked={post.user_liked}
            />
            <Comments postId={post.id} comments={post.comment_count} />
          </div>
        </div>
      </div>
    </Marker>
  );
}
