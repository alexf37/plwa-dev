import { Marker } from "react-map-gl";
import type { Spot, Location } from "../types";
import { PinIcon } from "./icons/PinIcon";
import { router } from "../routes";

type SpotMarkerProps = {
  fillColor: string;
  spot: Spot;
} & Location;

export function SpotMarker({
  spot,
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
        onClick={() =>
          router.navigate({
            to: `/xrk4np/app/spot/$spotId`,
            params: {
              spotId: spot.id,
            },
          })
        }
      >
        <PinIcon className="h-12 w-12 text-white" indicatorColor={fillColor} />
      </button>
    </Marker>
  );
}
