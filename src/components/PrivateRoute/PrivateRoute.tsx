import type { ReactNode } from "react";
import { selectIsAuth, useAuthStore } from "../../stores/authStore";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuth = useAuthStore(selectIsAuth);
  return isAuth ? children : <Navigate to="/login" />;
};
