import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Vehicle } from "./useVehicle";
import { AxiosError } from "axios";

const useSTSManager = (stsId: string) => {
  const apiClient = new APIClient<Vehicle[]>(`/sts/manager/${stsId}`);
  return useQuery<FetchResponse<Vehicle[]>, AxiosError<FetchResponse<Vehicle[]>>>({
    queryKey: ["sts", stsId ,"manager"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 24 hour
  });
};

export default useSTSManager;
