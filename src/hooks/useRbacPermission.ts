import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Permissions } from "./useRbacRoles";

const apiClient = new APIClient<Permissions[]>("/rbac/permissions");

const useRbacPermissions = () =>
  useQuery<FetchResponse<Permissions[]>, Error>({
    queryKey: ["permissions"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 1 hour
  });

export default useRbacPermissions;
