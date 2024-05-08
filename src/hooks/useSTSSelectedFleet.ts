import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { SuggestedVehicle } from "./useSTSVehicleSelecton";
import { AxiosError } from "axios";

export interface STSSelectedFleet {
    id: string;
    date: string;
    stsId: string;
    vehicles: SuggestedVehicle[]
}


const useSTSSelectedFleet = (stsId: string) => {
  const apiClient = new APIClient<STSSelectedFleet>(`/sts/${stsId}/todays-fleet`);
  return useQuery<FetchResponse<STSSelectedFleet>, AxiosError<FetchResponse<STSSelectedFleet>>>({
    queryKey: ["sts", "manager" ,stsId ,"todays-fleet"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 24 day
  });
};

export default useSTSSelectedFleet;
