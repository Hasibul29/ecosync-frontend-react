import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { User } from "@/store";

const apiClient = new APIClient<User, User>("/users");

const useUserRegister = () => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<User>, Error, User>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  });
};

export default useUserRegister;
