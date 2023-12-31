import { router } from "../routes";
import { CommentIcon } from "./icons/CommentIcon";

type CommentsProps = {
  postId: string;
  comments: number;
};

export function Comments({ comments, postId }: CommentsProps) {
  return (
    <div className="flex items-center gap-1.5 text-slate-900">
      <button
        type="button"
        aria-label="Comment"
        onClick={(e) => {
          e.stopPropagation();
          router.navigate({
            to: `/xrk4np/app/post/$postId`,
            params: {
              postId,
            },
            search: (prev) => prev,
          });
        }}
      >
        <CommentIcon className="h-5 w-5" />
      </button>
      <span className="text-sm">{comments}</span>
    </div>
  );
}
