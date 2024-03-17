import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../shared/Loading";

const DeleteOwnerModal = ({ setModal, type, ownerId }) => {
  let [owner, setOwner] = useState({});
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/owners/${ownerId}`)
      .then((response) => {
        setOwner(response.data.data.owner[0]);
      });
  }, [ownerId]);
  function handleDelete() {
    setLoading(true);
    axios.delete(`http://localhost:3000/api/owners/${ownerId}`);
    setTimeout(() => {
      setLoading(true);
      setModal(false);
    }, 1000);
  }
  return (
    <div
      onClick={() => {
        // setModal(false);
      }}
      className="fixed bg-[rgba(0,0,0,0.05)]  top-0 left-0 right-0 bottom-0  z-50 flex items-center justify-center"
    >
      <form
        onClick={(e) => {
          e.preventDefault();
        }}
        className="w-[400px] px-6 py-5 flex flex-col  rounded border bg-white "
      >
        <div className="flex justify-between items-start ">
          <span className="text-black text-base font-semibold ">
            {type} owner
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

        {loading ? (
          <div className="flex items-center justify-center min-h-[120px] mt-6">
            <Loading type={"spin"} color={"#999999"} width={40} height={40} />
          </div>
        ) : (
          <div className="flex flex-col min-h-[120px] mt-6">
            <span className="text-[24px] mb-4">Are you sure?</span>
            <span className=" text-sm text-[#5f5d5d]">
              Do you really want to delete owner{" "}
              <span className="font-bold">{owner?.name}</span>? This process
              cannot be undone.
            </span>
          </div>
        )}
        <div className="mt-3 flex justify-end items-center gap-2">
          {type != "View" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModal(false);
                }}
                className="px-[15px] py-1 text-sm rounded hover:border-primary-color hover:text-primary-color border transition-all delay-75"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleDelete}
                className="px-[15px] py-1 text-sm rounded text-white bg-error-color hover:opacity-80 transition-all delay-75"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default DeleteOwnerModal;
