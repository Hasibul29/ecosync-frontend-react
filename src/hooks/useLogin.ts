import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { useNavigate } from "react-router-dom";
import useUserStore, { User } from "@/store";

const apiClient = new APIClient<User, Credentials>("/auth/login");

export interface Credentials {
  email: string;
  password: string;
}
const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  return useMutation<FetchResponse<User>, Error, Credentials>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      navigate("/dashboard");
      const out = data.data;
      setUser(out as User);
    },
  });
};

export default useLogin;
