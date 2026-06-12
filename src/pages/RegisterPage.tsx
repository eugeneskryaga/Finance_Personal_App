import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authServices";
import { AuthForm } from "../components/AuthForm/AuthForm";
import { selectSetUser, useAuthStore } from "../stores/authStore";
import type { AuthData } from "../types/auth";

export const Register = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore(selectSetUser);

  const register = async (authData: AuthData) => {
    const user = await registerUser(authData);
    setUser(user);
    navigate("/");
  };

  return (
    <>
      <AuthForm onSubmit={register} />
    </>
  );
};
