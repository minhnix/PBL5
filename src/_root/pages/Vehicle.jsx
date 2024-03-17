import { useEffect, useState } from "react";
import axios from "axios";
import { VehicleModal } from "../../components";

const Vehicle = () => {
  let [vehicles, setVehicles] = useState([]);
  let [start, setStart] = useState(0);
  let [totalVehicles, setTotalVehicles] = useState(0);

  let [type, setType] = useState();
  let [vehicleId, setVehicleId] = useState("");
  let [modal, setModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/vehicles?limit=7").then((response) => {
      setVehicles(response.data.data.vehicles);
      setTotalVehicles(response.data.total);
      setStart(response.data.start);
    });
  }, []);

  function handleCreateModal() {
    setVehicleId("");
    setModal(true);
    setType("Create");
  }
  function handleViewModal(id) {
    setVehicleId(id);
    setModal(true);
    setType("View");
  }
  function handleUpdateModal(id) {
    setVehicleId(id);
    setModal(true);
    setType("Update");
  }
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex items-center justify-center">
          <span className="text-xl font-semibold">Vehicle</span>
        </div>
        <div>
          <button
            className="px-2 py-1 bg-primary-color rounded flex items-center justify-center gap-1 hover:opacity-80"
            type="button"
            onClick={handleCreateModal}
          >
            <i className="bx bx-plus text-white"></i>
            <span className="text-white">Create</span>
          </button>
        </div>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                STT
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Number Plate
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Owner
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {vehicles.map((vehicle, index) => {
              return (
                <>
                  <tr>
                    <td className="text-left p-4 border-b text-sm">
                      {start + index + 1}
                    </td>
                    <td className="text-left p-4 border-b text-sm">
                      {vehicle.numberPlate}
                    </td>
                    <td className="text-left p-4 border-b text-sm">
                      {vehicle?.__owner__?.name}
                    </td>
                    <td className="text-left p-4 border-b text-sm">
                      <div className="w-full h-full flex items-center ">
                        <div
                          onClick={() => {}}
                          className="rounded p-1 border border-[#fab574] max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer hover:opacity-75"
                        >
                          <i className="bx bx-history text-[#ffa149]"></i>
                        </div>
                        <div
                          onClick={() => {
                            handleViewModal(vehicle.id);
                          }}
                          className="rounded p-1 border border-[#8bcc6b] max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer hover:opacity-75"
                        >
                          <i className="bx bx-show text-[#4dc015]"></i>
                        </div>
                        <div
                          onClick={() => {
                            handleUpdateModal(vehicle.id);
                          }}
                          className="rounded p-1 border border-[#d9d9d9]  hover:border-primary-color max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer "
                        >
                          <i className="bx bx-edit-alt hover:text-primary-color"></i>
                        </div>
                        <div className="rounded p-1 border border-[#ff4d4f] max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer hover:opacity-75">
                          <i className="bx bx-trash-alt text-[#ff4d4f]"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {modal && (
        <VehicleModal setModal={setModal} type={type} vehicleId={vehicleId} />
      )}
    </>
  );
};

export default Vehicle;
