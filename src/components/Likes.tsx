import { useState } from "react";
import { HeartIcon } from "./icons/HeartIcon";

type LikesProps = {
  liked?: boolean;
  likes: number;
};

export function Likes({ liked, likes }: LikesProps) {
  const [tempLiked, setTempLiked] = useState(liked);
  return (
    <div className="flex items-center gap-1.5 text-slate-900">
      <button
        type="button"
        aria-label="Like"
        onClick={() => setTempLiked(!tempLiked)}
      >
        <HeartIcon
          filled={tempLiked}
          className={"h-5 w-5 " + (tempLiked ? "text-red-500" : "")}
        />
      </button>
      <span className="text-sm">{tempLiked ? likes + 1 : likes}</span>
    </div>
  );
}
