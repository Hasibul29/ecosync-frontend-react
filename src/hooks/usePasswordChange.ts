import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface ResetPassword {
  newPassword: string;
  confirmPassword: string;
}

const usePasswordChange = (userId : string) => {
  const apiClient = new APIClient<any, ResetPassword>("/auth/change-password/" + userId);
  return useMutation<FetchResponse, AxiosError<FetchResponse>, ResetPassword>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
  });
};

export default usePasswordChange;
