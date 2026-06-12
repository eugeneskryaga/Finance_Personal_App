import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import { Header } from "../Header/Header";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../api/transactionsApi";
import { Notification } from "../Notification/Notification";

import css from "./Layout.module.css";
import {
  selectIsAuth,
  selectIsFetching,
  useAuthStore,
} from "../../stores/authStore";
import { UserMenu } from "../UserMenu/UserMenu";
import { AuthNavigation } from "../AuthNavigation/AuthNavigation";

export const Layout = () => {
  const { isLoading } = useQuery({
    queryKey: ["server-health"],
    queryFn: () => getTransactions({ perPage: 3 }),
  });

  const isAuth = useAuthStore(selectIsAuth);
  const isFetching = useAuthStore(selectIsFetching);

  return (
    <div className={css.app}>
      <header className={css.header}>
        <div className={css.container}>
          <Header />
          {isAuth && <UserMenu />}
        </div>
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
        {!isFetching && (isAuth ? <Navigation /> : <AuthNavigation />)}
      </footer>
    </div>
  );
};
