import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

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
  return useMutation<FetchResponse, AxiosError<FetchResponse>, STSvehicle>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["sts", stsId, "vehicle"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["vehicles", "sts"],
        exact: true,
      });
      onOpenChange(false);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useSTSVehicleRegist;
