import { useRef, forwardRef, type ComponentProps } from "react";
import ReactMapGL, { MapRef } from "react-map-gl";
import { mergeRefs } from "react-merge-refs";
import AutoSizer from "react-virtualized-auto-sizer";

import "mapbox-gl/dist/mapbox-gl.css";

const PUBLIC_MAPBOX_KEY =
  "pk.eyJ1IjoiYWxleGYzNyIsImEiOiJjbG5kc2xrOWEwN2hkMnBwZXc2MjV3eHM2In0.YiYWgVT3kyI7t5UYWN4JQA" as const;
const MAPBOX_STYLE =
  "mapbox://styles/alexf37/clnetfrio07xk01p94hiff1id" as const;

export const Map = forwardRef<MapRef, ComponentProps<typeof ReactMapGL>>(
  (props, forwardedRef) => {
    const mapRef = useRef<MapRef>(null);

    return (
      <>
        <AutoSizer
          onResize={() => {
            // Hacky fix - resize needs to happen on the next event loop tick
            // after the size has propogated down to the map
            setTimeout(() => {
              mapRef.current?.resize();
            }, 0);
          }}
        >
          {({ width, height }) => (
            <ReactMapGL
              ref={mergeRefs([mapRef, forwardedRef])}
              mapboxAccessToken={PUBLIC_MAPBOX_KEY}
              mapStyle={MAPBOX_STYLE}
              style={{ width, height }}
              {...props}
            />
          )}
        </AutoSizer>
      </>
    );
  },
);
Map.displayName = "Map";
