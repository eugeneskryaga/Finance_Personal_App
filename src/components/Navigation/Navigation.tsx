import { NavLink } from "react-router";

import css from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav>
      <ul className={css.ul}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? css.activeLink : css.link)}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/view"
            className={({ isActive }) => (isActive ? css.activeLink : css.link)}
          >
            View
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stats"
            className={({ isActive }) => (isActive ? css.activeLink : css.link)}
          >
            Statistics
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
