export function Landing() {
  return (
    <>
      <main className="mx-auto flex h-full w-full max-w-prose flex-col px-8 py-16 text-left text-slate-50">
        <div className="m-auto">
          <h1 className="mb-2 text-5xl font-bold tracking-wide text-slate-500">
            Welcome!
          </h1>
          <h2 className="mb-4 text-3xl font-semibold tracking-wide">
            Alex Foster's CS4640 Site
          </h2>
          <p className="mb-2 tracking-wide text-slate-200">
            I made this site with Vite, React, Typescript, Tailwind, PHP, and
            some plain old HTML+CSS. The typeface I'm using is called{" "}
            <a
              className="underline underline-offset-4 hover:text-white"
              target="_blank"
              href="https://rsms.me/inter/"
            >
              Inter,
            </a>{" "}
            one of my favourite fonts.
          </p>
          <p className="tracking-wide text-slate-200">
            I'm not sure what to do with this site just yet but hopefully I can
            think of something cool to park here alongside my assignments.
            Speaking of which, maybe I should add a menu so you can actually get
            to them...
          </p>
          <div className="mt-4 flex gap-2 text-lg font-semibold text-slate-300">
            <a
              className="underline-offset-4 hover:underline"
              href="/xrk4np/hw0/homework0.html"
            >
              HW 0 - Publishing
            </a>
            <span className="arrow-stretch">&gt;</span>
          </div>
          <div className="mt-4 flex gap-2 text-lg font-semibold text-slate-300">
            <a
              className="underline-offset-4 hover:underline"
              href="/xrk4np/hw2/"
            >
              HW 2 - Static Web Page
            </a>
            <span className="arrow-stretch">&gt;</span>
          </div>
        </div>
      </main>
    </>
  );
}
