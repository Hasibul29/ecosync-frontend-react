import { useMutation, useQueryClient} from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { SuggestedVehicle } from "./useSTSVehicleSelecton";
import { STSSelectedFleet } from "./useSTSSelectedFleet";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface AddVehicleInterface {
    vehicles: SuggestedVehicle[]
}


const useSTSFleetAddVehicle = (stsId: string) => {
 const apiClient = new APIClient<STSSelectedFleet,AddVehicleInterface>(`/sts/${stsId}/todays-fleet`);
 const queryClient = useQueryClient();
  return useMutation<FetchResponse<STSSelectedFleet>, AxiosError<FetchResponse<STSSelectedFleet>>, AddVehicleInterface>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["sts", "manager" ,stsId ,"todays-fleet"]});
        queryClient.invalidateQueries({ queryKey: ["sts", "manager" ,stsId ,"vehicle"]});
        toast.success(data.message);
      },
    onError: (error) => {
        toast.error(error.response?.data.message);
      }
  });
};

export default useSTSFleetAddVehicle;
