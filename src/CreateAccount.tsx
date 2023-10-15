import { router } from "./routes";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Input } from "./components/Input";

export function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    message: "",
    show: false,
  });

  async function handleCreateAccount() {
    const res = await fetch(`/xrk4np/api/auth/create-account.php`, {
      body: JSON.stringify({
        username,
        password,
      }),
      method: "POST",
      mode: "no-cors",
    });
    if (!res.ok) {
      setError({
        message: await res.json().then((data) => data.error),
        show: true,
      });
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

        <form
          className=""
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateAccount();
          }}
        >
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-sm font-semibold">
                Username
              </label>
              <Input
                required
                placeholder="ExampleUser123"
                name="username"
                id="username"
                type="text"
                autoComplete="off"
                minLength={4}
                maxLength={50}
                pattern="[a-zA-Z0-9]+"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <Input
                required
                placeholder="••••••••"
                name="password"
                autoComplete="off"
                id="password"
                minLength={4}
                maxLength={50}
                type="password"
                pattern="[A-Za-z0-9!@#$%&]+"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error.show && (
              <p className="text-sm text-red-500">{error.message}</p>
            )}
          </div>
          <hr className=" mb-4 border border-slate-200" />
          <div className="flex justify-end gap-2 font-medium">
            <Link
              to="/xrk4np/app/login"
              className="mr-auto py-2 text-xs font-normal text-slate-600"
            >
              Already have an account?
              <br />
              <u>Login instead!</u>
            </Link>
            <button
              type="submit"
              className="rounded-xl bg-blue-400 px-3 py-2 text-white drop-shadow"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
