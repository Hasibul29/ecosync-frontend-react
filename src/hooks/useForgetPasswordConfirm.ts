import { useMutation} from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<any,ForgetPasswordOtp>("/auth/reset-password/confirm");

interface ForgetPasswordOtp {
    newPassword: string;
    confirmPassword: string;
    email: string;
    step:string
}

const useForgetPasswordConfirm = () =>
  useMutation<FetchResponse, Error, ForgetPasswordOtp>({
    mutationFn: apiClient.post,
  });

export default useForgetPasswordConfirm;
