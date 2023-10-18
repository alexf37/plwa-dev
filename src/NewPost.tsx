import { router } from "./routes";
import { useEffect, useState } from "react";
import { type Location } from "./types";

export function NewPost() {
  const [text, setText] = useState("");
  const [location, setLocation] = useState<Location>();
  const [error, setError] = useState({
    message: "",
    show: false,
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state !== "granted") {
        setError({
          message:
            "Your post will not have a location attached so it will not appear on the map. If this is a mistake, please enable location services for this site and reload.",
          show: true,
        });
      }
    });
  }, []);

  async function handleSubmitNewPost() {
    const res = await fetch(`/xrk4np/api/posts.php`, {
      body: JSON.stringify({
        text,
        time: new Date().toISOString(),
        latitude: location?.latitude,
        longitude: location?.longitude,
      }),
      method: "POST",
      mode: "no-cors",
    });
    if (res.ok) {
      router.navigate({ to: "/xrk4np/app", search: (prev) => prev });
    } else {
      setError({
        message: await res.json().then((data) => data.error),
        show: true,
      });
    }
  }
  return (
    <div className="pointer-events-auto flex h-min w-96 flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-bold">New Post</h1>
      </div>
      <div className="space-y-2 py-4">
        <textarea
          name="post"
          id="newpost"
          value={text}
          maxLength={280}
          minLength={1}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say anything!"
          className="flex w-full rounded-md px-3 py-2 text-sm"
        ></textarea>
        {error.show && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
      <div className="text-button-container">
        <button
          type="button"
          onClick={() =>
            router.navigate({ to: "/xrk4np/app", search: (prev) => prev })
          }
          className="text-button bg-red-400 drop-shadow"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => handleSubmitNewPost()}
          className="text-button bg-blue-400 drop-shadow"
        >
          Post
        </button>
      </div>
    </div>
  );
}
