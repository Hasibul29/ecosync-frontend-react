import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Vehicle } from "./useVehicle";

const useSTSVehicle = (stsId: string) => {
  const apiClient = new APIClient<Vehicle[]>(`/sts/vehicle/${stsId}`);
  return useQuery<FetchResponse<Vehicle[]>, Error>({
    queryKey: ["sts", stsId ,"vehicle"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 1 hour
  });
};

export default useSTSVehicle;
