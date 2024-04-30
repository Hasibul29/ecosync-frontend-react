import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const useUserDelete = (id: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient(`/users/${id}`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onOpenChange(false);
    },
  });
};

export default useUserDelete;
