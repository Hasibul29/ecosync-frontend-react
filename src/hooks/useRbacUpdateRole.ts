import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Roles } from "./useRbacRoles";
import { AxiosError } from "axios";
import { toast } from "sonner";

const apiClient = new APIClient<Roles, Roles>("/rbac/roles");

const useRbacUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<Roles>, AxiosError<FetchResponse<Roles>>, Roles>({
    mutationFn: apiClient.put,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
    
  });
};

export default useRbacUpdateRole;
