import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const useRbacDeleteRole = (roleId: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient(`/roles/${roleId}`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      onOpenChange(false);
    },
  });
};

export default useRbacDeleteRole;
