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
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../utils";

function sortPosts(data: Post[]) {
  const sorted = data.sort(
    (a, b) => b.like_count + b.comment_count - (a.like_count + a.comment_count),
  );
  return sorted.slice(0, 3).reverse();
}

function PostsMapLayer() {
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["fetchPosts"],
    queryFn: fetchPosts,
  });

  if (isError) console.log(error);

  const postMarkers = useMemo(() => {
    if (isSuccess) {
      return sortPosts(data).map((post) => (
        <PostMarker
          key={post.id}
          latitude={post.latitude}
          longitude={post.longitude}
          post={post}
        />
      ));
    }
  }, [data, isSuccess]);

  return <>{postMarkers}</>;
}

function SpotsMapLayer() {
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

  return <>{spotMarkers}</>;
}

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
          <SpotsMapLayer />
          <PostsMapLayer />
        </Map>
      </div>
    </>
  );
}
