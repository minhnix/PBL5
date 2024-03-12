const RecentInOut = () => {
  return (
    <div className="w-full max-w-[33%] pr-4 rounded">
      <div className="w-full py-2 px-4 flex flex-row gap-5 bg-white border-l border-r border-b rounded-tr rounded-tl">
        <div className="flex items-center content-center">
          <i className="bx bx-calendar-event"></i>
        </div>
        <div className="flex-1 flex items-center content-center">
          <span>Recent</span>
        </div>
      </div>
      <div className="flex gap-5 flex-row bg-white px-4 py-3 border-l border-r border-b">
        <div className=" flex items-center justify-center text-[#52C41A]">
          <span>●</span>
        </div>
        <div>
          <div className="text-xs">Mar 12, 2024 - 07:00</div>
          <div className="text-[14px] font-semibold mt-1">74L1-01589 in</div>
        </div>
      </div>
      <div className="flex gap-5 flex-row bg-white px-4 py-3 border-l border-r border-b">
        <div className=" flex items-center justify-center text-[#F5222D]">
          <span>●</span>
        </div>
        <div>
          <div className="text-xs">Mar 12, 2024 - 07:00</div>
          <div className="text-[14px] font-semibold mt-1">74L1-01589 out</div>
        </div>
      </div>
      <div className="flex gap-5 flex-row bg-white px-4 py-3 border-l border-r border-b">
        <div className=" flex items-center justify-center text-[#52C41A]">
          <span>●</span>
        </div>
        <div>
          <div className="text-xs">Mar 12, 2024 - 07:00</div>
          <div className="text-[14px] font-semibold mt-1">74L1-01589 in</div>
        </div>
      </div>
      <div className="flex gap-5 flex-row bg-white px-4 py-3 border-l border-r border-b">
        <div className=" flex items-center justify-center text-[#52C41A]">
          <span>●</span>
        </div>
        <div>
          <div className="text-xs">Mar 12, 2024 - 07:00</div>
          <div className="text-[14px] font-semibold mt-1">74L1-01589 in</div>
        </div>
      </div>
      <div className="flex gap-5 flex-row bg-white px-4 py-3 border-l border-r border-b">
        <div className=" flex items-center justify-center text-[#F5222D]">
          <span>●</span>
        </div>
        <div>
          <div className="text-xs">Mar 12, 2024 - 07:00</div>
          <div className="text-[14px] font-semibold mt-1">74L1-01589 out</div>
        </div>
      </div>
      <div className="flex gap-5 flex-row bg-white px-4 py-3 border-l border-r border-b rounded-bl rounded-br">
        <div className=" flex items-center justify-center text-[#52C41A]">
          <span>●</span>
        </div>
        <div>
          <div className="text-xs">Mar 12, 2024 - 07:00</div>
          <div className="text-[14px] font-semibold mt-1">74L1-01589 in</div>
        </div>
      </div>
    </div>
  );
};

export default RecentInOut;
