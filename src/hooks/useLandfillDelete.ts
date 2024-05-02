import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const useLandfillDelete = (id: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient(`/landfill/${id}`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landfill"]});
      onOpenChange(false);
    },
  });
};

export default useLandfillDelete;
