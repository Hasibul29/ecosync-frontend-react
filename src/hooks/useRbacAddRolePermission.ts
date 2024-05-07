import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Permissions } from "./useRbacRoles";
import { AxiosError } from "axios";
import { toast } from "sonner";


interface RolePermission{
    permissionIdList: string[]
} 

const useRbacAddRolePermissions = (roleId: string, onOpenChange: (open: boolean) => void) => {
    const apiClient = new APIClient<Permissions, RolePermission>(`rbac/${roleId}/permissions`);
    const queryClient = useQueryClient();
    return useMutation<FetchResponse<Permissions>, AxiosError<FetchResponse<Permissions>>, RolePermission>({
      mutationFn: apiClient.post,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["roles", roleId , "permissions"] , exact: true });
        onOpenChange(false);
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.response?.data.message);
      }
    });
  };
  

export default useRbacAddRolePermissions;
