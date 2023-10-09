import {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { type MapRef } from "react-map-gl";
import { Map } from "./Map";
import { ACTIVITY_COLORS, SPOTS, type Location, type Post } from "../types";
import { SpotMarker } from "./SpotMarker";
import { PostMarker } from "./PostMarker";

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

export function MapBase({ children }: PropsWithChildren) {
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
          {SPOTS.map((spot) => (
            <SpotMarker
              key={spot.id}
              spot={spot}
              {...spot.location}
              fillColor={ACTIVITY_COLORS[spot.activity]}
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
