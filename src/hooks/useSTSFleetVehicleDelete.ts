import { useMutation, useQueryClient} from "@tanstack/react-query";
import APIClient from "../services/api-client";

const useSTSFleetVehicleDelete = (stsId: string, vehicleNumber: string, onOpenChange: (open: boolean) => void) => {
 const apiClient = new APIClient(`/sts/${stsId}/todays-fleet/${vehicleNumber}`);
 const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiClient.delete,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sts", "manager" ,stsId ,"todays-fleet"]});
        queryClient.invalidateQueries({ queryKey: ["sts", "manager" ,stsId ,"vehicle"]});
        onOpenChange(false);
      },
  });
};

export default useSTSFleetVehicleDelete;
