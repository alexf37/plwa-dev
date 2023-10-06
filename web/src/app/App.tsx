import { useDeferredValue, useEffect, useRef, useState } from "react";
import { type MapRef } from "react-map-gl";
import { Map } from "./Map";

type Location = {
  latitude: number;
  longitude: number;
};

const INITIAL_VIEWPORT = {
  latitude: 38.035629,
  longitude: -78.503403,
  zoom: 14,
};

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

  return (
    <div className="relative h-full">
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
      ></Map>
      <div className="absolute text-xl">
        <h2>{deferredViewport.latitude}</h2>
        <h2>{mapRef?.current?.getCenter().lat}</h2>
      </div>
    </div>
  );
}
