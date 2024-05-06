import { useMutation} from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { toast } from "sonner";
import { AxiosError } from "axios";

const apiClient = new APIClient<any,ForgetPasswordOtp>("/auth/reset-password/confirm");

interface ForgetPasswordOtp {
    otp: string;
    email: string;
    step:string
}

const useForgetPasswordOtp = () =>
  useMutation<FetchResponse, AxiosError<FetchResponse>, ForgetPasswordOtp>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    } 
  });

export default useForgetPasswordOtp;
