import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { STS } from "./useSTS";

const apiClient = new APIClient<STS, STS>("/sts");

const useSTSRegist = (onOpenChange: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<STS>, Error, STS>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sts"]});
      onOpenChange(false);
    },
  });
};

export default useSTSRegist;
