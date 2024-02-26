/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center bg-[#f5f5f5] items-center flex-col py-10 max-sm:px-4">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
