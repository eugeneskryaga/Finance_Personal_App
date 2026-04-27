import { NavLink } from "react-router";

import css from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav>
      <ul className={css.ul}>
        <li>
          <NavLink to="/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/view">View</NavLink>
        </li>
        <li>
          <NavLink to="/stats">Statistics</NavLink>
        </li>
      </ul>
    </nav>
  );
};
