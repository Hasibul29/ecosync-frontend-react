import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Permissions } from "./useRbacRoles";


interface RolePermission{
    permissionIdList: string[]
} 

const useRbacAddRolePermissions = (roleId: string, onOpenChange: (open: boolean) => void) => {
    const apiClient = new APIClient<FetchResponse<Permissions>, RolePermission>(`rbac/${roleId}/permissions`);
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: apiClient.post,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["roles", roleId , "permissions"] , exact: true });
        onOpenChange(false);
      },
    });
  };
  

export default useRbacAddRolePermissions;
