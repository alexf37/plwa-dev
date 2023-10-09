import { router } from "./routes";
import { useTitle } from "./hooks/useTitle"

export function NewPost() {
  useTitle("New Post | SpotChat");
  return (
    <div className="pointer-events-auto flex h-min w-96 flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-bold">New Post</h1>
      </div>
      <div className="py-4">
        <textarea
          name="post"
          id="newpost"
          placeholder="Say anything!"
          className="flex w-full rounded-md px-3 py-2 text-sm"
        ></textarea>
      </div>
      <div className="text-button-container">
        <button
          type="button"
          onClick={() => router.navigate({ to: "/xrk4np/app" })}
          className="text-button bg-red-400 drop-shadow"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => router.navigate({ to: "/xrk4np/app/" })}
          className="text-button bg-blue-400 drop-shadow"
        >
          Post
        </button>
      </div>
    </div>
  );
}
