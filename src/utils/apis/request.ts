import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    access_key: process.env.REACT_APP_ACCESS_KEY,
  },
  timeout: 30000,
});

const weatherRequest = (
  config: AxiosRequestConfig,
  hardRefresh: boolean = false
): AxiosPromise => {
  return axiosInstance({
    ...config,
    headers: { ...config.headers, fresh: `${hardRefresh}` },
  });
};

export default weatherRequest;
