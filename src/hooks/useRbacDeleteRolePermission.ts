import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useRbacDeleteRolePermission = (roleId: string, permissionId: string) => {
  const apiClient = new APIClient(`rbac/${roleId}/${permissionId}`);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse, AxiosError<FetchResponse>>({
    mutationFn: apiClient.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["roles", roleId, "permissions"],
        exact: true,
      });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
  });
};

export default useRbacDeleteRolePermission;
