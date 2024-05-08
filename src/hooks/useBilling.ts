import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";


export interface Billing {
  id: string;
  vehicleNumber: string;
  stsName: string;
  landfillName: string;
  wasteVolume: number;
  fuelCost: number;
  generatedTimeStamp: Date;
}

const useBilling = (userId:string) => {
  const apiClient = new APIClient<Billing[]>(`/landfill/billing/${userId}`);
  return useQuery<FetchResponse<Billing[]>, AxiosError<FetchResponse<Billing[]>>>({
    queryKey: ["billing",],
    queryFn: apiClient.get,
    staleTime: 2 * 60 * 1000, // 2 min
  });
};

export default useBilling;
