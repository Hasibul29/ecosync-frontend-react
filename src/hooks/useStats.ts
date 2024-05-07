import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

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
  useQuery<FetchResponse<StatsInterface>, Error>({
    queryKey: ["stats"],
    queryFn: apiClient.get,
    staleTime: 24 * 60 * 60 * 1000, // 1 hour
  });

export default useStats;
