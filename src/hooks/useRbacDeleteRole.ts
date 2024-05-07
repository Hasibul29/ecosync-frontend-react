import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useRbacDeleteRole = (
  roleId: string,
  onOpenChange: (open: boolean) => void,
  redirect?: boolean
) => {
  const apiClient = new APIClient(`rbac/roles/${roleId}`);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<FetchResponse, AxiosError<FetchResponse>>({
    mutationFn: apiClient.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      onOpenChange(false);
      toast.success(data.message);
      if (redirect) {
        navigate(-1);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
  });
};

export default useRbacDeleteRole;
