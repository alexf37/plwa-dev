import { useEffect, useRef, useState } from "react";
import { type MapRef } from "react-map-gl";
import { Map } from "./Map";

export default function App() {
  const mapRef = useRef<MapRef>(null);
  const [mapViewport, setMapViewport] = useState({
    latitude: 51.5074,
    longitude: 0.1278,
    zoom: 10,
  });
  useEffect(() => {
    mapRef.current?.flyTo({
      center: [mapViewport.longitude, mapViewport.latitude],
    });
  }, [mapViewport.longitude, mapViewport.latitude]);
  return (
    <div className="relative h-screen w-screen">
      <Map ref={mapRef} {...mapViewport}></Map>
    </div>
  );
}
