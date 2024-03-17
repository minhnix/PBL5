import { useEffect, useState } from "react";
import axios from "axios";

const VehicleModal = ({ setModal, type, vehicleId }) => {
  let [vehicle, setVehicle] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/vehicles/${vehicleId}`)
      .then((response) => {
        setVehicle(response.data.data.vehicle[0]);
      });
  }, []);
  const usernameError = "";

  function handleChange(e) {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  }
  return (
    <div
      onClick={() => {
        console.log(vehicle);
      }}
      className="fixed bg-[rgba(0,0,0,0.05)]  top-0 left-0 right-0 bottom-0  z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-[400px] px-6 py-5 flex flex-col  rounded border bg-white "
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-black text-base font-semibold ">
            Add new vehicle
          </span>
          <div
            onClick={() => {
              setModal((pre) => {
                return !pre;
              });
            }}
            className="w-6 h-6 hover:bg-[#0000000f] flex items-center justify-center rounded cursor-pointer"
          >
            <i className="text-xl text-[#fffffff] bx bx-x"></i>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label
            className="text-[14px] text-black pb-2 flex items-center"
            htmlFor=""
          >
            <span className="text-[red] mr-1">*</span>
            <span>Number Plate</span>
          </label>
          <input
            className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${
              usernameError
                ? "focus:border-border-error-color border-border-error-color"
                : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
            }`}
            type="text"
            name="numberPlate"
            placeholder="Number Plate"
            readOnly={type == "View" ? true : false}
            value={vehicle?.numberPlate || ""}
            onChange={handleChange}
          />
          <span
            className={`${
              usernameError ? "visible" : "invisible"
            } text-sm text-error-color`}
          >
            {usernameError}.
          </span>
        </div>
        <div className="w-full flex flex-col">
          <label
            className="text-[14px] text-black pb-2 flex items-center"
            htmlFor=""
          >
            <span className="text-[red] mr-1">*</span>
            <span>Status</span>
          </label>
          <input
            className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${
              usernameError
                ? "focus:border-border-error-color border-border-error-color"
                : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
            }`}
            type="text"
            name="status"
            readOnly={type == "View" ? true : false}
            value={vehicle?.phone || ""}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Status"
          />
          <span
            className={`${
              usernameError ? "visible" : "invisible"
            } text-sm text-error-color`}
          >
            {usernameError}.
          </span>
        </div>
        <div className="w-full flex flex-col">
          <label
            className="text-[14px] text-black pb-2 flex items-center"
            htmlFor=""
          >
            <span className="text-[red] mr-1">*</span>
            <span>Owner</span>
          </label>
          <input
            className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${
              usernameError
                ? "focus:border-border-error-color border-border-error-color"
                : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
            }`}
            type="text"
            name="owner"
            readOnly={type == "View" ? true : false}
            onChange={(e) => {
              handleChange(e);
            }}
            value={vehicle?.__owner__?.name || ""}
            placeholder="Owner"
          />
          <span
            className={`${
              usernameError ? "visible" : "invisible"
            } text-sm text-error-color`}
          >
            {usernameError}.
          </span>
        </div>

        <div className="mt-3 flex justify-end items-center gap-2">
          {type != "View" && (
            <>
              <button className="px-[15px] py-1 text-sm rounded hover:border-primary-color hover:text-primary-color border transition-all delay-75">
                Cancel
              </button>
              <button className="px-[15px] py-1 text-sm rounded text-white bg-primary-color hover:opacity-80 transition-all delay-75">
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;
