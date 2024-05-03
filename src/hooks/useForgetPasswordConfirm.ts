import { useMutation} from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<any,ForgetPasswordOConfirm>("/auth/reset-password/confirm");

interface ForgetPasswordOConfirm {
    newPassword: string;
    confirmPassword: string;
    email: string;
    step:string
}

const useForgetPasswordConfirm = () =>
  useMutation<FetchResponse, Error, ForgetPasswordOConfirm>({
    mutationFn: apiClient.post,
  });

export default useForgetPasswordConfirm;
