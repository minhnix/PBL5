import React from "react";
import { Link } from "react-router-dom";

const CardVehicle = ({ numberPlate, status, pending,id }) => {
  return (
    <div
      className={` bg-white flex gap-12 border border-t-2 rounded p-4 ${
        pending
          ? "border-t-[#ffb772]"
          : status == "in"
          ? "border-t-success-color"
          : "border-t-error-color"
      }`}
    >
      <div className="flex flex-col gap-4">
        <span className="text-xl">{numberPlate}</span>
        <span>Status : {pending ? "pending" : status}</span>
      </div>
      {pending ? (
        <></>
      ) : (
        <div className=" flex flex-1  items-center justify-end">
          <div className="  border-[2px] rounded-full w-[40px] h-[40px] flex items-center justify-center">
            <Link
              to={`/user/history/${id}`}
              className="bx bx-history text-3xl "
            ></Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardVehicle;
