/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Bottombar, LeftSidebar, Topbar } from "../components";

const RootLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="w-full flex flex-row">
            <LeftSidebar />
            <section className="h-full flex-1">
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
