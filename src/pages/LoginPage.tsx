import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authServices";
import { AuthForm } from "../components/AuthForm/AuthForm";
import { selectSetUser, useAuthStore } from "../stores/authStore";
import type { AuthData } from "../types/auth";

export const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore(selectSetUser);

  const login = async (authData: AuthData) => {
    const user = await loginUser(authData);
    setUser(user);
    navigate("/");
  };

  return (
    <>
      <AuthForm onSubmit={login} />
    </>
  );
};
