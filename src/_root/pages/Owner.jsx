import { useEffect, useState } from "react";
import { DeleteOwnerModal, OwnerModal } from "../../components";
import axios from "axios";

const Owner = () => {
  let [modal, setModal] = useState(false);
  let [owners, setOwners] = useState([]);
  let [start, setStart] = useState(0);
  let [type, setType] = useState();
  let [ownerId, setOwnerId] = useState("");
  let [totalOwners, setTotalOwners] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3000/api/owners?limit=7").then((response) => {
      setOwners(response.data.data.owners);
      setTotalOwners(response.data.total);
      setStart(response.data.start);
    });
  }, [modal]);

  function handleViewModal(id) {
    setOwnerId(id);
    setModal(true);
    setType("View");
  }
  function handleUpdateModal(id) {
    setOwnerId(id);
    setModal(true);
    setType("Update");
  }
  function handleCreateModal() {
    setOwnerId("");
    setModal(true);
    setType("Create");
  }
  function handleDeleteModal(id) {
    setOwnerId(id);
    setModal(true);
    setType("Delete");
  }
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex items-center justify-center">
          <span className="text-xl font-semibold">Owner</span>
        </div>
        <div>
          <button
            className="px-2 py-1 bg-primary-color rounded flex items-center justify-center gap-1 hover:opacity-80"
            type="button"
            onClick={() => {
              handleCreateModal();
            }}
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
                Name
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Phone
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Vehicle
              </th>
              <th className="bg-[#FAFAFA] text-sm font-semibold p-4 border-r  text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {owners.map((owner, index) => {
              return (
                <tr key={owner.id}>
                  <td className="text-left p-4 border-b text-sm">
                    {start + index + 1}
                  </td>
                  <td className="text-left p-4 border-b text-sm">
                    {owner.name}
                  </td>
                  <td className="text-left p-4 border-b text-sm">
                    {owner.phone}
                  </td>
                  <td className="text-left p-4 border-b text-sm">
                    {owner.vehiclesCount}
                  </td>
                  <td className="text-left p-4 border-b text-sm">
                    <div className="w-full h-full flex items-center ">
                      <div
                        onClick={() => {
                          handleViewModal(owner.id);
                          // console.log(owner.id);
                        }}
                        className="rounded p-1 border border-[#8bcc6b] max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer hover:opacity-75"
                      >
                        <i className="bx bx-show text-[#4dc015]"></i>
                      </div>
                      <div
                        onClick={() => {
                          handleUpdateModal(owner.id);
                          // console.log(owner.id);
                        }}
                        className="rounded p-1 border border-[#d9d9d9]  hover:border-primary-color max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer "
                      >
                        <i className="bx bx-edit-alt hover:text-primary-color"></i>
                      </div>
                      <div
                        onClick={() => {
                          handleDeleteModal(owner.id);
                        }}
                        className="rounded p-1 border border-[#ff4d4f] max-w-6 max-h-6 flex items-center justify-center mr-2 cursor-pointer hover:opacity-75"
                      >
                        <i className="bx bx-trash-alt text-[#ff4d4f]"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {modal && type != "Delete" && (
        <OwnerModal setModal={setModal} type={type} ownerId={ownerId} />
      )}
      {modal && type == "Delete" && (
        <DeleteOwnerModal setModal={setModal} type={type} ownerId={ownerId} />
      )}
    </>
  );
};

export default Owner;
