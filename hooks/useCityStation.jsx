import { useContext } from "react";
import { CityStationContext } from "../contexts/CityStationContext";

export default function useCityStation() {
  const context = useContext(CityStationContext);

  if (!context) {
    throw new Error("useCityStation must be used within a CityStationProvider");
  }

  return context;
}
