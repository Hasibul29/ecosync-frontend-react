import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { User } from "@/store";
import { AxiosError } from "axios";
import { toast } from "sonner";

const apiClient = new APIClient<User, User>("/users");

const useUserUpdate = (onOpenChange: (open:boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<User>, AxiosError<FetchResponse<User>>, User>({
    mutationFn: apiClient.put,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users']});
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUserUpdate;
