import { useMutation} from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

const apiClient = new APIClient<any,ForgetPasswordOConfirm>("/auth/reset-password/confirm");

interface ForgetPasswordOConfirm {
    newPassword: string;
    confirmPassword: string;
    email: string;
    step:string
}

const useForgetPasswordConfirm = () =>
  useMutation<FetchResponse, AxiosError<FetchResponse>, ForgetPasswordOConfirm>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }

  });

export default useForgetPasswordConfirm;
