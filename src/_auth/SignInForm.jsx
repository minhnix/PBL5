import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { loginSuccess } from "../redux/authSlice";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [responseError, setResponseError] = useState("");

  // const [showPassWord, setShowPassWord] = useState(false);
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  function handleChangeInput(e) {
    setResponseError("");
    if (e.target.name == "username") {
      setUsernameError("");
    } else {
      setPasswordError("");
    }
    setAccount({ ...account, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!account.username.trim()) {
      setUsernameError("Username cannot be empty");
    }
    if (!account.password.trim()) {
      setPasswordError("Password cannot be empty");
    }

    if (!passwordError && !usernameError) {
      axios
        .post("http://localhost:3000/api/users/logIn", { ...account })
        .then((response) => {
          // setPost(response.data);
          // console.log(response.status);
          dispatch(loginSuccess(response.data.token));
          navigate("/");
        })
        .catch(function (err) {
          setResponseError(err.response.data.message);
        });

      // await fetch("http://localhost:8080/v1/auth/login", {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(account),
      // })
      //   .then((res) => res.json())
      //   //.then(res=> console.log(res))
      //   .then((res) => {
      //     if (res.error !== "") {
      //       setLoginError(res.error);
      //     } else {
      //       setLoginError("");
      //       dispatch(loginSuccess(res));
      //       console.log(res);
      //       if (res.type === "admin") {
      //         navigate("/Admin");
      //       } else {
      //         navigate("/");
      //       }
      //     }
      //   });
    }
  }
  return (
    <>
      <section className="max-w-[91.66%] w-full">
        <form className="py-4 flex flex-col items-center justify-center">
          <div className="mb-[32px] text-black text-xl font-bold flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1571/1571991.png"
              alt=""className=" w-7 h-7"
            />
            <span>Auto Gara</span>
          </div>

          <div className="bg-[white] w-full max-w-[400px] p-8 rounded-md">
            <span className="block w-full mt-3 mb-3 text-[#4096ff] text-[24px] font-bold  text-center">
              Sign in to your account
            </span>
            <div className="mb-6 flex justify-center items-center">
              <span
                className={`${
                  responseError ? "visible" : "invisible"
                } text-sm text-error-color`}
              >
                {responseError ? responseError : "."}
              </span>
            </div>
            <div className="w-full flex flex-col">
              <label className="text-[14px] text-black pb-2" htmlFor="">
                Username
              </label>
              <input
                className={`bg-white w-full px-[11px] py-[7px] rounded border  transition-all  outline-none ${
                  usernameError
                    ? "focus:border-border-error-color border-border-error-color"
                    : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
                }`}
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChangeInput}
              />
              <span
                className={`${
                  usernameError ? "visible" : "invisible"
                } text-sm text-error-color`}
              >
                {usernameError}.
              </span>
            </div>
            <div className="w-full flex flex-col ">
              <label className="text-[14px] text-black pb-2" htmlFor="">
                Password
              </label>
              <div>
                <input
                  className={`bg-white w-full px-[11px] py-[7px] rounded border transition-all  outline-none ${
                    passwordError
                      ? "focus:border-border-error-color border-border-error-color"
                      : "focus:border-[#1677ff]  border-[#d9d9d9]  hover:border-[#1677ff] "
                  }`}
                  // type={`${showPassWord ? "text" : "password"}`}
                  type="password"
                  name="password"
                  placeholder="●●●●●●●"
                  onChange={handleChangeInput}
                />
              </div>
              <span
                className={`${
                  passwordError ? "visible" : "invisible"
                } text-sm text-error-color`}
              >
                {passwordError}.
              </span>
            </div>

            <div className="w-full py-6">
              <button
                className="w-full px-[15px] py-[7px] bg-primary-color rounded-lg  text-base text-white hover:text-[#fff] hover:bg-primary-hover-color"
                type="submit"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default SignInForm;
