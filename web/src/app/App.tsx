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
    <div className="absolute right-0 top-full mt-2 w-56 rounded-3xl border bg-white p-4 shadow-lg">
      {children}
    </div>
  );
}

export default function App() {
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
    <>
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
              {isProfileOpen && <Popover>Content</Popover>}
            </div>
          </div>
        </div>
      </div>

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
