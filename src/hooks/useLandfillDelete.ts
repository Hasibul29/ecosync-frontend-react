import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";
// import { toast } from "sonner";

const useLandfillDelete = (id: string, onOpenChange: (open: boolean) => void) => {
  const apiClient = new APIClient(`/landfill/${id}`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landfill"]});
      onOpenChange(false);
      // toast.success("Landfill deleted successfully");
    },
  });
};

export default useLandfillDelete;
