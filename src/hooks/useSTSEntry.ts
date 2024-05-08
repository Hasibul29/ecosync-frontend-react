import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Vehicle } from "./useVehicle";
import { STS } from "./useSTS";
import { AxiosError } from "axios";

export interface STSEntry {
  id?: string;
  stsId?: string;
  vehicleId?: string;
  wasteVolume: number;
  arrivalTime: Date;
  departureTime: Date;
  vehicle?:Vehicle;
  sts?:STS;
}

const useSTSEntry = (userId: string) => {
  const apiClient = new APIClient<STSEntry[]>("/sts/entry/" + userId);
  return useQuery<FetchResponse<STSEntry[]>, AxiosError<FetchResponse<STSEntry[]>>>({
    queryKey: ["sts", "entry"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 24 hour
  });
};

export default useSTSEntry;
