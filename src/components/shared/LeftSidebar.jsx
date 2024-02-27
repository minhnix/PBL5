import { Link } from "react-router-dom";

const LeftSidebar = () => {
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
        <div className="m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer rounded hover:bg-[#f0f0f0]">
          <i className="bx bx-bar-chart"></i>
          <span className="ml-2 text-[14px]">Dashborad</span>
        </div>
        <div className="m-1 px-6 py-[10px] flex flex-row items-center cursor-pointer bg-[#e6f4ff] rounded text-primary-color">
          <i className="bx bx-bar-chart"></i>
          <span className="ml-2 text-[14px]">Dashborad</span>
        </div>
      </section>
    </aside>
  );
};

export default LeftSidebar;
