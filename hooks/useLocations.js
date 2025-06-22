import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

const fetchLocations = async () => {
  const { data } = await AxiosInstance.get(`locations/`);
  return data.cities;
};

export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    staleTime: 1000 * 50 * 10,
  });
};
