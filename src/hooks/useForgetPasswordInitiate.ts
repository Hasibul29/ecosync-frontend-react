import { useMutation} from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<any,ForgetPasswordInitiate>("/auth/reset-password/initiate");

interface ForgetPasswordInitiate {
    email: string;
}

const useForgetPasswordInitiate = () =>
  useMutation<FetchResponse, Error, ForgetPasswordInitiate>({
    mutationFn: apiClient.post,
  });

export default useForgetPasswordInitiate;
