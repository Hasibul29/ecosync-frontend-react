import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosError } from "axios";

const apiClient = new APIClient<StatsInterface>("/stats");

export interface StatsInterface {
    totalVehicle: number
    totalSts: number
    totalLandfill: number
    totalUser: number
    totalGurbadgeCollected: number
    totalGurbadgeDisposed: number
    landfill: LandfillData[]
    sts: StsData[]
  }
  
  export interface LandfillData {
    name: string;
    capacity: number;
    latitude: number
    longitude: number
  }
  
  export interface StsData{
    name: string;
    capacity: number;
    latitude: number;
    longitude: number;
  }
  

const useStats = () =>
  useQuery<FetchResponse<StatsInterface>, AxiosError<FetchResponse<StatsInterface>>>({
    queryKey: ["stats"],
    queryFn: apiClient.get,
    staleTime: 2 * 60 * 1000, // 2min
  });

export default useStats;
