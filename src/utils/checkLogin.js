import { useSelector } from "react-redux";
export function useCheckLogin() {
  let token = useSelector((state) => state.auth.login.token);
  if (!token) {
    token = JSON.parse(localStorage.getItem("garaUserToken"));
  }
  if (!token) {
    return [null, false];
  } else {
    return [true, token];
  }
}
