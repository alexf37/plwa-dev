import {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { type MapRef } from "react-map-gl";
import { Map } from "./components/Map";
import type { Location, Post } from "./types";
import { SpotMarker } from "./components/SpotMarker";

import { PostMarker } from "./components/PostMarker";

const posts: Post[] = [
  {
    id: "3",
    author: "NotJimRyan",
    text: "the spanish language lowkey went off with biblioteca ngl",
    location: {
      latitude: 38.03545,
      longitude: -78.513611,
    },
    likes: 64,
    comments: 13,
    timestamp: "14min ago",
    likedByUser: false,
  },
  {
    id: "4",
    author: "trashhhdev",
    text: "i feel so bad when i take over an older professor on the sidewalk like man i really didn't mean to flex on you with my youthful stride",
    location: {
      latitude: 38.03599,
      longitude: -78.49443,
    },
    likes: 54,
    comments: 21,
    timestamp: "47min ago",
    likedByUser: true,
  },
];

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

export function MapBase({ children }: PropsWithChildren) {
  const mapRef = useRef<MapRef>(null);
  const [mapViewport, setMapViewport] = useState(INITIAL_VIEWPORT);
  const deferredViewport = useDeferredValue(mapViewport);
  useEffect(() => {
    mapRef.current?.flyTo({
      center: [INITIAL_VIEWPORT.longitude, INITIAL_VIEWPORT.latitude],
    });
    document.querySelectorAll("[aria-label='Map marker']").forEach((el) => {
      el.removeAttribute("aria-label");
    });
    document
      .querySelector(`[mapboxgl-children=""]`)
      ?.removeAttribute("mapboxgl-children");
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
          {posts.map((post) => (
            <PostMarker key={post.id} {...post.location} post={post} />
          ))}
        </Map>
      </div>
    </>
  );
}
