import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { useNavigate } from "react-router-dom";

const apiClient = new APIClient<null, Credentials>("/auth/login");

export interface Credentials {
  email: string;
  password: string;
}
const useLogin = () => {
  const navigate = useNavigate();
  return useMutation<FetchResponse<null>, Error, Credentials>({
    mutationFn: apiClient.post,
    onSuccess: () => navigate("/dashboard"),
  });
};

export default useLogin;
