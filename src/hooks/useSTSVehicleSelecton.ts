import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Vehicle } from "./useVehicle";

export interface SuggestedVehicle extends Vehicle {
    isSuggested: boolean;
}

const useSTSVehicleSelection = (stsId: string) => {
  const apiClient = new APIClient<SuggestedVehicle[]>(`/sts/manager/vehicle/${stsId}`);
  return useQuery<FetchResponse<SuggestedVehicle[]>, Error>({
    queryKey: ["sts", "manager" ,stsId ,"vehicle"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  });
};

export default useSTSVehicleSelection;
