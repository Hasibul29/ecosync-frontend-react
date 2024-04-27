import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { User } from "@/store";

const apiClient = new APIClient<User, User>("/users");

const useUserUpdate = (onOpenChange: (open:boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<User>, Error, User>({
    mutationFn: apiClient.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      onOpenChange(false);
    },
  });
};

export default useUserUpdate;
