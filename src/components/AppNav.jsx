import { NavLink } from "react-router-dom";

export default function AppNav() {
  return (
    <ul className="join join-horizontal">
      <li>
        <NavLink to="cities">
          <button className="btn btn-sm hover:btn-secondary active:btn-secondary focus:btn-secondary join-item">
            Cities
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink to="countries">
          <button className="btn btn-sm hover:btn-secondary active:btn-secondary focus:btn-secondary join-item">
            Countries
          </button>
        </NavLink>
      </li>
    </ul>
  );
}
