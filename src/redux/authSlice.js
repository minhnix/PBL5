import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      isFetching: false,
      error: false,
      isLogin: false,
      token: "",
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.token = action.payload;
      localStorage.setItem("garaUserToken", JSON.stringify(action.payload));
      state.login.error = false;
      state.login.isLogin = true;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    logOut: (state) => {
      state.login.token = "";
      localStorage.removeItem("garaUserToken");
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logOut } =
  authSlice.actions;
export default authSlice.reducer;
