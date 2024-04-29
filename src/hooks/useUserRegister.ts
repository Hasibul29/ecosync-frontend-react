import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { User } from "@/store";

const apiClient = new APIClient<User, User>("/users");

const useUserRegister = (onOpenChange: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<User>, Error, User>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
      onOpenChange(false);
    },
  });
};

export default useUserRegister;
