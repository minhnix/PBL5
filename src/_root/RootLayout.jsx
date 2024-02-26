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
          <div className="w-full md:flex">
            <Topbar />
            <LeftSidebar />

            <section className="flex flex-1 h-full">
              <Outlet />
            </section>

            <Bottombar />
          </div>
        </>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </>
  );
};

export default RootLayout;
