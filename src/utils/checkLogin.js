import { useSelector } from "react-redux";
export function useCheckLogin() {
  let token = useSelector((state) => state.auth.login.token);
  let role = useSelector((state) => state.auth.login.role);
  let user = useSelector((state) => state.auth.login.user);

  if (!token) {
    token = JSON.parse(localStorage.getItem("garaUserToken"));
  }
  if (!role) {
    role = JSON.parse(localStorage.getItem("garaUserRole"));
  }
  if (!user) {
    user = JSON.parse(localStorage.getItem("garaUser"));
  }
  if (!token) {
    return [null, role, false, user];
  } else {
    return [true, role, token, user];
  }
}
