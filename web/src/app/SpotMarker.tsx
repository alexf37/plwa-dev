import { Marker } from "react-map-gl";
import { type Location } from "./types";
import { PinIcon } from "./PinIcon";

type SpotMarkerProps = {
  fillColor: string;
} & Location;

export function SpotMarker({
  latitude,
  longitude,
  fillColor,
}: SpotMarkerProps) {
  return (
    <Marker latitude={latitude} longitude={longitude} anchor="bottom">
      <button
        type="button"
        aria-label="spot marker pin"
        className="flex h-12 w-12 justify-center"
      >
        <PinIcon className="h-12 w-12 text-white" indicatorColor={fillColor} />
      </button>
    </Marker>
  );
}
