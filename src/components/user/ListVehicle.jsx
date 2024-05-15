import React, { useEffect, useState } from "react";
import { useCheckLogin } from "../../utils/checkLogin";
import CardVehicle from "./CardVehicle";
import axios from "axios";
import RegisterVehicleModal from "./RegisterVehicleModal";

const ListVehicle = () => {
  let [isLogin, role, token, user] = useCheckLogin();

  let [vehicles, setVehicles] = useState([]);
  let [vehiclesPending, setVehiclesPending] = useState([]);
  let [start, setStart] = useState(0);
  let [totalVehicles, setTotalVehicles] = useState(0);
  let [page, setPage] = useState(0);

  let [type, setType] = useState();
  let [vehicleId, setVehicleId] = useState("");
  let [modal, setModal] = useState(false);

  useEffect(() => {
    user.__owner__ &&
      axios
        .get(
          `http://localhost:3000/api/vehicles/user/${
            user.__owner__.id
          }`
        )
        .then((response) => {
          setVehicles(response.data.data.vehicles);
          setTotalVehicles(response.data.total);

          setStart(response.data.start);
        });
    user.__owner__ &&
      axios
        .get(
          `http://localhost:3000/api/vehiclesPending/user/${
            user.__owner__.id
          }`
        )
        .then((response) => {
          setVehiclesPending(response.data.data.vehicles);
        });
  }, [modal, page]);
  return (
    <>
      <div className="px-16 py-16 h-full">
        <div className="flex justify-between">
          <span className="text-lg font-semibold">
            List vehicle of {user.__owner__.name}
          </span>
          <button
            className="px-2 py-1 bg-primary-color rounded flex items-center justify-center gap-1 hover:opacity-80"
            type="button"
            onClick={() => {
              setModal(true);
            }}
          >
            <i className="bx bx-plus text-white"></i>
            <span className="text-white">Register</span>
          </button>
        </div>
        <section className="w-full mt-12 grid grid-cols-4 gap-8">
          {/* <CardVehicle status="out" numberPlate={"74l1-01589"} pending={true} /> */}
          {vehicles.map((v) => (
            <>
              <CardVehicle
                status={v.status}
                numberPlate={v.numberPlate}
                pending={false}
                id={v.id}
              />
            </>
          ))}
          {vehiclesPending.map((v) => (
            <>
              <CardVehicle
                status={v.status}
                numberPlate={v.numberPlate}
                id={v.id}
                pending={true}
              />
            </>
          ))}
        </section>
      </div>
      {modal && <RegisterVehicleModal setModal={setModal} />}
    </>
  );
};

export default ListVehicle;
