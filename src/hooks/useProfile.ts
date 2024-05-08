import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { User } from "@/store";
import { AxiosError } from "axios";


const useProfile = (userId: string) => {
  const apiClient = new APIClient<User>(`/profile/${userId}`);
  return useQuery<FetchResponse<User>, AxiosError<FetchResponse<User>>>({
    queryKey: ["profile"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 24 hour
  });
};

export default useProfile;
