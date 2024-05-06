import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Landfill } from "./useLandfill";
import { toast } from "sonner";

const useLandfillUpdate = (id: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient<Landfill, Landfill>(`/landfill/${id}`);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<Landfill>, Error, Landfill>({
    mutationFn: apiClient.put,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["landfill"]});
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useLandfillUpdate;
