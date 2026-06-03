import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import { Header } from "../Header/Header";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactionsApi";

import css from "./Layout.module.css";
import { useEffect, useState } from "react";
import { Notification } from "../Notification/Notification";

export const Layout = () => {
  const [isWakeupMessage, setIsWakeupMessage] = useState(false);

  const { isPending } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isPending) {
      timer = setTimeout(() => {
        setIsWakeupMessage(true);
      }, 3000);
    } else setIsWakeupMessage(false);

    return () => clearTimeout(timer);
  }, [isPending]);

  return (
    <div className={css.app}>
      <header className={css.header}>
        <Header />
      </header>
      {isWakeupMessage ? (
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
