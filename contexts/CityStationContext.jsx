import { createContext, useEffect, useState } from "react";
import { databases } from "../lib/appwrite";

const DATABASE_ID = "6852f0250025635fea11";
const AREA_COLLECTION_ID = "68531cf5002f7f8dc3f1";

// 🗺️ City and Station Context
export const CityStationContext = createContext();

// Data provider
export function CityStationProvider({ children }) {
  const [area, setArea] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ fetch city and station data from Appwrite
  const fetchCityAndStation = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await databases.listDocuments(
        DATABASE_ID,
        AREA_COLLECTION_ID
      );
      setArea(response.documents || []);
    } catch (err) {
      console.error("Failed to fetch city/station data:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ⏳ Load data on first render
  useEffect(() => {
    fetchCityAndStation();
  }, []);

  // 🧹 Prepare data: flat list
  const cityStationNames = area.map((doc) => ({
    stationName: doc.stationName,
    cityName: doc.cityName,
  }));

  // 🧠 Prepare data: grouped by city
  const groupedData = area.reduce((acc, doc) => {
    const city = doc.cityName;
    const station = doc.stationName;
    if (!acc[city]) acc[city] = [];
    acc[city].push(station);
    return acc;
  }, {});

  return (
    <CityStationContext.Provider
      value={{
        cityStationNames,
        groupedData,
        isLoading,
        error,
        refetch: fetchCityAndStation,
      }}
    >
      {children}
    </CityStationContext.Provider>
  );
}
