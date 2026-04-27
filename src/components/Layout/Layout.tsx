import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import { Header } from "../Header/Header";

import css from "./Layout.module.css";

export const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <Header />
      </header>
      <main className={css.main}>
        <Outlet />
      </main>
      <footer>
        <Navigation />
      </footer>
    </>
  );
};
