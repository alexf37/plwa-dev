import { router } from "./routes";

export function CreateAccount() {
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
            />
          </div>
        </div>
        <hr className=" mb-4 border border-slate-200" />
        <div className="flex justify-end gap-2 font-medium">
          <button
            type="button"
            onClick={() => router.navigate({ to: "/xrk4np/app" })}
            className="rounded-xl bg-red-400 px-3 py-2 text-white drop-shadow"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => router.navigate({ to: "/xrk4np/app/new-post" })}
            className="rounded-xl bg-blue-400 px-3 py-2 text-white drop-shadow"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
