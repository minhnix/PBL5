import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentInOut = () => {
  let [history, setHistory] = useState([]);
  let [ownerCount, setOwnerCount] = useState(0);
  let [vehicleCount, setVehicleCount] = useState(0);
  let [vehicleIn, setVehicleIn] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/history?limit=6&page=1`)
      .then((response) => {
        setHistory(response.data.data.history);
      });
    let fetchData = setInterval(() => {
      axios
        .get(`http://localhost:3000/api/history?limit=6&page=1`)
        .then((response) => {
          setHistory(response.data.data.history);
        });
    }, 30000);
    return () => {
      clearInterval(fetchData);
    };
  }, []);
  function handleDate(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDateTime = dateTime.toLocaleDateString("en-US", options);

    const optionsHour = { hour: "2-digit", minute: "2-digit" };
    const formatHour = dateTime.toLocaleTimeString("en-US", optionsHour);
    return formattedDateTime + " - " + formatHour.split(" ")[0];
  }
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
      {/* <div className="flex gap-5 flex-row bg-white px-4 py-3 border-l border-r border-b">
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
      </div> */}
      {history.map((his, index) => {
        return (
          <Link
            to={`/view-history/${his.id}`}
            key={his.id}
            className="flex gap-5 flex-row bg-white px-4 py-3 border-l border-r border-b"
          >
            <div
              className={`flex items-center justify-center ${
                his.type == "in" ? "text-[#52C41A]" : "text-[#F5222D]"
              }`}
            >
              <span>●</span>
            </div>
            <div>
              <div className="text-xs"> {handleDate(his.createdAt)}</div>
              <div className="text-[14px] font-semibold mt-1">
                {his.__vehicle__?.numberPlate} {his.type}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RecentInOut;
