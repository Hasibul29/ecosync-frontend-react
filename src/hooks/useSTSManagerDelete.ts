import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const useSTSManagerDelete = (
  stsId: string,
  userId: string,
  onOpenChange: (open: boolean) => void
) => {
  const apiClient = new APIClient(`/sts/manager/${stsId}/${userId}`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sts", stsId, "manager"],
      });
      queryClient.invalidateQueries({
        queryKey: ["users", "sts"],
      })
      onOpenChange(false);
    },
  });
};

export default useSTSManagerDelete;
