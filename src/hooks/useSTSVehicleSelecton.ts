import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Vehicle } from "./useVehicle";
import { AxiosError } from "axios";

export interface SuggestedVehicle extends Vehicle {
    isSuggested: boolean;
}

const useSTSVehicleSelection = (stsId: string) => {
  const apiClient = new APIClient<SuggestedVehicle[]>(`/sts/manager/vehicle/${stsId}`);
  return useQuery<FetchResponse<SuggestedVehicle[]>, AxiosError<FetchResponse<SuggestedVehicle[]>>>({
    queryKey: ["sts", "manager" ,stsId ,"vehicle"],
    queryFn: apiClient.get,
    staleTime: 2 * 60 * 1000, // 2min
  });
};

export default useSTSVehicleSelection;
