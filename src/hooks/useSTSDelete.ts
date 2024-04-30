import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const useSTSDelete = (id: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient(`/sts/${id}`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sts"]});
      onOpenChange(false);
    },
  });
};

export default useSTSDelete;
