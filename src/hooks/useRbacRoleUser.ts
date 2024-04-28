// "/:roleId/users",

import {  useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { User } from "@/store";



const useRbacRoleUsers = (roleId: string) => {
    const apiClient = new APIClient<User[]>(`rbac/${roleId}/users`);
    return  useQuery<FetchResponse<User[]>, Error>({
        queryKey: ["roles", roleId , "users"],
        queryFn: apiClient.get,
        staleTime: 24 * 60 * 60 * 1000, // 1 hour
      });
  };
  

export default useRbacRoleUsers;
