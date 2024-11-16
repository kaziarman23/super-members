import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import { userLogout } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Navber = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.userSlice);

  const handleLogout = () => {
    signOut(auth);
    dispatch(userLogout());
  };

  const navlinks = (
    <>
      <NavLink to="/">
        <li className="p-2 font-bold text-2xl">Members</li>
      </NavLink>
      <NavLink to="/addHero">
        <li className="p-2 font-bold text-2xl">Add-Hero</li>
      </NavLink>
      {email ? (
        <>
          <NavLink to="#">
            <li onClick={handleLogout} className="p-2 font-bold text-2xl">
              Logout
            </li>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">
            <li className="p-2 font-bold text-2xl">Login</li>
          </NavLink>
          <NavLink to="/register">
            <li className="p-2 font-bold text-2xl">Register</li>
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="navbar border-b-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navlinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl font-bold">Super-Members</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlinks}</ul>
      </div>
      <div className="navbar-end">
        <button
          onClick={() => window.location.reload()}
          className="btn font-bold"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default Navber;
