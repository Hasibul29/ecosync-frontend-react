import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";

const apiClient = new APIClient<Roles[]>("/rbac/roles");

export interface Roles {
    id?:string,
    name?:string,
    description?:string,
    permissions?: Permissions[]
}

export interface Permissions {
    id:string,
    name:string,
    description?:string,
}

const useRbacRoles = () =>
  useQuery<FetchResponse<Roles[]>, AxiosError<FetchResponse<Roles[]>>>({
    queryKey: ["roles"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 24 hour
  });

export default useRbacRoles;
