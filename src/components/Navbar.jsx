import {NavLink} from 'react-router-dom'
import {Logo} from './index'
import SwitchTheme from './SwitchTHeme';

export default function Navbar() {
  return (
    <nav className="navbar navbar-start w-full flex justify-between bg-base-300 rounded-md shadow-xl">
      <div className="flex justify-center w-1/3 ml-4 text-primary ">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <ul className=" font-semibold text-secondary mr-8 mx-4">
        <span className="mx-20">
          <SwitchTheme />
        </span>
        <li className=" focus:border-b-4 border-secondary outline-0  active:border-b-2 hover:border-b-2 m-1 ">
          <NavLink to="/product">Products</NavLink>
        </li>
        <li className="focus:border-b-4 mx-4 border-secondary outline-0  active:border-b-2 hover:border-b-2 m-1 ">
          <NavLink to="/pricing">pricing</NavLink>
        </li>
        <li className=" ml-8 btn btn-sm btn-secondary active:btn-secondary hover:btn-secondary m-1 ">
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}
