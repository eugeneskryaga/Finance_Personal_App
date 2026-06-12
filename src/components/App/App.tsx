import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { DashboardPage } from "../../pages/DashboardPage";
import { StatsPage } from "../../pages/StatsPage";
import { Notification } from "../Notification/Notification";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { PublicRoute } from "../PublicRoute/PublicRoute";
import { Register } from "../../pages/RegisterPage";
import { Login } from "../../pages/LoginPage";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <PrivateRoute>
              <StatsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute restricted>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute restricted>
              <Login />
            </PublicRoute>
          }
        />
      </Route>
      <Route
        path="*"
        element={<Notification message="Page not found" />}
      />
    </Routes>
  );
};
