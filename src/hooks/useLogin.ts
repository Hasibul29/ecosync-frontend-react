import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { useNavigate } from "react-router-dom";
import useUserStore, { User } from "@/store";
import { toast } from "sonner";
import { AxiosError } from "axios";

const apiClient = new APIClient<User, Credentials>("/auth/login");

export interface Credentials {
  email: string;
  password: string;
}
const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  return useMutation<FetchResponse<User>, AxiosError<FetchResponse<User>>, Credentials>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      navigate("/dashboard");
      const out = data.data;
      setUser(out as User);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
  });
};

export default useLogin;
