import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { STS } from "./useSTS";

const useSTSUpdate = (id: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient<STS, STS>(`/sts/${id}`);
  const queryClient = useQueryClient();
  return useMutation<FetchResponse<STS>, Error, STS>({
    mutationFn: apiClient.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sts"], exact: true });
      onOpenChange(false);
    },
  });
};

export default useSTSUpdate;
