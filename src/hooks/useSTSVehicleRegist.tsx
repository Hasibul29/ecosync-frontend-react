import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<undefined, STSvehicle>("/sts/vehicle");

interface STSvehicle {
  stsId: string;
  vehicleId: string;
}

const useSTSVehicleRegist = (
  stsId: string,
  onOpenChange: (open: boolean) => void
) => {
  const queryClient = useQueryClient();
  return useMutation<FetchResponse, Error, STSvehicle>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sts", stsId, "vehicle"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["vehicles", "1"],
        exact: true,
      });
      onOpenChange(false);
    },
  });
};

export default useSTSVehicleRegist;
