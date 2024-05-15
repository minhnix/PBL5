import { useEffect, useState } from "react";
import axios from "axios";
import { useCheckLogin } from "../../utils/checkLogin";

const RegisterVehicleModal = ({ setModal }) => {
  let [vehicle, setVehicle] = useState({});
  let [isLogin, role, token, user] = useCheckLogin();
  let [numberPlateError, setNumberPlateError] = useState("");
  let [ownerError, setOwnerError] = useState("");
  let [responseMessage, setResponseMessage] = useState("");
  useEffect(() => {
    // axios.get(`http://localhost:3000/api/owners/all`).then((res) => {
    //   setOwners(res.data.data.owners);
    //   setOwnerId(res.data.data.owners[0].id);
    // });
  }, []);

  function handleChange(e) {
    setNumberPlateError("");
    setResponseMessage("");
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  }

  function handleChangeSelectStatus(e) {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  }
  function handleValidate() {
    let res = true;

    if (!vehicle.numberPlate || !vehicle.numberPlate.trim()) {
      setNumberPlateError("Number plate cannot be empty");
      res = false;
    }
    return res;
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleCreate();
  }
  function handleCreate() {
    let validate = handleValidate();
    validate &&
      axios
        .post("http://localhost:3000/api/vehiclesPending/", {
          idOwner: user.__owner__.id,
          numberPlate: vehicle.numberPlate,
          status: vehicle.status || "in",
        })
        .then((response) => {
          console.log(response);
          setResponseMessage(response.data.status);
          setVehicle({});
        });
  }

  return (
    <div className="fixed bg-[rgba(0,0,0,0.05)]  top-0 left-0 right-0 bottom-0  z-50 flex items-center justify-center">
      <div
        onSubmit={handleSubmit}
        className="w-[400px] px-6 py-5 flex flex-col  rounded border bg-white "
      >
        <div className="flex justify-between items-start ">
          <span className="text-black text-base font-semibold ">
            Register vehicle
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
        <span
          className={`mb-1 text-[14px] text-success-color ${
            responseMessage ? "visible" : "invisible"
          }`}
        >
          Register vehicle success!
        </span>
        <div className="w-full flex flex-col">
          <label
            className="text-[14px] text-black pb-2 flex items-center"
            htmlFor=""
          >
            <span className={` text-[red]`}>*</span>
            <span className="ml-1 font-semibold">Number Plate</span>
          </label>
          <input
            className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${
              numberPlateError
                ? "focus:border-border-error-color border-border-error-color"
                : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
            }`}
            type="text"
            name="numberPlate"
            placeholder="Number Plate"
            value={vehicle?.numberPlate || ""}
            onChange={handleChange}
          />
          <span
            className={`${
              numberPlateError ? "visible" : "invisible"
            } text-sm text-error-color`}
          >
            {numberPlateError}.
          </span>
        </div>

        <div className="w-full flex flex-col">
          <label
            className="text-[14px] text-black pb-2 flex items-center"
            htmlFor=""
          >
            <span className={` text-[red]`}>*</span>
            <span className="ml-1 font-semibold">Status</span>
          </label>

          <select
            className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${
              ownerError
                ? "focus:border-border-error-color border-border-error-color"
                : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
            }`}
            name="status"
            id="status"
            onChange={handleChangeSelectStatus}
          >
            <option
              selected={vehicle.status == "in" ? true : false}
              value={"in"}
            >
              in
            </option>
            <option
              selected={vehicle.status == "out" ? true : false}
              value={"out"}
            >
              out
            </option>
          </select>

          <span className={`${"invisible"} text-sm text-error-color`}>.</span>
        </div>

        <div className="mt-3 flex justify-end items-center gap-2">
          <>
            <button className="px-[15px] py-1 text-sm rounded hover:border-primary-color hover:text-primary-color border transition-all delay-75">
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-[15px] py-1 text-sm rounded text-white bg-primary-color hover:opacity-80 transition-all delay-75"
            >
              Save
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default RegisterVehicleModal;
