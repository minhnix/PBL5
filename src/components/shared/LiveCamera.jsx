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
      <div className="flex-1 bg-red-400 border rounded-bl rounded-br">

      </div>
    </div>
  );
};

export default LiveCamera;
