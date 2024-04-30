import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Vehicle } from "./useVehicle";

const useVehicleUpdate = (id: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient<Vehicle, Vehicle>(`/vehicles/${id}`);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<Vehicle>, Error, Vehicle>({
    mutationFn: apiClient.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"], exact: true });
      onOpenChange(false);
    },
  });
};

export default useVehicleUpdate;
