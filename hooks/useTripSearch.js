import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "../api/axiosInstance";

const fetchTrips = async ({ queryKey }) => {
  const [_key, params] = queryKey;
  const { data } = await AxiosInstance.get(`trips/search/`, { params });
  return data;
};

export const useTripSearch = (params, enabled = false) => {
  return useQuery({
    queryKey: ["trips", params],
    queryFn: fetchTrips,
    enabled,
    retry: 1,
  });
};
