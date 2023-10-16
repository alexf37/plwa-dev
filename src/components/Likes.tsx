import { useState } from "react";
import { HeartIcon } from "./icons/HeartIcon";

type LikesProps = {
  liked?: boolean;
  likes: number;
  postId: string;
};

export function Likes({ liked, likes, postId }: LikesProps) {
  const [tempLiked, setTempLiked] = useState(liked);
  async function onLike() {
    //removing a like
    if (tempLiked) {
      const res = await fetch("/xrk4np/api/likes/remove.php", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          postId,
        }),
      });
      try {
        if (res.ok) {
          setTempLiked(false);
        } else {
          console.log(await res.json());
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //adding a like
      const res = await fetch("/xrk4np/api/likes/add.php", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          postId,
          time: new Date().toISOString(),
        }),
      });
      try {
        if (res.ok) {
          setTempLiked(true);
        } else {
          console.log(await res.json());
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="flex items-center gap-1.5 text-slate-900">
      <button type="button" aria-label="Like" onClick={onLike}>
        <HeartIcon
          filled={tempLiked}
          className={"h-5 w-5 " + (tempLiked ? "text-red-500" : "")}
        />
      </button>
      <span className="text-sm">
        {tempLiked && !liked
          ? likes + 1
          : !tempLiked && liked
          ? likes - 1
          : likes}
      </span>
    </div>
  );
}
