import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const useLandfillManagerDelete = (
  landfillId: string,
  userId: string,
  onOpenChange: (open: boolean) => void
) => {
  const apiClient = new APIClient(`/landfill/manager/${landfillId}/${userId}`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["landfill", landfillId, "manager"],
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "landfill"],
      })
      onOpenChange(false);
    },
  });
};

export default useLandfillManagerDelete;
