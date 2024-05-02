import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { User } from "@/store";

const useProfileUpdate = (userId: string) => {
  const apiClient = new APIClient<User, User>(`/profile/${userId}`);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<User>, Error, User>({
    mutationFn: apiClient.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export default useProfileUpdate;
