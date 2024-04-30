import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Roles } from "./useRbacRoles";

const apiClient = new APIClient<FetchResponse<Roles>, Roles>(`rbac/roles`);

const useRbacAddRole = (onOpenChange: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onOpenChange(false);
    },
  });
};

export default useRbacAddRole;
