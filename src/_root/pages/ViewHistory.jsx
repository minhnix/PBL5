const ViewHistory = () => {
  return (
    <>
      <div className="mt-8 flex  flex-row">
        <div className="w-full max-w-[33%] min-h-[500px] pr-4 rounded">
          <div className="w-full py-2 px-4 flex flex-row gap-5 bg-white border-l border-r border-b rounded-tr rounded-tl">
            <div className="flex items-center content-center">
              <i className="bx bx-info-circle"></i>
            </div>
            <div className="flex-1 flex items-center content-center">
              <span>Information</span>
            </div>
          </div>

          <div className="flex gap-5 flex-row bg-white px-4 py-3 border-l border-r border-b rounded-bl rounded-br">
            <div className=" flex items-center justify-center text-[#52C41A]">
              <span>●</span>
            </div>
            <div>
              <div className="text-[14px] font-semibold mt-1">74L1-01589</div>
              <div className="text-xs">Owner: Nguyen Quoc Dat</div>
              <div className="text-xs">Phone: 0369394745</div>
              <div className="text-xs">Address: TQK DN</div>
              <div className="text-xs">Time: 14:04</div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[66.66%] pl-4 flex flex-col ">
          <div className="w-full py-2 px-4 flex flex-row gap-5 bg-white border-l border-r border-b rounded-tr rounded-tl">
            <div className="flex items-center content-center">
              <i className="bx bx-camera"></i>
            </div>
            <div className="flex-1 flex items-center content-center">
              <span>Image</span>
            </div>
          </div>
          <div className="flex-1 bg-red-400 border rounded-bl rounded-br">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHistory;
