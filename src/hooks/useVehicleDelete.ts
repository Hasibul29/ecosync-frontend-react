import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useVehicleDelete = (id: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient(`/vehicles/${id}`);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse, AxiosError<FetchResponse>>({
    mutationFn: apiClient.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"]});
      queryClient.invalidateQueries({ queryKey: ["sts"]});
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
  });
};

export default useVehicleDelete;
