import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { LandfillEntry } from "./useLandfillEntry";
import { AxiosError } from "axios";
import { toast } from "sonner";


interface LandfillEntryRegister extends LandfillEntry {
  vehicleNumber: string;
}


const useLandfillEntryRegist = (userId: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient<LandfillEntry, LandfillEntryRegister>("/landfill/entry/" + userId);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<LandfillEntry>, AxiosError<FetchResponse<LandfillEntry>>, LandfillEntryRegister>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["landfill", "entry"] });
      queryClient.invalidateQueries({ queryKey: ["billing"] });
      onOpenChange(false);
      toast.success(data.message);
    },
    
    onError: (error) => {
      toast.error(error.response?.data.message);
    }
  });
};

export default useLandfillEntryRegist;
