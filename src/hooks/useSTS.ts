import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<STS[]>("/sts");

export interface STS {
    id?: string;
    wardNo: string;
    latitude: string;
    longitude: string;
    capacity: number;
}

const useSTS = () =>
  useQuery<FetchResponse<STS[]>, Error>({
    queryKey: ["sts"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 1 hour
  });

export default useSTS;
