import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<Roles[]>("/rbac/roles");

export interface Roles {
    id:string,
    name:string,
    description:string,
    permissions?: Permissions[]
}

interface Permissions {
    id:string,
    name:string,
    description?:string,
}

const useRbacRoles = () =>
  useQuery<FetchResponse<Roles[]>, Error>({
    queryKey: ["roles"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 1 hour
  });

export default useRbacRoles;
