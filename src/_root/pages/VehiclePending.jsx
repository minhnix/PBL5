import { useEffect, useState } from "react";
import axios from "axios";
import { DeleteVehicleModal, VehicleModal } from "../../components";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import DeleteVehiclePendingModal from "../../components/admin/DeleteVehiclePendingModal";

const VehiclePending = () => {
  const { id } = useParams();
  let [vehicles, setVehicles] = useState([]);
  let [start, setStart] = useState(0);
  let [totalVehicles, setTotalVehicles] = useState(0);
  let [page, setPage] = useState(0);

  let [type, setType] = useState();
  let [vehicleId, setVehicleId] = useState("");
  let [modal, setModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/vehiclesPending?limit=7&page=${page + 1}`)
      .then((response) => {
        setVehicles(response.data.data.vehicles);
        setTotalVehicles(response.data.total);
        console.log(response.data.total);
        setStart(response.data.start);
      });
  }, [modal, page]);

  function handleDeleteModal(id) {
    setVehicleId(id);
    setModal(true);
    setType("Delete");
  }
  function handleApproveModal(id) {
    setVehicleId(id);
    setModal(true);
    setType("Approve");
  }
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex items-center justify-center">
          <span className="text-xl font-semibold">Vehicle</span>
        </div>
        <div></div>
      </div>
      <div className="min-h-[450px]">
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
                Phone
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Address
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
                      {vehicle?.__owner__?.phone}
                    </td>
                    <td className="text-left p-4 border-b text-sm">
                      {vehicle?.__owner__?.address}
                    </td>
                    <td className="text-left p-4 border-b text-sm">
                      <div className="w-full h-full flex items-center ">
                        <div
                          onClick={() => {
                            handleApproveModal(vehicle.id);
                          }}
                          className="rounded p-1 border border-success-color max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer hover:opacity-75"
                        >
                          <i className="bx bx-check text-success-color"></i>
                        </div>
                        <div
                          onClick={() => {
                            handleDeleteModal(vehicle.id);
                          }}
                          className="rounded p-1 border border-[#ff4d4f] max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer hover:opacity-75"
                        >
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
      <div className="mt-2 flex items-center justify-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={(it) => {
            setPage(it.selected);
          }}
          pageRangeDisplayed={2}
          pageCount={Math.ceil(totalVehicles / 7)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="flex gap-2 items-center justify-center"
          pageClassName="border border-[#b5b5b5] min-w-[34px] min-h-[34px] rounded flex items-center justify-center"
          activeClassName="bg-primary-color text-white"
          previousClassName="border border-[#b5b5b5] px-2 py-1 rounded"
          nextClassName="border border-[#b5b5b5] px-2 py-1 rounded"
          pageLinkClassName="w-full h-full  px-2 py-1 text-center"
          initialPage={page}
        />
      </div>

      {modal &&  (
        <DeleteVehiclePendingModal
          setModal={setModal}
          type={type}
          vehicleId={vehicleId}
        />
      )}
    </>
  );
};

export default VehiclePending;
