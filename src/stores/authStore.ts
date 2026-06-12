import type { User } from "../types/auth";
import { create } from "zustand";

interface AuthStore {
  isAuth: boolean;
  isFetchingUser: boolean;
  user: User | null;
  setIsFetching: (isFetching: boolean) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(set => ({
  isAuth: false,
  isFetchingUser: false,
  setIsFetching: isFetchingUser =>
    set(() => ({
      isFetchingUser,
    })),
  user: null,
  setUser: user =>
    set(() => ({
      user,
      isAuth: true,
    })),
  clearAuth: () =>
    set(() => ({ user: null, isAuth: false, isFetchingUser: false })),
}));

export const selectSetUser = (state: AuthStore) => state.setUser;
export const selectClearUser = (state: AuthStore) => state.clearAuth;
export const selectIsAuth = (state: AuthStore) => state.isAuth;
export const selectUser = (state: AuthStore) => state.user;
export const selectSetIsFetching = (state: AuthStore) => state.setIsFetching;
export const selectIsFetching = (state: AuthStore) => state.isFetchingUser;
