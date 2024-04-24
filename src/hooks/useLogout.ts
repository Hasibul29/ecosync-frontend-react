import { useNavigate } from "react-router-dom";
import APIClient from "../services/api-client";
import { useMutation } from "@tanstack/react-query";

const apiClient = new APIClient<null, null>("/auth/logout");

const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: apiClient.post,
    onSuccess: () => navigate("/"),
  });
};

export default useLogout;
