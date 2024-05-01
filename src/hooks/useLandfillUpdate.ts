import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Landfill } from "./useLandfill";

const useLandfillUpdate = (id: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient<Landfill, Landfill>(`/landfill/${id}`);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<Landfill>, Error, Landfill>({
    mutationFn: apiClient.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landfill"]});
      onOpenChange(false);
    },
  });
};

export default useLandfillUpdate;
