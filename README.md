# CS 4640: Programming Languages for Web Applications
This is a repo dedicated to my CS4640 class assignments, including homeworks as well as the main project. Check it out at [cs4640.cs.virginia.edu](https://cs4640.cs.virginia.edu/xrk4np/).

It is all mostly managed with Vite, which is primarily for the React part of the codebase since the rest of it is just static HTML, CSS, and PHP files. The dev environment, including the DB, uses Docker but the Vite dev server suffices for the things that don't use PHP. The site is statically generated and served from the UVA CS department's server, which runs Apache (with no Node runtime). This is also the reason for the Apache dev environment in Docker---it's meant to emulate the CS dept's servers as closely as possible.

## Stack
- HTML+CSS (+some LESS)
- Typescript
- React
- Vite
- Bun
- PHP
- Postgres
- Prettier
- ESLint
- Docker
- Apache

## Setup
Setting the dev environment up is pretty straightforward. Note that this project uses Bun, so it requires either Linux, macOS, or WSL if you're stuck with Windows. You should also probably set up Prettier to autoformat on save in whatever IDE you're using. It should already do this in VS Code, but check just to make sure.

Once you clone the repo, run `bun install` to install dependencies and `bun docker:up` to start up the DB and Apache dev server. Running `bun run build` will build the project and put the static assets in `apache/xrk4np/public_html`, the same directory served by the CS servers.
