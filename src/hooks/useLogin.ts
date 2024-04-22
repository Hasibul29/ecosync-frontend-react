import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<null, Credentials>("/auth/login");

export interface Credentials {
  email: string;
  password: string;
}
const useLogin = () =>
  useMutation<FetchResponse<null>, Error, Credentials>({
    mutationFn: apiClient.post,
  });

export default useLogin;
