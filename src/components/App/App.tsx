import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { DashboardPage } from "../../pages/DashboardPage";
import { ViewPage } from "../../pages/ViewPage";
import { StatsPage } from "../../pages/StatsPage";
import { Notification } from "../Notification/Notification";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<DashboardPage />}
        />
        <Route
          path="/view"
          element={<ViewPage />}
        />
        <Route
          path="/stats"
          element={<StatsPage />}
        />
        <Route
          path="*"
          element={<Notification message="Page not found" />}
        />
      </Route>
    </Routes>
  );
};
