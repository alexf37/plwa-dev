import { useDeferredValue, useEffect, useRef, useState } from "react";
import { type MapRef } from "react-map-gl";
import { Map } from "./Map";
import { Posts } from "./Posts";
import type { Location } from "./types";
import { SpotMarker } from "./SpotMarker";
import { twMerge } from "tailwind-merge";
import { NotificationIcon } from "./NotificationIcon";
import { ProfileIcon } from "./ProfileIcon";
import React from "react";

import { Router, Route, RootRoute, Outlet, Link } from "@tanstack/react-router";
import { ProfilePopover } from "./ProfilePopover";

function CreateAccountPage() {
  return (
    <div className="fixed z-30 grid h-full w-full place-content-center bg-white bg-opacity-20 filter backdrop-blur-sm">
      <div className="pointer-events-auto relative z-50 flex w-96 flex-col rounded-3xl border border-slate-200 bg-white p-8 opacity-100 shadow-lg">
        <div className=" space-y-1">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <h2 className="text-sm text-slate-400">
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
          <Link
            to="/xrk4np/app"
            className="rounded-xl bg-red-400 px-3 py-2 text-white drop-shadow"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="rounded-xl bg-blue-400 px-3 py-2 text-white drop-shadow"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

const rootRoute = new RootRoute({
  component: () => (
    <Root>
      <Outlet />
    </Root>
  ),
});
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/xrk4np/app/",
  component: Main,
});
const createAccountRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/xrk4np/app/create-account/",
  component: CreateAccountPage,
});

const routeTree = rootRoute.addChildren([indexRoute, createAccountRoute]);
export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const INITIAL_VIEWPORT = {
  latitude: 38.035629,
  longitude: -78.508403,
  zoom: 14,
};

const ACTIVITY_COLORS = {
  dead: "#e2e8f0",
  light: "#0ea5e9",
  medium: "#22c55e",
  heavy: "#f59e0b",
  extreme: "#ef4444",
} as const;

type Spot = {
  name: string;
  location: Location;
  activity: keyof typeof ACTIVITY_COLORS;
};

const spots: Spot[] = [
  {
    name: "First Year Dorms",
    location: {
      latitude: 38.03599,
      longitude: -78.49643,
    },
    activity: "heavy",
  },
  {
    name: "Lawn",
    location: {
      latitude: 38.035629,
      longitude: -78.503403,
    },
    activity: "extreme",
  },
  {
    name: "JPA",
    location: {
      latitude: 38.028629,
      longitude: -78.508403,
    },
    activity: "medium",
  },
  {
    name: "North Grounds",
    location: {
      latitude: 38.042629,
      longitude: -78.503503,
    },
    activity: "medium",
  },
  {
    name: "The Corner",
    location: {
      latitude: 38.036519,
      longitude: -78.500403,
    },
    activity: "light",
  },
];

const Button = React.forwardRef(
  (
    props: React.ButtonHTMLAttributes<HTMLButtonElement>,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <button
        type="button"
        {...props}
        ref={ref}
        className={twMerge(
          "pointer-events-auto grid h-10 w-10 place-content-center rounded-full border border-slate-200 bg-white text-slate-900 shadow",
          props.className,
        )}
      >
        {props.children}
      </button>
    );
  },
);

function Popover({ children }: React.PropsWithChildren) {
  return (
    <div className="pointer-events-auto absolute right-0 top-full mt-2 w-96 rounded-3xl border bg-white p-6 shadow-lg">
      {children}
    </div>
  );
}

function Main() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileButtonRef = useRef(null);

  const handleProfileButtonClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  const notifsButtonRef = useRef(null);

  const handleNotifsButtonClick = () => {
    setIsNotifsOpen(!isNotifsOpen);
  };
  return (
    <div className="pointer-events-none absolute z-50 flex h-full w-full justify-between p-16">
      <Posts />
      <div className="flex h-full w-96 flex-col items-end justify-between">
        <div className="flex gap-6">
          <div className="relative">
            <Button
              aria-label="Notifications"
              className="h-12 w-12"
              ref={notifsButtonRef}
              onClick={handleNotifsButtonClick}
            >
              <NotificationIcon className="h-7 w-7" />
            </Button>
            {isNotifsOpen && <Popover>Content</Popover>}
          </div>

          <div className="relative">
            <Button
              aria-label="Profile"
              className="h-12 w-12"
              ref={profileButtonRef}
              onClick={handleProfileButtonClick}
            >
              <ProfileIcon className="h-7 w-7" />
            </Button>
            {isProfileOpen && (
              <Popover>
                <ProfilePopover />
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Root({ children }: React.PropsWithChildren) {
  const mapRef = useRef<MapRef>(null);
  const [mapViewport, setMapViewport] = useState(INITIAL_VIEWPORT);
  const deferredViewport = useDeferredValue(mapViewport);
  useEffect(() => {
    mapRef.current?.flyTo({
      center: [INITIAL_VIEWPORT.longitude, INITIAL_VIEWPORT.latitude],
    });
  }, []);

  const handleFlyToOnClick = ({ latitude, longitude }: Location) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
    });
  };

  return (
    <>
      {children}
      <div className="relative z-0 h-full">
        <Map
          ref={mapRef}
          {...deferredViewport}
          onMove={({ viewState: { latitude, longitude, zoom } }) => {
            setMapViewport({ latitude, longitude, zoom });
          }}
          optimizeForTerrain={true}
          onClick={(e) => {
            e.preventDefault();
            const { lat: latitude, lng: longitude } = e.lngLat;
            handleFlyToOnClick({ latitude, longitude });
          }}
        >
          {spots.map(({ name, location, activity }) => (
            <SpotMarker
              key={name}
              {...location}
              fillColor={ACTIVITY_COLORS[activity]}
            />
          ))}
        </Map>
      </div>
    </>
  );
}
