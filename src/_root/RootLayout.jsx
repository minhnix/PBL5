/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Bottombar, LeftSidebar, Topbar } from "../components";
import { useCheckLogin } from "../utils/checkLogin";

const RootLayout = () => {
  const [isLogin, user] = useCheckLogin();

  return (
    <>
      {isLogin ? (
        <>
          <div className="w-full flex flex-row">
            <LeftSidebar />
            <section className="h-full flex-1 ">
              <Topbar />
              <div className="px-6 pb-6 pt-[88px] h-full bg-[#f0f0f0] -translate-y-16">
                <Outlet />
              </div>
            </section>

            {/* <Bottombar /> */}
          </div>
        </>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </>
  );
};

export default RootLayout;
