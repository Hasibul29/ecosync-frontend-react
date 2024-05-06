import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { STSEntry } from "./useSTSEntry";
import { AxiosError } from "axios";
import { toast } from "sonner";


interface STSEntryRegister extends STSEntry {
  vehicleNumber: string;
}


const useSTSEntryRegist = (userId: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient<STSEntry, STSEntryRegister>("/sts/entry/" + userId);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<STSEntry>, AxiosError<FetchResponse<STSEntry>>, STSEntryRegister>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sts", "entry"] });
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
  });
};

export default useSTSEntryRegist;
