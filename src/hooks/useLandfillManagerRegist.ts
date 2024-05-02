import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

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
  return useMutation<FetchResponse, Error, LandfillManager>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["landfill", landfillId, "manager"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "landfill"],
        exact: true,
      });
      onOpenChange(false);
    },
  });
};

export default useLandfillManagerRegist;
