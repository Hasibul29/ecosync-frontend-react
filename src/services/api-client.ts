import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  success: boolean;
  message: string;
  data?: T[];
}

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

class APIClient<T, V> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  post = (data: V | AxiosRequestConfig) => {
    return axiosInstance
      .post<FetchResponse<T>>(this.endpoint, data)
      .then((res) => res.data);
  };
}

export default APIClient;
