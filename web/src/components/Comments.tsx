import { CommentIcon } from "./icons/CommentIcon";

type CommentsProps = {
  comments: number;
};

export function Comments({ comments }: CommentsProps) {
  return (
    <div className="flex items-center gap-1.5 text-slate-900">
      <button type="button" aria-label="Comment">
        <CommentIcon className="h-5 w-5" />
      </button>
      <span className="text-sm">{comments}</span>
    </div>
  );
}
