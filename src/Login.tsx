import { router } from "./routes";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Input } from "./components/Input";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch(
      `/xrk4np/api/auth/login.php?username=${encodeURIComponent(
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
      console.log(success);
      router.navigate({ to: "/xrk4np/app" });
    }
  }

  return (
    <div className="fixed z-30 grid h-full w-full place-content-center bg-white bg-opacity-20 filter backdrop-blur-sm">
      <div className="pointer-events-auto relative z-50 flex w-96 flex-col rounded-3xl border border-slate-200 bg-white p-8 opacity-100 shadow-lg">
        <div className=" space-y-1">
          <h1 className="text-3xl font-bold">Login</h1>
          <h2 className="text-sm text-slate-500">
            Enter your username below to login
          </h2>
        </div>

        <form
          className=""
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-sm font-semibold">
                Username
              </label>
              <Input
                placeholder="ExampleUser123"
                className="border-input bg-background ring-offset-background flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow"
                name="username"
                id="username"
                type="text"
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <Input
                placeholder="••••••••"
                className="bg-background ring-offset-background first-letter:border-input flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow"
                name="password"
                id="password"
                autoComplete="off"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <hr className=" mb-4 border border-slate-200" />
          <div className="flex justify-end gap-2 font-medium">
            <Link
              to="/xrk4np/app/create-account"
              className="mr-auto py-2 text-xs font-normal text-slate-600"
            >
              Don't have an account?
              <br />
              <u>Create one!</u>
            </Link>
            <button
              type="submit"
              className="rounded-xl bg-blue-400 px-3 py-2 text-white drop-shadow"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
