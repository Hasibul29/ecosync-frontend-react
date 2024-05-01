import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Landfill } from "./useLandfill";

const apiClient = new APIClient<Landfill, Landfill>("/landfill");

const useLandfillRegist = (onOpenChange: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<Landfill>, Error, Landfill>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landfill"]});
      onOpenChange(false);
    },
  });
};

export default useLandfillRegist;
