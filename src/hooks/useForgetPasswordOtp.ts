import { useMutation} from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<any,ForgetPasswordOtp>("/auth/reset-password/confirm");

interface ForgetPasswordOtp {
    otp: string;
    email: string;
    step:string
}

const useForgetPasswordOtp = () =>
  useMutation<FetchResponse, Error, ForgetPasswordOtp>({
    mutationFn: apiClient.post,
  });

export default useForgetPasswordOtp;
