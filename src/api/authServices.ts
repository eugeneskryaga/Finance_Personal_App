import type { AuthData, User } from "../types/auth";
import { api, type RefreshResponce } from "./api";

export const registerUser = async (authData: AuthData) => {
  const { data } = await api.post<User>("/auth/sign-up", authData);
  return data;
};

export const loginUser = async (authData: AuthData) => {
  const { data } = await api.post<User>("/auth/sign-in", authData);
  return data;
};

export const logoutUser = async () => {
  await api.post("/auth/logout");
};

export const getCurrentUser = async () => {
  const { data } = await api.get<User>("/users/current");
  return data;
};

export const refreshSession = async () => {
  const { data } = await api.post<RefreshResponce>("/auth/refresh");
  return data.success;
};
