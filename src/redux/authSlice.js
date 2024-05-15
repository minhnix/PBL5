import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      isFetching: false,
      error: false,
      isLogin: false,
      token: "",
      role: "",
      user: null,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.token = action.payload.token;
      state.login.role = action.payload.role;
      state.login.user = action.payload.user;
      localStorage.setItem(
        "garaUserToken",
        JSON.stringify(action.payload.token)
      );
      localStorage.setItem("garaUserRole", JSON.stringify(action.payload.role));
      localStorage.setItem("garaUser", JSON.stringify(action.payload.user));
      state.login.error = false;
      state.login.isLogin = true;
    },
    updateSuccess: (state, action) => {
      state.login.user = action.payload.user;
      localStorage.setItem("garaUser", JSON.stringify(action.payload.user));
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    logOut: (state) => {
      state.login.token = "";
      localStorage.removeItem("garaUserToken");
      state.login.role = "";
      localStorage.removeItem("garaUserRole");
      state.login.user = "";
      localStorage.removeItem("garaUser");
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logOut, updateSuccess } =
  authSlice.actions;
export default authSlice.reducer;
