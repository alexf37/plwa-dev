import {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { type MapRef } from "react-map-gl";
import { Map } from "./Map";
import { ACTIVITY_COLORS, SPOTS, type Location } from "../types";
import { SpotMarker } from "./SpotMarker";
import { PostMarker } from "./PostMarker";

type Post = {
  id: string;
  author: string;
  author_id: string;
  text: string;
  time: string;
  like_count: string;
  user_liked: string;
  latitude: string;
  longitude: string;
};

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
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch("/xrk4np/api/posts.php")
      .then((res) => res.json())
      .then((data: Post[]) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setPosts(shuffled.slice(0, 3));
      })
      .catch((e) => console.log(e));
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
            <PostMarker
              key={post.id}
              latitude={new Number(post.latitude).valueOf()}
              longitude={new Number(post.longitude).valueOf()}
              post={post}
            />
          ))}
        </Map>
      </div>
    </>
  );
}
