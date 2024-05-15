import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { loginSuccess, updateSuccess } from "../../redux/authSlice";
import { useCheckLogin } from "../../utils/checkLogin";
import { Forbidden } from "../../components";

const UpdateInfor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, role, token, user] = useCheckLogin();

  const [responseError, setResponseError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [nameError, setNameError] = useState("");

  const [account, setAccount] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  function handleValidate() {
    let validate = true;
    if (!account.name.length || !account.name.trim().length) {
      validate = false;
      setNameError("Name can not be empty");
    }
    if (!account.address.length || !account.address.trim().length) {
      validate = false;
      setAddressError("Address can not be empty");
    }

    const reg = RegExp("^[0-9]+$");
    if (
      !reg.test(account.phone) ||
      !(account.phone.length <= 11 && account.phone.length > 9)
    ) {
      validate = false;
      setPhoneError("Phone invalid");
    }

    if (!validateEmail(account.email)) {
      validate = false;
      setEmailError("Email invalid");
    }
    // console.log(error)
    // console.log(account)
    return validate;
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  useEffect(() => {
    axios.get(`http://localhost:3000/api/users/${user.id}`).then((response) => {
      if (response.data.data.user.__owner__) {
        setAccount(response.data.data.user.__owner__);
      }
    //   console.log(response.data.data.user.__owner__);
    });
  }, []);
  function handleChangeInput(e) {
    setResponseError("");
    setResponseMessage("");
    e.target.name == "name" && setNameError("");
    e.target.name == "address" && setAddressError("");
    e.target.name == "phone" && setPhoneError("");
    e.target.name == "email" && setEmailError("");
    setAccount({ ...account, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(account);
    let validate = handleValidate();
    if (!validate) return;
    axios
      .post(`http://localhost:3000/api/users/${user.id}`, { ...account })
      .then((response) => {
        // setPost(response.data);
        console.log(response.data.data.user);
        setResponseMessage("Update user successfully");
        dispatch(
          updateSuccess({
            user: response.data.data.user,
          })
        );
      
        
      })
      .catch(function (err) {
        setResponseError(err.response.data.message);
      });
  }
  return (
    <>
      {role === "admin" ? (
        <>
          <div className="w-full flex flex-row">
            <Forbidden
              title="We are sorry..."
              text="The page you're trying to access has restricted access."
              navigate={"/"}
              nameButton="Go Back"
            />
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="p-8 pb-0">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center"
            >
              <div className="bg-[white] w-full max-w-[400px] p-8 rounded-md">
                <span className="block w-full mt-3 mb-3 text-[#4096ff] text-[24px] font-bold  text-center">
                  Update Information
                </span>
                <div className="mb-6 flex justify-center items-center">
                  <span
                    className={`${
                      responseError ? "visible" : "invisible"
                    } text-sm text-error-color`}
                  >
                    {responseError ? responseError : "."}
                  </span>
                  <span
                    className={`${
                      responseMessage ? "visible" : "invisible"
                    } text-sm text-success-color`}
                  >
                    {responseMessage ? responseMessage : "."}
                  </span>
                </div>
                <div className="w-full flex flex-col">
                  <label className="text-[14px] text-black pb-2" htmlFor="">
                    Name
                  </label>
                  <input
                    className={`bg-white w-full px-[11px] py-[7px] rounded border  transition-all  outline-none ${
                      nameError
                        ? "focus:border-border-error-color border-border-error-color"
                        : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
                    }`}
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChangeInput}
                    value={account.name}
                  />
                  <span
                    className={`${
                      nameError ? "visible" : "invisible"
                    } text-sm text-error-color`}
                  >
                    {nameError}.
                  </span>
                </div>
                <div className="w-full flex flex-col ">
                  <label className="text-[14px] text-black pb-2" htmlFor="">
                    Phone
                  </label>
                  <div>
                    <input
                      className={`bg-white w-full px-[11px] py-[7px] rounded border transition-all  outline-none ${
                        phoneError
                          ? "focus:border-border-error-color border-border-error-color"
                          : "focus:border-[#1677ff]  border-[#d9d9d9]  hover:border-[#1677ff] "
                      }`}
                      // type={`${showPassWord ? "text" : "password"}`}
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      onChange={handleChangeInput}
                      value={account.phone}
                    />
                  </div>
                  <span
                    className={`${
                      phoneError ? "visible" : "invisible"
                    } text-sm text-error-color`}
                  >
                    {phoneError}.
                  </span>
                </div>
                <div className="w-full flex flex-col ">
                  <label className="text-[14px] text-black pb-2" htmlFor="">
                    Email
                  </label>
                  <div>
                    <input
                      className={`bg-white w-full px-[11px] py-[7px] rounded border transition-all  outline-none ${
                        emailError
                          ? "focus:border-border-error-color border-border-error-color"
                          : "focus:border-[#1677ff]  border-[#d9d9d9]  hover:border-[#1677ff] "
                      }`}
                      // type={`${showPassWord ? "text" : "password"}`}
                      type="text"
                      name="email"
                      placeholder="Email"
                      onChange={handleChangeInput}
                      value={account.email}
                    />
                  </div>
                  <span
                    className={`${
                      emailError ? "visible" : "invisible"
                    } text-sm text-error-color`}
                  >
                    {emailError}.
                  </span>
                </div>
                <div className="w-full flex flex-col ">
                  <label className="text-[14px] text-black pb-2" htmlFor="">
                    Address
                  </label>
                  <div>
                    <input
                      className={`bg-white w-full px-[11px] py-[7px] rounded border transition-all  outline-none ${
                        addressError
                          ? "focus:border-border-error-color border-border-error-color"
                          : "focus:border-[#1677ff]  border-[#d9d9d9]  hover:border-[#1677ff] "
                      }`}
                      // type={`${showPassWord ? "text" : "password"}`}
                      type="text"
                      name="address"
                      placeholder="Address"
                      onChange={handleChangeInput}
                      value={account.address}
                    />
                  </div>
                  <span
                    className={`${
                      addressError ? "visible" : "invisible"
                    } text-sm text-error-color`}
                  >
                    {addressError}.
                  </span>
                </div>

                <div className="w-full pt-6">
                  <button
                    className="w-full px-[15px] py-[7px] bg-primary-color rounded-lg  text-base text-white hover:text-[#fff] hover:bg-primary-hover-color"
                    type="submit"
                    onSubmit={handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateInfor;
