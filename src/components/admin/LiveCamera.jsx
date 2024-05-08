import ReactPlayer from "react-player";
const LiveCamera = () => {
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
      <div className=" max-h-[396px] flex-1 border rounded-bl rounded-br object-fill overflow-hidden">
        {/* <ReactPlayer
        url="http://192.168.35.149:81/stream"
        playing
        controls
        width="100%"
        height="auto"
      /> */}
        <img
          // src="http://192.168.35.149:81/stream"
          alt=""
          // style="display: block;-webkit-user-select: none;"
          className="h-[100%] w-full"
        />
        {/* <iframe
          className="w-full h-full"
          src="http://192.168.35.149:81/stream  "
          width="100%"
          height="auto"
        ></iframe> */}
      </div>
    </div>
  );
};

export default LiveCamera;
