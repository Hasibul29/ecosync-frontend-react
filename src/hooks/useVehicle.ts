import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<Vehicle[]>("/vehicles");

export interface Vehicle {
    id?: string;
    vehicleNumber?: string;
    vehicleType: string;
    capacity: number;
    fuelCostLoaded:number;
    fuelCostUnloaded:number;
    onService?: boolean;
    stsId?: string;
}

const useVehicle = (filter?: string) =>
  useQuery<FetchResponse<Vehicle[]>, Error>({
    queryKey: filter ? ["vehicles", filter] : ["vehicles"],
    queryFn: () => apiClient.get({
        params: {
            filter: filter
        }
    }),
    staleTime: 24 * 60 * 60 * 1000, // 1 hour
  });

export default useVehicle;
