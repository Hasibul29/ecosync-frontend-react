import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { User } from "@/store";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useProfileUpdate = (userId: string) => {
  const apiClient = new APIClient<User, User>(`/profile/${userId}`);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<User>, AxiosError<FetchResponse<User>>, User>({
    mutationFn: apiClient.put,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },

  });
};

export default useProfileUpdate;
