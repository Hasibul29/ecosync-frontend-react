import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";

const apiClient = new APIClient<Landfill[]>("/landfill");

export interface Landfill {
  id?: string;
  name: string;
  latitude: number;
  longitude: number;
  capacity: number;
  operationalTimespan: string;
}

const useLandfill = () =>
  useQuery<FetchResponse<Landfill[]>, AxiosError<FetchResponse<Landfill[]>>>({
    queryKey: ["landfill"],
    queryFn: apiClient.get,
    staleTime:  2 * 60 * 1000, // 2min
  });

export default useLandfill;
