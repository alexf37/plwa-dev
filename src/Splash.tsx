import { useCallback, useEffect, useRef } from "react";
import { Map } from "./components/Map";
import { type MapRef } from "react-map-gl";

const INITIAL_VIEWPORT = {
  latitude: 60.035629,
  longitude: -78.508403,
  zoom: 2.5,
};

export function Splash() {
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [INITIAL_VIEWPORT.longitude, INITIAL_VIEWPORT.latitude],
    });
  }, []);

  const onMapLoad = useCallback(() => {
    const map = mapRef.current;
    if (map) {
      map.on("moveend", () => {
        const center = map.getCenter();
        map.easeTo({
          center: { ...center, lng: center.lng - 2 },
          duration: 1000,
          easing: (p) => p,
        });
      });
      map.flyTo({
        animate: false,
      });
    }
  }, []);

  return (
    <>
      <div className="pointer-events-auto fixed z-50 grid h-full w-full grid-rows-6 place-content-center">
        <hgroup className=" row-span-3 row-start-3 flex flex-col items-center gap-2">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg md:text-8xl">
            <span className="text-blue-400">Spot</span>Chat
          </h1>
          <h2 className="text-2xl text-white md:text-3xl">Find your spot.</h2>
          <a
            href="/xrk4np/app"
            className="text-md mt-2 rounded-full border-2 border-white px-3.5 py-2.5 font-semibold text-white drop-shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            Try it out
          </a>
        </hgroup>
      </div>
      <div className="pointer-events-none relative z-0 h-full">
        <Map
          ref={mapRef}
          pitch={65}
          initialViewState={INITIAL_VIEWPORT}
          padding={{ top: 350, bottom: 0, left: 0, right: 0 }}
          fog={{
            "horizon-blend": 0.1,
            "star-intensity": 0.6,
          }}
          id="splashmap"
          onLoad={onMapLoad}
        ></Map>
      </div>
    </>
  );
}
