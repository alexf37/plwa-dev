import { Marker } from "react-map-gl";
import { Post, type Location } from "./types";
import { Likes } from "./Likes";
import { Comments } from "./Comments";

type PostMarkerProps = {
  post: Post;
} & Location;

export function PostMarker({ latitude, longitude, post }: PostMarkerProps) {
  return (
    <Marker latitude={latitude} longitude={longitude} anchor="bottom-left">
      <div className="rounded-xl border bg-white px-4 py-3 shadow-sm">
        <div className="">
          <small className="text-xs text-slate-500">{`${post.author} • ${post.timestamp}`}</small>
          <div className="flex gap-4 pt-2 ">
            <Likes likes={post.likes} liked={post.likedByUser} />
            <Comments comments={post.comments} />
          </div>
        </div>
      </div>
    </Marker>
  );
}
