import { router } from "./routes";
import { useTitle } from "./hooks/useTitle";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useTitle("Create Account | SpotChat");

  async function handleCreateAccount() {
    const res = await fetch(
      `/xrk4np/api/auth/create-account.php?username=${encodeURIComponent(
        username,
      )}&password=${encodeURIComponent(password)}`,
      {
        method: "POST",
        mode: "no-cors",
      },
    );
    if (!res.ok) {
      console.error("idk what went wrong tbh");
      return;
    }
    const success = await res
      .json()
      .catch((e) => console.log(e))
      .then((data) => data.success);
    if (success) {
      router.navigate({ to: "/xrk4np/app" });
    }
  }

  return (
    <div className="fixed z-30 grid h-full w-full place-content-center bg-white bg-opacity-20 filter backdrop-blur-sm">
      <div className="pointer-events-auto relative z-50 flex w-96 flex-col rounded-3xl border border-slate-200 bg-white p-8 opacity-100 shadow-lg">
        <div className=" space-y-1">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <h2 className="text-sm text-slate-500">
            Enter a username below to create your account
          </h2>
        </div>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm font-semibold">
              Username
            </label>
            <input
              placeholder="ExampleUser123"
              className="border-input bg-background ring-offset-background flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow"
              name="username"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              placeholder="********"
              className="first-letter:border-input bg-background ring-offset-background flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow"
              name="password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <hr className=" mb-4 border border-slate-200" />
        <div className="flex justify-end gap-2 font-medium">
          <Link to="/xrk4np/app/login" className="mr-auto">
            <button
              type="button"
              onClick={() => router.navigate({ to: "/xrk4np/app" })}
              className="px-3 py-2 text-sm text-slate-600"
            >
              Login
            </button>
          </Link>
          <button
            type="button"
            onClick={() => router.navigate({ to: "/xrk4np/app" })}
            className="rounded-xl bg-red-400 px-3 py-2 text-white drop-shadow"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleCreateAccount()}
            className="rounded-xl bg-blue-400 px-3 py-2 text-white drop-shadow"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
