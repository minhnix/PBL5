import { useSelector } from "react-redux";
export function useCheckUpdateInfor() {
  let user = useSelector((state) => state.auth.login.user);
  let role = useSelector((state) => state.auth.login.role);
  if (!user) {
    user = JSON.parse(localStorage.getItem("garaUser"));
  }
  if (!role) {
    role = JSON.parse(localStorage.getItem("garaUserRole"));
  }
  let isUpdateInfor = true;
  let isAdmin;
  role == "admin" ? (isAdmin = true) : (isAdmin = false);
  if (!user || !user.__owner__ ) {
    isUpdateInfor = false;
  }
  return [isAdmin, isUpdateInfor];
}
