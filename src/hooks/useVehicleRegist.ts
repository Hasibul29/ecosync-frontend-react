import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Vehicle } from "./useVehicle";
import { AxiosError } from "axios";
import { toast } from "sonner";

const apiClient = new APIClient<Vehicle, Vehicle>("/vehicles");

const useVehicleRegist = (onOpenChange: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<Vehicle>, AxiosError<FetchResponse<Vehicle>>, Vehicle>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useVehicleRegist;
