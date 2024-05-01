import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

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
  return useMutation<FetchResponse, Error, STSManager>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sts", stsId, "manager"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "sts"],
        exact: true,
      });
      onOpenChange(false);
    },
  });
};

export default useSTSManagerRegist;
