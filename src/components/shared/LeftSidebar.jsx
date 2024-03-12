import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/authSlice";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch(logOut());
    navigate("/sign-in");
  }
  return (
    <aside className="max-w-[200px] min-w-[200px] w-[200px] flex flex-col">
      <div className="px-5 py-4">
        <Link to="/" className="flex gap-3 items-center invisible md:visible">
          <img
            src="https://i.pinimg.com/736x/ef/bd/8c/efbd8cf76bbe5a261076307e3a6ed4c8.jpg"
            alt="logo"
            width={20}
            height={20}
          />
          ten prj
        </Link>
      </div>
      <section className="pt-2 flex flex-col">
        <Link
          to={"/"}
          className="m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer rounded hover:bg-[#f0f0f0]"
        >
          <i className="bx bx-bar-chart"></i>
          <span className="ml-2 text-[14px]">Dashborad</span>
        </Link>
        <Link
          to={"/user"}
          className=" m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer bg-[#e6f4ff] rounded text-primary-color"
        >
          <i className="bx bx-user"></i>
          <span className="ml-2 text-[14px]">User</span>
        </Link>
        <Link
          to={"/vehicle"}
          className="m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer rounded hover:bg-[#f0f0f0]"
        >
          <i className="bx bx-car"></i>
          <span className="ml-2 text-[14px]">Vehicle</span>
        </Link>
        <Link
          to={"/history"}
          className="m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer rounded hover:bg-[#f0f0f0]"
        >
          <i className="bx bx-history"></i>
          <span className="ml-2 text-[14px]">History</span>
        </Link>

        <div
          onClick={handleLogOut}
          className="m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer  rounded hover:bg-[#f0f0f0]"
        >
          <i className="bx bx-log-out"></i>
          <span className="ml-2 text-[14px]">Đăng xuất</span>
        </div>
      </section>
    </aside>
  );
};

export default LeftSidebar;
