import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Vehicle } from "./useVehicle";
import { AxiosError } from "axios";

const useLandfillManager = (landfillId: string) => {
  const apiClient = new APIClient<Vehicle[]>(`/landfill/manager/${landfillId}`);
  return useQuery<FetchResponse<Vehicle[]>, AxiosError<FetchResponse<Vehicle[]>>>({
    queryKey: ["landfill", landfillId ,"manager"],
    queryFn: apiClient.get,
    staleTime: 2 * 60 * 1000, // 2min
  });
};

export default useLandfillManager;
