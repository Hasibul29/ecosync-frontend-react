import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const useSTSDeleteVehicle = (
  stsId: string,
  vehicleId: string,
  onOpenChange: (open: boolean) => void
) => {
  const apiClient = new APIClient(`/sts/vehicle/${stsId}/${vehicleId}`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sts", stsId, "vehicle"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vehicles", "1"],
      })
      onOpenChange(false);
    },
  });
};

export default useSTSDeleteVehicle;
