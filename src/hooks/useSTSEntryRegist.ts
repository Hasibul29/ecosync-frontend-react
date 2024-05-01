import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { STSEntry } from "./useSTSEntry";


interface STSEntryRegister extends STSEntry {
  vehicleNumber: string;
}


const useSTSEntryRegist = (userId: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient<STSEntry, STSEntryRegister>("/sts/entry/" + userId);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<STSEntry>, Error, STSEntryRegister>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sts", "entry"] });
      onOpenChange(false);
    },
  });
};

export default useSTSEntryRegist;
