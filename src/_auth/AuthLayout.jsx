/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCheckLogin } from "../utils/checkLogin";

const AuthLayout = () => {
  const [isLogin, role, user] = useCheckLogin();

  return (
    <>
      {isLogin ? (
        role == "user" ? (
          <Navigate to="/" />
        ) : (
          <Navigate to="/admin" />
        )
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
