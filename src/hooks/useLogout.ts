import { useNavigate } from "react-router-dom";
import APIClient from "../services/api-client";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@/store";
import  secureLocalStorage  from  "react-secure-storage";

const apiClient = new APIClient<null, null>("/auth/logout");

const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  return useMutation({
    mutationFn: apiClient.post,
    onSuccess: () => {
      navigate("/");
      setUser({});
      secureLocalStorage.clear();
    },
  });
};

export default useLogout;
