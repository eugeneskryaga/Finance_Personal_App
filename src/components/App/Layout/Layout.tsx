import { Outlet } from "react-router-dom";
import { Navigation } from "../../Navigation/Navigation";

export const Layout = () => {
  return (
    <>
      <header>HEADER</header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Navigation />
      </footer>
    </>
  );
};
