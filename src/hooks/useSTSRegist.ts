import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { STS } from "./useSTS";
import { AxiosError } from "axios";
import { toast } from "sonner";

const apiClient = new APIClient<STS, STS>("/sts");

const useSTSRegist = (onOpenChange: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<STS>, AxiosError<FetchResponse<STS>>, STS>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sts"]});
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useSTSRegist;
