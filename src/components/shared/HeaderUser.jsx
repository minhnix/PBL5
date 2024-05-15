import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/authSlice";
import { useCheckLogin } from "../../utils/checkLogin";

const HeaderUser = () => {
  const [isLogin, role, token, user] = useCheckLogin();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());

    navigate("/");

    window.location.reload(false);
  };

  return (
    <nav className="fixed right-0 left-0 top-0 z-50 ">
      <div className="w-full ">
        <div className="w-full antialiased bg-gray-100 border">
          <div className="w-full text-gray-700 bg-white ">
            <div className="flex flex-col w-full px-2 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
              <div className="flex flex-row items-center justify-between px-2 py-4 min-w-[200px]">
                <Link
                  to={"/"}
                  className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline"
                >
                  AutoGara
                </Link>
              </div>

              <nav className="flex-col flex-1   flex-grow hidden pb-4 md:pb-0 md:flex md:justify-center md:flex-row">
                <Link
                  to="/"
                  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                >
                  Home
                </Link>
                <Link
                  to="/user/vehicle"
                  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                >
                  Vehicle
                </Link>
                <Link
                  to="/user/history"
                  className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                >
                  History
                </Link>
              </nav>
              {user ? (
                <>
                  <div className=" relative group p-1 ml-4 flex justify-center  items-center  cursor-pointer hover:bg-gray-200 rounded min-w-[200px]">
                    {user.avatar ? (
                      <img
                        className="rounded-full border w-[30px] h-[30px]"
                        src={user.avatar}
                        alt=" "
                      />
                    ) : (
                      <img
                        className="rounded-full border w-[30px] h-[30px]"
                        src={
                          "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                        }
                        alt=" "
                      />
                    )}
                    <p className="text-gray-900 ml-2">{user.__owner__?.name ? user.__owner__.name : user.username}</p>
                    <div className="ml-2">
                      <box-icon
                        color="#374151"
                        size="xs"
                        type="solid"
                        name="down-arrow"
                      ></box-icon>
                    </div>

                    <div className="absolute w-[220px] top-[100%] right-0 hidden translate-y-[4px]  bg-white border border-gray-300 group-hover:block before:block before:absolute before:w-[103%] before:h-[6px] before:translate-y-[-6px] before:translate-x-[-2px] before:bg-transparent rounded">
                      {user.role === "admin" && (
                        <Link
                          to={`/admin`}
                          className="py-2 px-4 w-full h-full block hover:bg-gray-200 text-gray-900 "
                        >
                          Admin page
                        </Link>
                      )}
                      {user.type !== "admin" && (
                        <Link
                          to={`/user/updateInfor`}
                          className="py-2 px-4 w-full h-full block hover:bg-gray-200 text-gray-900 "
                        >
                          Update infor
                        </Link>
                      )}
                      <div
                        onClick={handleLogOut}
                        className="py-2 px-4 hover:bg-gray-200 text-gray-900"
                      >
                        Log out
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="min-w-[200px] flex flex-row">
                  <Link className="ml-4 lg:min-w-[120px]" to={"/sign-up"}>
                    <button className="block w-full h-full border font-semibold  border-neutral-800 uppercase shadow bg-white  text-[#374151] text-xs py-2 px-6 rounded hover:opacity-80">
                      Sign Up
                    </button>
                  </Link>
                  <Link className="ml-4 lg:min-w-[120px]" to={"/sign-in"}>
                    <button className="block w-full h-full font-semibold  uppercase shadow bg-neutral-800 hover:bg-neutral-700 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-6 rounded">
                      Sign In
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderUser;
