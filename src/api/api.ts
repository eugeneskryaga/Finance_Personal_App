import axios, { type AxiosResponse } from "axios";

const BASE_URL = "https://finance-app-server-gt1n.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export interface RefreshResponce {
  message: string;
  success: boolean;
}

let refreshPromise: Promise<AxiosResponse<RefreshResponce>> | null = null;

api.interceptors.response.use(
  res => res,
  async error => {
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (!refreshPromise) {
      refreshPromise = api
        .post("/auth/refresh")
        .finally(() => (refreshPromise = null));
    }

    try {
      await refreshPromise;
      return api(originalRequest);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
