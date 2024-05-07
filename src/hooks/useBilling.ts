import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";


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
  return useQuery<FetchResponse<Billing[]>, Error>({
    queryKey: ["billing",],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 1 hour
  });
};

export default useBilling;
