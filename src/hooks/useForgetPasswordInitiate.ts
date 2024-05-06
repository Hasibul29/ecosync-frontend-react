import { useMutation} from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

const apiClient = new APIClient<any,ForgetPasswordInitiate>("/auth/reset-password/initiate");

interface ForgetPasswordInitiate {
    email: string;
}

const useForgetPasswordInitiate = () =>
  useMutation<FetchResponse, AxiosError<FetchResponse>, ForgetPasswordInitiate>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
  });


export default useForgetPasswordInitiate;
