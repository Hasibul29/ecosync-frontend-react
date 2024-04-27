import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";


const useRbacDeleteRolePermission = (roleId: string, permissionId: string) => {
  const apiClient = new APIClient(`rbac/${roleId}/${permissionId}`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles" , roleId , "permissions"] });
    },
  });
};

export default useRbacDeleteRolePermission;
