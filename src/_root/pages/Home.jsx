import { LiveCamera, RecentInOut } from "../../components";

const Home = () => {
  return (
    <>
      <div className="flex gap-8">
        <div className="max-h-[160px] h-full w-full py-2 pl-3 pr-2 flex flex-col flex-1 bg-white rounded border">
          <div className="flex gap-2 items-center mb-1">
            <div
              className={`w-8 h-8 rounded-full bg-[#e6f4ff] flex items-center justify-center`}
            >
              <i className={`bx bx-history text-[#1d7bff]`}></i>
            </div>
            <span>Number of user </span>
          </div>
          <div className="flex flex-row">
            <div className="flex-1 flex items-center justify-center">
              <strong className="text-4xl">36</strong>
            </div>
            <div className="flex-1 invisible">.</div>
          </div>
        </div>
        <div className="max-h-[160px] h-full w-full py-2 pl-3 pr-2 flex flex-col flex-1 bg-white rounded border">
          <div className="flex gap-2 items-center mb-1">
            <div
              className={`w-8 h-8 rounded-full bg-[#f6ffed] flex items-center justify-center`}
            >
              <i className={`bx bx-history text-[#52c41a]`}></i>
            </div>
            <span>Number of </span>
          </div>
          <div className="flex flex-row">
            <div className="flex-1 flex items-center justify-center">
              <strong className="text-4xl">36</strong>
            </div>
            <div className="flex-1 invisible">.</div>
          </div>
        </div>
        <div className="max-h-[160px] h-full w-full py-2 pl-3 pr-2 flex flex-col flex-1 bg-white rounded border">
          <div className="flex gap-2 items-center mb-1">
            <div
              className={`w-8 h-8 rounded-full bg-[#fff2e8] flex items-center justify-center`}
            >
              <i className={`bx bx-history text-[#fa541c]`}></i>
            </div>
            <span>Number of vehicle</span>
          </div>
          <div className="flex flex-row">
            <div className="flex-1 flex items-center justify-center">
              <strong className="text-4xl">36</strong>
            </div>
            <div className="flex-1 invisible">.</div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex  flex-row">
        <RecentInOut />
        <LiveCamera />
      </div>
    </>
  );
};

export default Home;
