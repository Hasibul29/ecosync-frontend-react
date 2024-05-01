import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { User } from "@/store";

const apiClient = new APIClient<User[]>("/users");

const useUsers = (filter?: string) =>
  useQuery<FetchResponse<User[]>, Error>({
    queryKey: filter? ["users", filter]: ["users"],
    queryFn: () =>
      apiClient.get({
        params: {
          filter: filter,
        },
      }),
    staleTime: 24 * 60 * 60 * 1000, // 1 hour
  });

export default useUsers;
