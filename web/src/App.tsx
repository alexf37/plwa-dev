function App() {
  return (
    <>
      <main className="h-full bg-slate-800 text-slate-50 grid place-content-center">
        <div className="mx-auto flex h-4/5 w-full max-w-2xl flex-col items-start justify-center text-left">
          <h1 className="mb-2 text-5xl font-bold tracking-wide text-slate-400">
            Welcome!
          </h1>
          <h2 className="mb-4 text-3xl font-semibold tracking-wide">
            Alex Foster's CS4640 Site
          </h2>
          <p className="tracking-wide text-slate-200 mb-2">
            I made this site with Vite, React, Typescript, Tailwind, PHP, and some plain old HTML+CSS. The typeface I'm using is called <a className="underline underline-offset-4 hover:text-white" target="_blank" href="https://rsms.me/inter/">Inter,</a> one of my favourite fonts. 
          </p>
          <p className="tracking-wide text-slate-200">
             I'm not sure what to do with this site just yet but hopefully I can think of something cool to park here alongside my assignments. Speaking of which, maybe I should add a menu so you can actually get to them...
          </p>
          <div className="mt-4 flex gap-2 text-slate-300 font-semibold text-lg">
        <a className="hover:underline underline-offset-4" href="/hw0/homework0.html">HW 0 - Publishing</a><span className="arrow-stretch">&gt;</span> 
      </div>
        </div>
      </main>
    </>
  );
}

export default App;
