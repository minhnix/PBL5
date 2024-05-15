import { useEffect, useState } from "react";
import axios from "axios";

const VehicleModal = ({ setModal, type, vehicleId }) => {
  let [vehicle, setVehicle] = useState({});
  let [ownerId, setOwnerId] = useState("");
  let [owners, setOwners] = useState([]);
  let [numberPlateError, setNumberPlateError] = useState("");
  let [ownerError, setOwnerError] = useState("");
  let [responseMessage, setResponseMessage] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:3000/api/owners/all`).then((res) => {
      setOwners(res.data.data.owners);
      setOwnerId(res.data.data.owners[0].id);
    });
    type != "Create" &&
      axios
        .get(`http://localhost:3000/api/vehicles/${vehicleId}`)
        .then((response) => {
          setVehicle(response.data.data.vehicle[0]);
          // console.log(response);
          setOwnerId(response.data.data.vehicle[0].__owner__.id);
        });
  }, []);

  function handleChange(e) {
    setNumberPlateError("");
    setResponseMessage("");
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  }
  function handleChangeSelect(e) {
    setOwnerError("");
    setResponseMessage("");
    setOwnerId(e.target.value);
  }
  function handleChangeSelectStatus(e) {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  }
  function handleValidate() {
    let res = true;
    if (!ownerId) {
      setOwnerError("Please choose a owner");
      res = false;
    }
    if (!vehicle.numberPlate || !vehicle.numberPlate.trim()) {
      setNumberPlateError("Number plate cannot be empty");
      res = false;
    }
    return res;
  }
  function handleSubmit(e) {
    e.preventDefault();
    type == "Create" && handleCreate();
    type == "Update" && handleUpdate();
  }
  function handleCreate() {
    let validate = handleValidate();
    validate &&
      axios
        .post("http://localhost:3000/api/vehicles/", {
          idOwner: ownerId,
          numberPlate: vehicle.numberPlate,
          status: vehicle.status || "in",
        })
        .then((response) => {
          console.log(response)
          setResponseMessage(response.data.status);
          setVehicle({});
        });
  }
  function handleUpdate() {
    let validate = handleValidate();
    validate &&
      axios
        .patch(`http://localhost:3000/api/vehicles/${vehicle.id}`, {
          idOwner: ownerId,
          numberPlate: vehicle.numberPlate,
          status: vehicle.status,
        })
        .then((response) => {
          setResponseMessage(response.data.status);
        });
  }
  return (
    <div
      onClick={() => {
        console.log(vehicle, ownerId);
      }}
      className="fixed bg-[rgba(0,0,0,0.05)]  top-0 left-0 right-0 bottom-0  z-50 flex items-center justify-center"
    >
      <div
        onSubmit={handleSubmit}
        className="w-[400px] px-6 py-5 flex flex-col  rounded border bg-white "
      >
        <div className="flex justify-between items-start ">
          <span className="text-black text-base font-semibold ">
            {type} vehicle
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
          {type} vehicle success!
        </span>
        <div className="w-full flex flex-col">
          <label
            className="text-[14px] text-black pb-2 flex items-center"
            htmlFor=""
          >
            <span className={`${type == "View" && "hidden"} text-[red]`}>
              *
            </span>
            <span className="ml-1 font-semibold">Number Plate</span>
          </label>
          <input
            className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${
              numberPlateError
                ? "focus:border-border-error-color border-border-error-color"
                : type == "View"
                ? "cursor-auto"
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
            <span className={`${type == "View" && "hidden"} text-[red]`}>
              *
            </span>
            <span className="ml-1 font-semibold">Owner</span>
          </label>
          {type === "View" && (
            <input
              className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${" border-[#d9d9d9] cursor-auto"}`}
              type="text"
              name="owner"
              placeholder="Owner"
              readOnly
              value={vehicle?.__owner__?.name}
            />
          )}
          {type != "View" && (
            <select
              className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${
                ownerError
                  ? "focus:border-border-error-color border-border-error-color"
                  : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
              }`}
              name="owner"
              id="owner"
              disabled={type == "View" ? true : false}
              onChange={handleChangeSelect}
            >
              {owners.map((o) => {
                return (
                  <option
                    selected={
                      vehicle.__owner__ && vehicle.__owner__.id == o.id
                        ? true
                        : false
                    }
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </option>
                );
              })}
            </select>
          )}

          <span
            className={`${
              ownerError ? "visible" : "invisible"
            } text-sm text-error-color`}
          >
            {ownerError}.
          </span>
        </div>

        <div className="w-full flex flex-col">
          <label
            className="text-[14px] text-black pb-2 flex items-center"
            htmlFor=""
          >
            <span className={`${type == "View" && "hidden"} text-[red]`}>
              *
            </span>
            <span className="ml-1 font-semibold">Status</span>
          </label>
          {type == "View" && (
            <input
              className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${" border-[#d9d9d9]  cursor-auto"}`}
              type="text"
              name="status"
              readOnly={true}
              value={vehicle?.status || ""}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Status"
            />
          )}
          {type != "View" && (
            <select
              className={`bg-white w-full px-[11px] py-[4px] text-sm rounded border  transition-all  outline-none ${
                ownerError
                  ? "focus:border-border-error-color border-border-error-color"
                  : "focus:border-[#1677ff] border-[#d9d9d9]  hover:border-[#1677ff]"
              }`}
              name="status"
              id="status"
              disabled={type == "View" ? true : false}
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
          )}
          <span className={`${"invisible"} text-sm text-error-color`}>.</span>
        </div>

        <div className="mt-3 flex justify-end items-center gap-2">
          {type != "View" && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;
