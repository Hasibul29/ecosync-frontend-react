import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  success: boolean;
  message: string;
  data?: T[];
}

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
});

class APIClient<T, V> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = async (config?: AxiosRequestConfig) => {
    const res = await axiosInstance.get<FetchResponse<T>>(
      this.endpoint,
      config
    );
    return res.data;
  };

  post = async (data?: V | AxiosRequestConfig) => {
    const res = await axiosInstance.post<FetchResponse<T>>(this.endpoint, data);
    return res.data;
  };
}

export default APIClient;
