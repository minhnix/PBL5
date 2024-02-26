import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <section className="sticky top-0 z-50  bg-red-200 w-full">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
          logooo
        </Link>

        <div className="flex gap-4">
          <button>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </button>
          <Link to={`/profile/`} className="flex-center gap-3">
            <img
              src={"/assets/icons/profile-placeholder.svg"}
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
