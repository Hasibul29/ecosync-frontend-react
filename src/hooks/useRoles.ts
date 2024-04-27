import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import roleData from "../data/roles";

const apiClient = new APIClient<Role[]>("/users/roles");

interface Role {
  id: string;
  name: string;
}

const useRoles = () =>
  useQuery<FetchResponse<Role[]>, AxiosError<FetchResponse<Role[]>>>({
    queryKey: ["users","roles"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 1 hour
    placeholderData: roleData,
  });

export default useRoles;
