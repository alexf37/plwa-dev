import {
  Router,
  Route,
  RootRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { CreateAccount } from "./CreateAccount";
import { NewPost } from "./NewPost";
import { MapBase } from "./components/MapBase";
import { Landing } from "./Landing";
import { Posts } from "./components/Posts";
import { RightPane } from "./components/RightPane";
import { ContentPortal } from "./components/ContentPortal";
import { Login } from "./Login";
import { Splash } from "./Splash";
import { MapProvider } from "react-map-gl";
import { Post } from "./Post";
import { z } from "zod";

async function redirectToLoginIfNotAuthed() {
  const res = await fetch(`/xrk4np/api/auth/status.php`);
  if (!res.ok) console.error("idk what went wrong tbh");
  const isAuthenticated = await res
    .json()
    .catch((e) => console.log(e))
    .then((data) => data.status);
  if (!isAuthenticated) {
    throw redirect({
      to: "/xrk4np/app/login",
    });
  }
}

const rootRoute = new RootRoute();
const baseRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/xrk4np",
});

const indexRoute = new Route({
  getParentRoute: () => baseRoute,
  path: "/",
  component: Landing,
});

const splashRoute = new Route({
  getParentRoute: () => baseRoute,
  path: "/app/splash",
  component: Splash,
});

const appBaseRoute = new Route({
  getParentRoute: () => baseRoute,
  path: "/app",
  component: () => (
    <MapProvider>
      <MapBase>
        <Outlet />
      </MapBase>
    </MapProvider>
  ),
});

const appLayoutRoute = new Route({
  getParentRoute: () => appBaseRoute,
  id: "appLayout",
  beforeLoad: redirectToLoginIfNotAuthed,
  validateSearch: z.object({
    spot: z.string().optional().catch("notfound"),
  }),
  loaderContext: ({ search: { spot } }) => ({ spot }),
  loader: ({ context: { spot } }) => ({ spot }),
  component: () => (
    <ContentPortal>
      <Outlet />
      <RightPane />
    </ContentPortal>
  ),
});

const appIndexRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/",
  component: () => <Posts />,
});

const postRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/post/$postId",
  component: () => <Post />,
});

const newPostRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: "/new-post",
  component: () => <NewPost />,
});

const authRoute = new Route({
  getParentRoute: () => appBaseRoute,
  id: "auth",
  beforeLoad: undefined,
});
const createAccountRoute = new Route({
  getParentRoute: () => authRoute,
  path: "/create-account",
  component: CreateAccount,
});
const loginRoute = new Route({
  getParentRoute: () => authRoute,
  path: "/login",
  component: Login,
});

const routeTree = rootRoute.addChildren([
  baseRoute.addChildren([
    indexRoute,
    splashRoute,
    appBaseRoute.addChildren([
      appLayoutRoute.addChildren([appIndexRoute, postRoute, newPostRoute]),
      authRoute.addChildren([loginRoute, createAccountRoute]),
    ]),
  ]),
]);
export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
