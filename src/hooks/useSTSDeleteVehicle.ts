import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useSTSDeleteVehicle = (
  stsId: string,
  vehicleId: string,
  onOpenChange: (open: boolean) => void
) => {
  const apiClient = new APIClient(`/sts/vehicle/${stsId}/${vehicleId}`);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse, AxiosError<FetchResponse>>({
    mutationFn: apiClient.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["sts", stsId, "vehicle"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vehicles", "sts"],
      })
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
  });
};

export default useSTSDeleteVehicle;
