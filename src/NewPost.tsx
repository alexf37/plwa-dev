import { router } from "./routes";
import { useEffect, useState } from "react";
import { type Location } from "./types";

export function NewPost() {
  const [text, setText] = useState("");
  const [location, setLocation] = useState<Location | undefined>();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);
  return (
    <div className="pointer-events-auto flex h-min w-96 flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-bold">New Post</h1>
      </div>
      <div className="py-4">
        <textarea
          name="post"
          id="newpost"
          value={text}
          onChange={(e) => setText(e.target.value)}
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
          onClick={async () => {
            const res = await fetch(`/xrk4np/api/posts.php`, {
              body: JSON.stringify({
                text,
                time: new Date().toISOString(),
                latitude: location?.latitude ?? null,
                longitude: location?.longitude ?? null,
              }),
              method: "POST",
              mode: "no-cors",
            });
            if (res.ok) {
              router.navigate({ to: "/xrk4np/app" });
            }
          }}
          className="text-button bg-blue-400 drop-shadow"
        >
          Post
        </button>
      </div>
    </div>
  );
}
