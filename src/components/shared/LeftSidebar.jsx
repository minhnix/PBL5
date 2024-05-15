import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { logOut } from "../../redux/authSlice";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogOut() {
    dispatch(logOut());
    navigate("/sign-in");
  }
  return (
    <aside className="max-w-[200px] min-w-[200px] w-[200px] flex flex-col z-20">
      <div className="px-5 py-4">
        <Link to="/" className="flex gap-3 items-center invisible md:visible">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1571/1571991.png"
            alt="logo"
            width={20}
            height={20}
          />
          <span className="font-semibold">Auto Gara</span>
        </Link>
      </div>
      <section className="pt-2 flex flex-col">
        <Link
          to={"/admin"}
          className={` m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer rounded ${
            location.pathname.split("/")[1] == ""
              ? "bg-[#e6f4ff] text-primary-color"
              : "hover:bg-[#f0f0f0]"
          } `}
        >
          <i className="bx bx-bar-chart"></i>
          <span className="ml-2 text-[14px]">Dashborad</span>
        </Link>
        <Link
          to={"/owner"}
          className={` m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer rounded ${
            location.pathname.split("/")[1] == "owner"
              ? "bg-[#e6f4ff] text-primary-color"
              : "hover:bg-[#f0f0f0]"
          } `}
        >
          <i className="bx bx-user"></i>
          <span className="ml-2 text-[14px]">Owner</span>
        </Link>
        <Link
          to={"/vehicle"}
          className={` m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer rounded ${
            location.pathname.split("/")[1] == "vehicle"
              ? "bg-[#e6f4ff] text-primary-color"
              : "hover:bg-[#f0f0f0]"
          } `}
        >
          <i className="bx bx-car"></i>
          <span className="ml-2 text-[14px]">Vehicle</span>
        </Link>
        <Link
          to={"/vehiclePending"}
          className={` m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer rounded ${
            location.pathname.split("/")[1] == "vehiclePending"
              ? "bg-[#e6f4ff] text-primary-color"
              : "hover:bg-[#f0f0f0]"
          } `}
        >
          <i className="bx bx-error-alt"></i>
          <span className="ml-2 text-[14px]">Vehicle Pending</span>
        </Link>
        <Link
          to={"/history"}
          className={` m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer rounded ${
            location.pathname.split("/")[1] == "history"
              ? "bg-[#e6f4ff] text-primary-color"
              : "hover:bg-[#f0f0f0]"
          } `}
        >
          <i className="bx bx-history"></i>
          <span className="ml-2 text-[14px]">History</span>
        </Link>

        <div
          onClick={handleLogOut}
          className="m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer  rounded hover:bg-[#f0f0f0]"
        >
          <i className="bx bx-log-out"></i>
          <span className="ml-2 text-[14px]">Log Out</span>
        </div>
      </section>
    </aside>
  );
};

export default LeftSidebar;
