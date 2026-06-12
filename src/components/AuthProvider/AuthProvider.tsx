import { useEffect, type ReactNode } from "react";
import { getCurrentUser, refreshSession } from "../../api/authServices";
import {
  selectSetIsFetching,
  selectSetUser,
  useAuthStore,
} from "../../stores/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore(selectSetUser);
  const setIsFetching = useAuthStore(selectSetIsFetching);

  useEffect(() => {
    const init = async () => {
      try {
        setIsFetching(true);
        const isSuccess = await refreshSession();
        if (isSuccess) {
          const user = await getCurrentUser();
          setUser(user);
        }
      } catch {
        setIsFetching(false);
      } finally {
        setIsFetching(false);
      }
    };
    init();
  }, [setIsFetching, setUser]);
  return children;
};
