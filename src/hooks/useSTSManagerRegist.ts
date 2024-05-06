import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

const apiClient = new APIClient<undefined, STSManager>("/sts/manager");

interface STSManager {
  stsId: string;
  userId: string;
}

const useSTSManagerRegist = (
  stsId: string,
  onOpenChange: (open: boolean) => void
) => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse, AxiosError<FetchResponse>, STSManager>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["sts", stsId, "manager"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "sts"],
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

export default useSTSManagerRegist;
