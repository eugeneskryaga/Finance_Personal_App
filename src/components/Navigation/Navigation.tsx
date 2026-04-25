import { NavLink } from "react-router";

export const Navigation = () => {
  return (
    <nav>
      <ul>
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
