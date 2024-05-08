import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Permissions } from "./useRbacRoles";
import { AxiosError } from "axios";

const apiClient = new APIClient<Permissions[]>("/rbac/permissions");

const useRbacPermissions = () =>
  useQuery<FetchResponse<Permissions[]>, AxiosError<FetchResponse<Permissions[]>>>({
    queryKey: ["permissions"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 24 hour
  });

export default useRbacPermissions;
