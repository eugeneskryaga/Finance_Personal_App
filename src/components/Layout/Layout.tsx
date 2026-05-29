import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import { Header } from "../Header/Header";

export const Layout = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Navigation />
      </footer>
    </>
  );
};
