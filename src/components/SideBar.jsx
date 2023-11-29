import {Outlet  } from "react-router-dom";
import {AppNav} from './index'
export default function SideBar() {
  return (
    <div className="flex flex-col w-1/2 m-2 rounded-xl bg-base-200  min-h-screen ">
      <div className="card lg:card-side bg-base-100 shadow-xl m-4 ">
        <div className="card-body flex justify-center items-center">
          <AppNav />
          <Outlet />
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Clear List</button>
          </div>
        </div>
      </div>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Travel-wise.inc
          </p>
        </aside>
      </footer>
    </div>
  );
}
