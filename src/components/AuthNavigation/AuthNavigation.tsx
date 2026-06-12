import { NavLink } from "react-router-dom";

import css from "../Navigation/Navigation.module.css";

export const AuthNavigation = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <ul className={css.nav_list}>
      <li>
        <NavLink
          to="/register"
          className={getLinkClass}
        >
          Register
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/login"
          className={getLinkClass}
        >
          Login
        </NavLink>
      </li>
    </ul>
  );
};
