import { NavLink } from "react-router";

import css from "./Navigation.module.css";

export const Navigation = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <nav>
      <ul className={css.nav_list}>
        <li>
          <NavLink
            to="/"
            className={getLinkClass}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/view"
            className={getLinkClass}
          >
            View
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stats"
            className={getLinkClass}
          >
            Statistics
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
