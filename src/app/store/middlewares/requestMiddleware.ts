import { Middleware } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import { RootState } from "../reducers";
import { axiosInstance } from "../../../utils/apis/request";
import CacheRequest from "../../../utils/cacheRequest";

export const weatherRequestCache = new CacheRequest("cache-api");

export const requestMiddleWare: Middleware =
  ({ dispatch, getState }: { dispatch: any; getState: () => RootState }) =>
  (next) =>
  (action) => {
    // pass the action down the middleware pipeline
    next(action);

    const requestConfiguration = (config: AxiosRequestConfig) => {
      const cacheUrl = `${config.url}:${JSON.stringify(config.params)}`;
      if (
        weatherRequestCache.getData(cacheUrl) &&
        config.headers?.fresh === "false"
      ) {
        const response = weatherRequestCache.getData(cacheUrl);
        response.headers.isCached = "true";
        return Promise.reject(response);
      }
      delete config.headers?.fresh;
      return config;
    };

    const responseErrorHandler = (error: any) => {
      if (error.headers?.isCached === "true") {
        // use cached
        return Promise.resolve(error);
      }

      if (!error.response) {
        error.response = {
          message: "Network Error, Please check your connection.",
          status: 0,
        };
      }

      switch (error.code) {
        case "ECONNABORTED":
          error.response = {
            message: "Server connection timed out.",
            status: 408,
          };
          break;
        case 'ERR_NETWORK_CHANGED':
          error.response = {
            message: "Network Error, please check your network.",
            status: 408,
          };
          break;
        default:
          break;
      }

      return Promise.reject(error);
    };

    axiosInstance.interceptors?.request?.use(requestConfiguration, (error) => {
      // Do something with request error
      return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use((response) => {
      const checkErr: any = response.data;
      if (checkErr.hasOwnProperty("success") && !checkErr.success) {
        return Promise.reject(response.data.error);
      }

      const cacheUrl = `${response.config.url}:${JSON.stringify(
        response.config.params
      )}`;

      if (!weatherRequestCache.getData(cacheUrl)) {
        weatherRequestCache.setData(response);
      }
      return response;
    }, responseErrorHandler);
  };
