import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Vehicle } from "./useVehicle";

const useLandfillManager = (landfillId: string) => {
  const apiClient = new APIClient<Vehicle[]>(`/landfill/manager/${landfillId}`);
  return useQuery<FetchResponse<Vehicle[]>, Error>({
    queryKey: ["landfill", landfillId ,"manager"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 1 hour
  });
};

export default useLandfillManager;
