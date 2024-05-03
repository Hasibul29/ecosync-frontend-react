import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

interface ResetPassword {
  newPassword: string;
  confirmPassword: string;
}

const usePasswordChange = (userId : string) => {
  const apiClient = new APIClient<any, ResetPassword>("/auth/change-password/" + userId);
  return useMutation<FetchResponse, Error, ResetPassword>({
    mutationFn: apiClient.post,
  });
};

export default usePasswordChange;
