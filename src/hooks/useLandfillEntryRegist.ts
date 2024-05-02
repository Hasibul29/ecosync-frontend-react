import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { LandfillEntry } from "./useLandfillEntry";


interface LandfillEntryRegister extends LandfillEntry {
  vehicleNumber: string;
}


const useLandfillEntryRegist = (userId: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient<LandfillEntry, LandfillEntryRegister>("/landfill/entry/" + userId);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<LandfillEntry>, Error, LandfillEntryRegister>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landfill", "entry"] });
      onOpenChange(false);
    },
  });
};

export default useLandfillEntryRegist;
