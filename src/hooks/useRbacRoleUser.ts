// "/:roleId/users",

import {  useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { User } from "@/store";
import { AxiosError } from "axios";



const useRbacRoleUsers = (roleId: string) => {
    const apiClient = new APIClient<User[]>(`rbac/${roleId}/users`);
    return  useQuery<FetchResponse<User[]>, AxiosError<FetchResponse<User[]>>>({
        queryKey: ["roles", roleId , "users"],
        queryFn: apiClient.get,
        staleTime: 24 * 60 * 60 * 1000, // 24 hour
      });
  };
  

export default useRbacRoleUsers;
