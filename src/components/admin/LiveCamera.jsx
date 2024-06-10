import { useState } from "react";
const LiveCamera = () => {
  let [videoUrl, setVideoUrl] = useState(0);
  let handleSwitchCamera = () => {
    if (videoUrl == 0) {
      setVideoUrl(1)
    }
    else if (videoUrl == 1) {
      setVideoUrl(0)
    }
  };
  return (
    <div className="w-full max-w-[66.66%] pl-4 flex flex-col ">
      <div className="w-full py-2 px-4 flex flex-row gap-5 bg-white border-l border-r border-b rounded-tr rounded-tl">
        <div className="flex items-center content-center">
          <i className="bx bx-camera"></i>
        </div>
        <div className="flex-1 flex items-center content-center">
          <span>Camera</span>
        </div>
      </div>
      <div className=" max-h-[396px] flex-1 border rounded-bl rounded-br object-fill overflow-hidden relative">
        <div
          onClick={handleSwitchCamera}
          className="absolute top-2 right-2 pointer"
        >
          <i className="bx bx-sync text-2xl border px-1"></i>
        </div>
        <img
          src={`http://localhost:500${videoUrl}/video`}
          alt=""
          className="h-[100%] w-full bg-red-300"
        />
      </div>
    </div>
  );
};

export default LiveCamera;
