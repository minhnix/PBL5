import { useEffect, useState } from "react";
import { LiveCamera, RecentInOut } from "../../components";
import axios from "axios";

const Home = () => {
  let [totalOwner, setTotalOwner] = useState(0);
  let [totalVehicle, setTotalVehicle] = useState(0);
  let [totalVehicleIn, setTotalVehicleIn] = useState(0);
  useEffect(() => {
    axios.get(`http://localhost:3000/api/owners/total`).then((response) => {
      setTotalOwner(response.data.total);
    });
    axios.get(`http://localhost:3000/api/vehicles/status`).then((response) => {
      setTotalVehicle(response.data.total);
      setTotalVehicleIn(response.data.in);
    });
    let fetchData = setInterval(() => {
      axios.get(`http://localhost:3000/api/owners/total`).then((response) => {
        setTotalOwner(response.data.total);
      });
      axios
        .get(`http://localhost:3000/api/vehicles/status`)
        .then((response) => {
          setTotalVehicle(response.data.total);
          setTotalVehicleIn(response.data.in);
        });
    }, 30000);
    return () => {
      clearInterval(fetchData);
    };
  }, []);
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
            <span>Number of owner </span>
          </div>
          <div className="flex flex-row">
            <div className="flex-1 flex items-center justify-center">
              <strong className="text-4xl">{totalOwner}</strong>
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
            <span>Number of vehicle in gara </span>
          </div>
          <div className="flex flex-row">
            <div className="flex-1 flex items-center justify-center">
              <strong className="text-4xl">{totalVehicleIn}</strong>
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
              <strong className="text-4xl">{totalVehicle}</strong>
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
