import {
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
  useMemo,
} from "react";
import { type MapRef } from "react-map-gl";
import { Map } from "./Map";
import { ACTIVITY_COLORS, SPOTS, type Location } from "../types";
import { SpotMarker } from "./SpotMarker";
import { PostMarker } from "./PostMarker";
import { type Post } from "../types";

const INITIAL_VIEWPORT = {
  latitude: 38.035629,
  longitude: -78.508403,
  zoom: 14,
};

export function MapBase({ children }: PropsWithChildren) {
  const mapRef = useRef<MapRef>(null);
  const [mapViewport, setMapViewport] = useState(INITIAL_VIEWPORT);
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
        const sorted = data.sort(
          (a, b) =>
            parseInt(b.like_count) +
            parseInt(b.comment_count) -
            (parseInt(a.like_count) + parseInt(a.comment_count)),
        );
        setPosts(sorted.slice(0, 3).reverse());
      })
      .catch((e) => console.log(e));
  }, []);

  const handleFlyToOnClick = ({ latitude, longitude }: Location) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
    });
  };

  const spotMarkers = useMemo(() => {
    return SPOTS.map((spot) => (
      <SpotMarker
        key={spot.id}
        spot={spot}
        {...spot.location}
        fillColor={ACTIVITY_COLORS[spot.activity]}
      />
    ));
  }, []);

  const postMarkers = useMemo(() => {
    return posts.map((post) => (
      <PostMarker
        key={post.id}
        latitude={new Number(post.latitude).valueOf()}
        longitude={new Number(post.longitude).valueOf()}
        post={post}
      />
    ));
  }, [posts]);

  return (
    <>
      {children}
      <div className="relative z-0 h-full">
        <Map
          ref={mapRef}
          {...mapViewport}
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
          {spotMarkers}
          {postMarkers}
        </Map>
      </div>
    </>
  );
}
