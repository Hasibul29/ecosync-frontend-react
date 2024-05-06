import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { toast } from "sonner";
import { AxiosError } from "axios";

const apiClient = new APIClient<undefined, LandfillManager>("/landfill/manager");

interface LandfillManager {
  landfillId: string;
  userId: string;
}

const useLandfillManagerRegist = (
  landfillId: string,
  onOpenChange: (open: boolean) => void
) => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse, AxiosError<FetchResponse>, LandfillManager>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["landfill", landfillId, "manager"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "landfill"],
        exact: true,
      });
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useLandfillManagerRegist;
