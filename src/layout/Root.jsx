import { Outlet } from "react-router";
import Navber from "../pages/Navber/Navber";

const Root = () => {
  return (
    <div className="">
      <Navber />
      <Outlet />
    </div>
  );
};

export default Root;
