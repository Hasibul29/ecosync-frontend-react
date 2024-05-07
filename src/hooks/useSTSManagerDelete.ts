import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useSTSManagerDelete = (
  stsId: string,
  userId: string,
  onOpenChange: (open: boolean) => void
) => {
  const apiClient = new APIClient(`/sts/manager/${stsId}/${userId}`);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse, AxiosError<FetchResponse>>({
    mutationFn: apiClient.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["sts", stsId, "manager"],
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "sts"],
      })
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
  });
};

export default useSTSManagerDelete;
