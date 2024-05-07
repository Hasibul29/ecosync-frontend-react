import { useMutation, useQueryClient} from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useSTSFleetVehicleDelete = (stsId: string, vehicleNumber: string, onOpenChange: (open: boolean) => void) => {
 const apiClient = new APIClient(`/sts/${stsId}/todays-fleet/${vehicleNumber}`);
 const queryClient = useQueryClient();
  return useMutation<FetchResponse, AxiosError<FetchResponse>>({
    mutationFn: apiClient.delete,
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["sts", "manager" ,stsId ,"todays-fleet"]});
        queryClient.invalidateQueries({ queryKey: ["sts", "manager" ,stsId ,"vehicle"]});
        onOpenChange(false);
        toast.success(data.message);
    },
    onError: (error) => {
        toast.error(error.response?.data.message);
    }
  });
};

export default useSTSFleetVehicleDelete;
