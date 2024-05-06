import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Vehicle } from "./useVehicle";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useVehicleUpdate = (id: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient<Vehicle, Vehicle>(`/vehicles/${id}`);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<Vehicle>, AxiosError<FetchResponse<Vehicle>>, Vehicle>({
    mutationFn: apiClient.put,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"]});
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useVehicleUpdate;
