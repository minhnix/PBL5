import React from "react";
import { useCheckUpdateInfor } from "../../utils/checkUpdateInfor";
import { Forbidden, ListVehicle } from "../../components";

const VehicleUser = () => {
  let [isAdmin, isUpdateInfor] = useCheckUpdateInfor();

  return (
    <>
      {!isAdmin ? (
        !isUpdateInfor ? (
          <Forbidden
            nameButton={"Update information"}
            navigate={"/user/updateInfor"}
            title={"You are not updated information."}
            text={"Please update information before register vehicle."}
          />
        ) : (
          <ListVehicle />
        )
      ) : (
        <Forbidden
          title="We are sorry..."
          text="The page you're trying to access has restricted access."
          navigate={"/"}
          nameButton="Go Back"
        />
      )}

    </>
  );
};

export default VehicleUser;
