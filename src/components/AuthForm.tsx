import { useRouter } from "@tanstack/react-router";
import { PropsWithChildren, useState } from "react";
import { Input } from "./Input";

type AuthFormProps = PropsWithChildren<{
  title: string;
  description: string;
  submitText: string;
  endpoint: string;
}>;

export function AuthForm({
  title,
  description,
  submitText,
  endpoint,
  children,
}: AuthFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    message: "",
    show: false,
  });

  async function handleSubmit() {
    const res = await fetch(endpoint, {
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
    <div>
      <div className=" space-y-1">
        <h1 className="text-3xl font-bold">{title}</h1>
        <h2 className="text-sm text-slate-500">{description}</h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
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
            <p className="text-sm text-red-600">{error.message}</p>
          )}
        </div>

        <hr className=" mb-4 border border-slate-200" />
        <div className="flex justify-end gap-2 font-medium">
          {children}
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-3 py-2 text-white drop-shadow"
          >
            {error.show ? "Try again" : submitText}
          </button>
        </div>
      </form>
    </div>
  );
}
