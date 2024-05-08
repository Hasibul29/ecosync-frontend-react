import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<null, null>("/auth/authenticated");

const useAuth = () =>
  useQuery<any, Error, FetchResponse<null>>({
    queryKey: ["isAuthenticated"],
    queryFn: apiClient.get,
    staleTime: 5 * 60 * 1000, // 1 hour
    retry: false,
    
  });

export default useAuth;
