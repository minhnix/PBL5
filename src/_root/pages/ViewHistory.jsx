import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewHistory = () => {
  const { id } = useParams();
  let [history, setHistory] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3000/api/history/${id}`).then((response) => {
      // console.log(response.data.data.history[0]);
      setHistory(response.data.data.history[0]);
    });
  }, []);

  function handleDate(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDateTime = dateTime.toLocaleDateString("en-US", options);

    const optionsHour = { hour: "2-digit", minute: "2-digit" };
    const formatHour = dateTime.toLocaleTimeString("en-US", optionsHour);
    return formatHour + " " + formattedDateTime;
  }
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
            <div
              className={`flex items-center justify-center ${
                history.type == "in" ? "text-[#52C41A]" : "text-[#F5222D]"
              }`}
            >
              <span>●</span>
            </div>
            <div>
              <div className="text-[14px] font-semibold mt-1">
                {history.__vehicle__?.numberPlate} {history.type}
              </div>
              <div className="text-xs">
                Owner: {history.__vehicle__?.__owner__?.name}
              </div>
              <div className="text-xs">
                Phone: {history.__vehicle__?.__owner__?.phone}
              </div>
              <div className="text-xs">
                Address: {history.__vehicle__?.__owner__?.address}
              </div>
              <div className="text-xs">
                Email: {history.__vehicle__?.__owner__?.email}
              </div>
              <div className="text-xs">{handleDate(history.createdAt)}</div>
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
          <div className="flex flex-1 border rounded-bl rounded-br ">
            <img
              src={history.url_image}
              className="w-full max-h-[460px]"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHistory;
