import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Roles } from "./useRbacRoles";
import { toast } from "sonner"
import { AxiosError } from "axios";

const apiClient = new APIClient<Roles, Roles>(`rbac/roles`);

const useRbacAddRole = (onOpenChange: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<Roles>,AxiosError<FetchResponse<Roles[]>> , Roles>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
  });
};

export default useRbacAddRole;
