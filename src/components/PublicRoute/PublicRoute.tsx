import type { ReactNode } from "react";
import { selectIsAuth, useAuthStore } from "../../stores/authStore";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
  restricted?: boolean;
}

export const PublicRoute = ({
  children,
  restricted = false,
}: PublicRouteProps) => {
  const isAuth = useAuthStore(selectIsAuth);
  const shouldRedirect = isAuth && restricted;

  return shouldRedirect ? <Navigate to="/" /> : children;
};
