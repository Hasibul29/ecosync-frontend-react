import { useMutation, useQueryClient} from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { SuggestedVehicle } from "./useSTSVehicleSelecton";
import { STSSelectedFleet } from "./useSTSSelectedFleet";

interface AddVehicleInterface {
    vehicles: SuggestedVehicle[]
}


const useSTSFleetAddVehicle = (stsId: string) => {
 const apiClient = new APIClient<STSSelectedFleet,AddVehicleInterface>(`/sts/${stsId}/todays-fleet`);
 const queryClient = useQueryClient();
  return useMutation<FetchResponse<STSSelectedFleet>, Error, AddVehicleInterface>({
    mutationFn: apiClient.post,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sts", "manager" ,stsId ,"todays-fleet"]});
        queryClient.invalidateQueries({ queryKey: ["sts", "manager" ,stsId ,"vehicle"]});
      },
  });
};

export default useSTSFleetAddVehicle;
