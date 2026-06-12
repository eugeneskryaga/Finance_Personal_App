import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authServices";
import { selectClearUser, useAuthStore } from "../../stores/authStore";

export const UserMenu = () => {
  const clearAuth = useAuthStore(selectClearUser);
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUser();
    clearAuth();
    navigate("/login");
  };

  return <button onClick={logout}>Logout</button>;
};
