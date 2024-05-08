import axios from "axios";
import { useEffect, useState } from "react";
// import Loading from "../shared/Loading";

const VehicleOwnerModal = ({ setModal, type, ownerId }) => {
  let [owner, setOwner] = useState({});
  // let [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/owners/${ownerId}`)
      .then((response) => {
        setOwner(response.data.data.owner[0]);
        console.log(response.data.data.owner[0]);
      });
  }, [ownerId]);

  return (
    <div
      onClick={() => {
        // setModal(false);
      }}
      className="fixed bg-[rgba(0,0,0,0.05)]  top-0 left-0 right-0 bottom-0  z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.preventDefault();
        }}
        className="w-[400px] px-6 py-5 flex flex-col  rounded border bg-white "
      >
        <div className="flex justify-between items-start ">
          <span className="text-black text-base font-semibold ">
            Vehicle of {owner.name}
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

        <div className="flex flex-col min-h-[120px] mt-6">
          <div>
            <span>Total Vehicle: </span>
            <span>{owner?.__vehicles__?.length || 0}</span>
          </div>
          {owner?.__vehicles__?.map((v) => {
            return <div key={v.id}>{v.numberPlate}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default VehicleOwnerModal;
