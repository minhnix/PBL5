import React from "react";
import { Forbidden, HeaderUser } from "../components";
import { Outlet } from "react-router-dom";
import { useCheckLogin } from "../utils/checkLogin";

const UserAuthLayout = () => {
  const [isLogin, role, token, user] = useCheckLogin();
  return (
    <div className="w-full h-full">
      <HeaderUser />
      <div className="pt-[60px] w-full h-full px-12 pb-12 bg-[#f0f0f0]">
        {isLogin ? (
          <Outlet />
        ) : (
          <div className="mt-8">
            <Forbidden
              title="You are not logged in..."
              text="Please log in to access this page."
              navigate={"/sign-in"}
              nameButton="Log in"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAuthLayout;
