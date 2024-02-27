import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <section className="sticky top-0 left-0 right-0 z-50  bg-[#fff] w-full">
      <div className="flex justify-between py-4 px-5">
        <div className="invisible">aa</div>
        <div className="flex gap-4">
          <Link to={`/profile/`} className="flex-center gap-3">
            <img
              src={
                "https://i.pinimg.com/736x/ef/bd/8c/efbd8cf76bbe5a261076307e3a6ed4c8.jpg"
              }
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
