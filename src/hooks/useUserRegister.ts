import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { User } from "@/store";
import { toast } from "sonner";
import { AxiosError } from "axios";

const apiClient = new APIClient<User, User>("/users");

const useUserRegister = (onOpenChange: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<User>, AxiosError<FetchResponse<User>>, User>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"]});
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUserRegister;
