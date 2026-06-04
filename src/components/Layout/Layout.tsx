import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import { Header } from "../Header/Header";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactionsApi";
import { Notification } from "../Notification/Notification";

import css from "./Layout.module.css";

export const Layout = () => {
  const { isLoading } = useQuery({
    queryKey: ["server-health"],
    queryFn: () => getTransactions({ perPage: 3 }),
  });

  return (
    <div className={css.app}>
      <header className={css.header}>
        <Header />
      </header>
      {isLoading ? (
        <Notification
          message="Server is running ..."
          isLoading
        />
      ) : (
        <main className={css.main}>
          <Outlet />
        </main>
      )}
      <footer className={css.footer}>
        <Navigation />
      </footer>
    </div>
  );
};
