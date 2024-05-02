import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Vehicle } from "./useVehicle";
import { Landfill } from "./useLandfill";

export interface LandfillEntry {
  id?: string;
  landfillId?: string;
  vehicleId?: string;
  wasteVolume: number;
  arrivalTime: Date;
  departureTime: Date;
  vehicle?:Vehicle;
  landfill?:Landfill;
}

const useLandfillEntry = (userId: string) => {
  const apiClient = new APIClient<LandfillEntry[]>("/landfill/entry/" + userId);
  return useQuery<FetchResponse<LandfillEntry[]>, Error>({
    queryKey: ["landfill", "entry"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 24 hour
  });
};

export default useLandfillEntry;
