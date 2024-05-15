import React from "react";
import HeaderUser from "../components/shared/HeaderUser";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="w-full h-full">
      <HeaderUser />
      <div className="pt-[60px] w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
