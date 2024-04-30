import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const useVehicleDelete = (id: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient(`/vehicles/${id}`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"], exact: true });
      onOpenChange(false);
    },
  });
};

export default useVehicleDelete;
