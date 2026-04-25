import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { DashboardPage } from "../../pages/DashboardPage";
import { ViewPage } from "../../pages/ViewPage";
import { StatsPage } from "../../pages/StatsPage";

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
        ></Route>
        <Route
          path="/view"
          element={<ViewPage />}
        ></Route>
        <Route
          path="/stats"
          element={<StatsPage />}
        ></Route>
      </Route>
    </Routes>
  );
};
