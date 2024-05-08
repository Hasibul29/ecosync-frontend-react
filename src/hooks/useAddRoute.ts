import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { SuggestedVehicle } from "./useSTSVehicleSelecton";

export interface LocationLatLng {
latitude: number;
longitude: number;
}

interface RouteRegist {
    totalDistance: number;
    totalTime: number;
    landfillId: string;
    stsId: string;
    wayPoints: {
        origin: LocationLatLng;
        destination: LocationLatLng;
    };
    vehicleList: SuggestedVehicle[];
    routeList: LocationLatLng[];
}


const apiClient = new APIClient<RouteRegist, RouteRegist>("/map");

const useAddRoute = () => {
  return useMutation<FetchResponse<RouteRegist>, AxiosError<FetchResponse<RouteRegist>>, RouteRegist>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useAddRoute;
