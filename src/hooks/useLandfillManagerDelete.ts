import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useLandfillManagerDelete = (
  landfillId: string,
  userId: string,
  onOpenChange: (open: boolean) => void
) => {
  const apiClient = new APIClient(`/landfill/manager/${landfillId}/${userId}`);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse, AxiosError<FetchResponse>>({
    mutationFn: apiClient.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["landfill", landfillId, "manager"],
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "landfill"],
      })
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
  });
};

export default useLandfillManagerDelete;
