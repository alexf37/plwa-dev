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
import { Spot } from "./Spot";
import { Login } from "./Login";

async function toLoginIfNotAuthed() {
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
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/xrk4np",
  component: Landing,
});
const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/xrk4np/app",
  component: () => (
    <MapBase>
      <Outlet />
    </MapBase>
  ),
});

const appIndexRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/",
  beforeLoad: toLoginIfNotAuthed,
  component: () => (
    <ContentPortal>
      <Posts />
      <RightPane>
        <Outlet />
      </RightPane>
    </ContentPortal>
  ),
});
const spotRoute = new Route({
  getParentRoute: () => appIndexRoute,
  path: "/spot/$spotId",
  component: Spot,
});

const createAccountRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/create-account",
  beforeLoad: undefined,
  component: CreateAccount,
});
const loginRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/login",
  beforeLoad: undefined,
  component: Login,
});
const newPostRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/new-post",
  component: () => (
    <ContentPortal>
      <NewPost />
      <RightPane>
        <Outlet />
      </RightPane>
    </ContentPortal>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  appRoute.addChildren([
    appIndexRoute.addChildren([spotRoute]),
    createAccountRoute,
    loginRoute,
    newPostRoute,
  ]),
]);
export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
