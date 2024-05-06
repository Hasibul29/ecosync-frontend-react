import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { SuggestedVehicle } from "./useSTSVehicleSelecton";

export interface STSSelectedFleet {
    id: string;
    date: string;
    stsId: string;
    vehicles: SuggestedVehicle[]
}


const useSTSSelectedFleet = (stsId: string) => {
  const apiClient = new APIClient<STSSelectedFleet>(`/sts/${stsId}/todays-fleet`);
  return useQuery<FetchResponse<STSSelectedFleet>, Error>({
    queryKey: ["sts", "manager" ,stsId ,"todays-fleet"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  });
};

export default useSTSSelectedFleet;
