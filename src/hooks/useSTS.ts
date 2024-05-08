import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";

const apiClient = new APIClient<STS[]>("/sts");

export interface STS {
  id?: string;
  name: string;
  wardNo: string;
  latitude: number;
  longitude: number;
  capacity: number;
}

const useSTS = () =>
  useQuery<FetchResponse<STS[]>, AxiosError<FetchResponse<STS[]>>>({
    queryKey: ["sts"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 1000, // 24 hour
  });

export default useSTS;
