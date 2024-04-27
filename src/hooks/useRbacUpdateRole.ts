import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Roles } from "./useRbacRoles";

const apiClient = new APIClient<Roles, Roles>("/rbac/roles");

const useRbacUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<Roles>, Error, Roles>({
    mutationFn: apiClient.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  });
};

export default useRbacUpdateRole;
