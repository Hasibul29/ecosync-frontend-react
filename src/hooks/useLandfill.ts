import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<Landfill[]>("/landfill");

export interface Landfill {
  id?: string;
  name: string;
  latitude: string;
  longitude: string;
  capacity: number;
  operationalTimespan: string;
}

const useLandfill = () =>
  useQuery<FetchResponse<Landfill[]>, Error>({
    queryKey: ["landfill"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 1 hour
  });

export default useLandfill;
