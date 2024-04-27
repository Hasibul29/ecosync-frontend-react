import {  useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Permissions } from "./useRbacRoles";



const useRbacRolePermissions = (roleId: string) => {
    const apiClient = new APIClient<Permissions[]>(`rbac/${roleId}/permissions`);
    return  useQuery<FetchResponse<Permissions[]>, Error>({
        queryKey: ["roles", roleId , "permissions"],
        queryFn: apiClient.get,
        staleTime: 24 * 60 * 60 * 1000, // 1 hour
      });
  };
  

export default useRbacRolePermissions;
